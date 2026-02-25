"""
Radio & Psychology Agent — uses Sarvam AI to analyze team radio communications.

Workflow:
1. Accept raw radio transcript(s).
2. Ask Sarvam AI to detect sentiment, stress level, strategy override moments.
3. Return Psychological Pressure Index + breakdown.
"""
from typing import Dict, Any, List
import json
from sarvam_client import sarvam_chat


SYSTEM_PROMPT = """
You are an expert F1 psychologist and radio analyst. You analyze team radio
communications to detect:
- Sentiment trajectory (calm → tense → panic → anger)
- Driver stress level (0-10)
- Engineer assertiveness
- Strategy override moments (when driver overrides engineer or vice versa)
- Radio silence as a stress indicator

Produce a Psychological Pressure Index (PPI) from 0 to 100.

Respond in structured JSON only:
{
  "ppi_score": <int 0-100>,
  "sentiment_arc": "<e.g. Calm → Frustrated → Composed>",
  "stress_level": <int 0-10>,
  "engineer_assertiveness": "<Low|Medium|High>",
  "strategy_override_detected": <bool>,
  "key_moments": ["<moment 1>", "<moment 2>"],
  "summary": "<1-2 sentence psychological profile>"
}
"""


class RadioAgent:
    def __init__(self):
        pass

    def analyze_radio(self, transcripts: List[Dict[str, str]], driver: str, context: str = "") -> Dict[str, Any]:
        """
        transcripts: [{"speaker": "Driver|Engineer", "message": "...", "lap": 34}]
        """
        formatted = "\n".join(
            f"[Lap {t.get('lap', '?')}] {t['speaker']}: {t['message']}"
            for t in transcripts
        )

        messages = [
            {"role": "system", "content": SYSTEM_PROMPT},
            {
                "role": "user",
                "content": (
                    f"Driver: {driver}\n"
                    f"Race Context: {context or 'No additional context provided.'}\n\n"
                    f"Radio Transcripts:\n{formatted}\n\n"
                    "Analyze the psychology and respond with JSON only."
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
                "ppi_score": 50,
                "sentiment_arc": "Unknown",
                "stress_level": 5,
                "engineer_assertiveness": "Medium",
                "strategy_override_detected": False,
                "key_moments": [],
                "summary": raw,
            }

    def psychological_pressure_index(self, driver: str, championship_gap: int,
                                     laps_remaining: int, rival_gap_seconds: float) -> Dict[str, Any]:
        """
        Compute a PPI from race context without radio — uses Sarvam AI reasoning.
        """
        messages = [
            {"role": "system", "content": SYSTEM_PROMPT},
            {
                "role": "user",
                "content": (
                    f"Driver: {driver}\n"
                    f"Championship points gap to leader: {championship_gap} points\n"
                    f"Laps remaining: {laps_remaining}\n"
                    f"Gap to rival ahead: {rival_gap_seconds:.2f} seconds\n\n"
                    "Based on these race conditions, compute the Psychological Pressure Index "
                    "and a full psychological profile. Respond with JSON only."
                ),
            },
        ]

        raw = sarvam_chat(messages, temperature=0.4)

        try:
            clean = raw.strip()
            if clean.startswith("```"):
                clean = clean.split("```")[1]
                if clean.startswith("json"):
                    clean = clean[4:]
            return json.loads(clean.strip())
        except Exception:
            return {"ppi_score": 65, "summary": raw}


# Singleton instance
radio_agent = RadioAgent()
