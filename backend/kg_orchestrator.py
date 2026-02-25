"""
Knowledge Graph Orchestrator — links all entities and answers multi-hop queries.
Uses FastF1 data to populate the graph and Sarvam AI for natural language reasoning.
"""
from typing import Dict, Any, List
import json
import networkx as nx
from sarvam_client import sarvam_chat
from data_service import data_service


SYSTEM_PROMPT = """
You are a Formula 1 Knowledge Graph Orchestrator. You have access to an entity graph
that includes: Drivers, Teams, Races, Incidents, Rules, and Radio events.

You can answer multi-hop questions like:
- "Which driver affected by safety car incidents also struggled on high-deg tracks?"
- "What rule connects the Abu Dhabi 2021 incident to the Saudi Arabia 2021 precedent?"

You will be given a graph summary and a question. Reason through the connections and
answer clearly with evidence. Identify causal chains where possible.

Respond in structured JSON:
{
  "answer": "<direct answer>",
  "reasoning_chain": ["<step 1>", "<step 2>", "<step 3>"],
  "entities_used": ["<entity 1>", "<entity 2>"],
  "confidence": <float 0-1>
}
"""


class KnowledgeGraphOrchestrator:
    def __init__(self):
        self.graph = nx.MultiDiGraph()
        self._seed_graph()

    def _seed_graph(self):
        """Seed with known F1 entities for demonstration."""
        drivers = [
            ("VER", {"name": "Max Verstappen", "team": "Red Bull", "championships": 3}),
            ("HAM", {"name": "Lewis Hamilton", "team": "Mercedes", "championships": 7}),
            ("LEC", {"name": "Charles Leclerc", "team": "Ferrari", "championships": 0}),
            ("NOR", {"name": "Lando Norris", "team": "McLaren", "championships": 0}),
        ]
        teams = [
            ("Red Bull", {"aero_philosophy": "high_rake", "budget": "top"}),
            ("Mercedes", {"aero_philosophy": "low_rake", "budget": "top"}),
            ("Ferrari", {"aero_philosophy": "medium", "budget": "top"}),
            ("McLaren", {"aero_philosophy": "medium_low", "budget": "mid_top"}),
        ]
        races = [
            ("ABU_2021", {"name": "Abu Dhabi GP", "year": 2021, "winner": "VER"}),
            ("SAU_2021", {"name": "Saudi Arabia GP", "year": 2021, "winner": "HAM"}),
            ("MON_2021", {"name": "Monaco GP", "year": 2021, "winner": "VER"}),
        ]
        incidents = [
            ("INC_ABU_SC", {"description": "Late Safety Car deployment Lap 53", "race": "ABU_2021"}),
            ("INC_SAU_BRAKE", {"description": "Verstappen brake-test allegation", "race": "SAU_2021"}),
        ]
        rules = [
            ("ART_27_4", {"text": "Driver must leave racing room - Article 27.4"}),
            ("ART_39_1", {"text": "Safety Car procedures - Article 39.1"}),
        ]

        for n, d in drivers:
            self.graph.add_node(n, type="Driver", **d)
        for n, d in teams:
            self.graph.add_node(n, type="Team", **d)
        for n, d in races:
            self.graph.add_node(n, type="Race", **d)
        for n, d in incidents:
            self.graph.add_node(n, type="Incident", **d)
        for n, d in rules:
            self.graph.add_node(n, type="Rule", **d)

        # Edges
        self.graph.add_edge("VER", "Red Bull", relation="DRIVES_FOR", year=2021)
        self.graph.add_edge("HAM", "Mercedes", relation="DRIVES_FOR", year=2021)
        self.graph.add_edge("LEC", "Ferrari", relation="DRIVES_FOR", year=2021)
        self.graph.add_edge("NOR", "McLaren", relation="DRIVES_FOR", year=2021)
        self.graph.add_edge("VER", "ABU_2021", relation="COMPETED_IN", position=1)
        self.graph.add_edge("HAM", "ABU_2021", relation="COMPETED_IN", position=2)
        self.graph.add_edge("INC_ABU_SC", "ABU_2021", relation="OCCURRED_IN")
        self.graph.add_edge("INC_ABU_SC", "ART_39_1", relation="INVESTIGATED_UNDER")
        self.graph.add_edge("INC_SAU_BRAKE", "VER", relation="INVOLVED")
        self.graph.add_edge("INC_SAU_BRAKE", "ART_27_4", relation="INVESTIGATED_UNDER")

    def get_graph_summary(self) -> str:
        """Return a textual summary of the graph for LLM context."""
        lines = [f"Graph has {self.graph.number_of_nodes()} nodes, {self.graph.number_of_edges()} edges.\n"]
        for n, d in self.graph.nodes(data=True):
            lines.append(f"  [{d.get('type','?')}] {n}: {d}")
        lines.append("\nEdges:")
        for u, v, d in self.graph.edges(data=True):
            lines.append(f"  {u} --[{d.get('relation','?')}]--> {v}")
        return "\n".join(lines)

    def get_summary(self) -> Dict[str, Any]:
        types = {}
        for _, d in self.graph.nodes(data=True):
            t = d.get("type", "Unknown")
            types[t] = types.get(t, 0) + 1
        return {
            "nodes": self.graph.number_of_nodes(),
            "edges": self.graph.number_of_edges(),
            "node_types": types,
        }

    def answer_query(self, question: str) -> Dict[str, Any]:
        """Use Sarvam AI to answer a multi-hop question over the knowledge graph."""
        graph_summary = self.get_graph_summary()

        messages = [
            {"role": "system", "content": SYSTEM_PROMPT},
            {
                "role": "user",
                "content": (
                    f"Knowledge Graph:\n{graph_summary}\n\n"
                    f"Question: {question}\n\n"
                    "Reason over the graph and respond with JSON only."
                ),
            },
        ]

        raw = sarvam_chat(messages, temperature=0.3)

        try:
            clean = raw.strip()
            if clean.startswith("```"):
                clean = clean.split("```")[1]
                if clean.startswith("json"):
                    clean = clean[4:]
            return json.loads(clean.strip())
        except Exception:
            return {
                "answer": raw,
                "reasoning_chain": [],
                "entities_used": [],
                "confidence": 0.5,
            }


# Singleton instance
kg_orchestrator = KnowledgeGraphOrchestrator()
