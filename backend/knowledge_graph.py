import networkx as nx
from typing import List, Dict, Any

class F1KnowledgeGraph:
    def __init__(self):
        self.graph = nx.MultiDiGraph()

    def add_driver(self, driver_id: str, data: Dict[str, Any]):
        self.graph.add_node(driver_id, type='Driver', **data)

    def add_team(self, team_id: str, data: Dict[str, Any]):
        self.graph.add_node(team_id, type='Team', **data)

    def add_race(self, race_id: str, data: Dict[str, Any]):
        self.graph.add_node(race_id, type='Race', **data)

    def add_incident(self, incident_id: str, data: Dict[str, Any]):
        self.graph.add_node(incident_id, type='Incident', **data)

    def add_rule(self, rule_id: str, data: Dict[str, Any]):
        self.graph.add_node(rule_id, type='Rule', **data)

    def connect_driver_team(self, driver_id: str, team_id: str, year: int):
        self.graph.add_edge(driver_id, team_id, relation='DRIVES_FOR', year=year)

    def connect_driver_race(self, driver_id: str, race_id: str, position: int):
        self.graph.add_edge(driver_id, race_id, relation='COMPETED_IN', position=position)

    def connect_incident_driver(self, incident_id: str, driver_id: str, fault_score: float):
        self.graph.add_edge(incident_id, driver_id, relation='INVOLVED', fault_score=fault_score)

    def connect_incident_rule(self, incident_id: str, rule_id: str):
        self.graph.add_edge(incident_id, rule_id, relation='PENALIZED_UNDER')

    def get_neighbors(self, node_id: str):
        return list(self.graph.neighbors(node_id))

    def get_summary(self):
        return {
            "nodes": self.graph.number_of_nodes(),
            "edges": self.graph.number_of_edges(),
            "types": {
                node_type: len([n for n, d in self.graph.nodes(data=True) if d.get('type') == node_type])
                for node_type in ['Driver', 'Team', 'Race', 'Incident', 'Rule']
            }
        }

# Singleton instance
kg = F1KnowledgeGraph()
