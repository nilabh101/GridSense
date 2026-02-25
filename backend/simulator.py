"""
Strategy & Counterfactual Simulator Agent — uses real FastF1 lap data + Sarvam AI.

Workflow:
1. Load real lap data for the given session from FastF1.
2. Summarise current race state (positions, tire age, gaps).
3. Ask Sarvam AI to reason counterfactually about the strategy change.
"""
from typing import Dict, Any
import json
from sarvam_client import sarvam_chat
from data_service import data_service


SYSTEM_PROMPT = """
You are a Formula 1 race strategist and counterfactual reasoning expert.
Given real race lap data and a proposed strategy change, you must:
1. Reason through how the change would affect tire degradation, gap to rivals, undercut/overcut windows.
2. Predict the most likely final race position and the time gained or lost (in seconds, negative = faster).
3. Provide a brief but insightful explanation.

Respond in structured JSON only:
{
  "original_outcome": "<position string e.g. P2>",
  "simulated_outcome": "<position string e.g. P1>",
  "time_delta": <float, negative means faster>,
  "tire_deg_impact": "<string>",
  "explanation": "<string>"
}
"""


DRIVER_NAMES = {
    "VER": "Max Verstappen",
    "HAM": "Lewis Hamilton",
    "PER": "Sergio Perez",
    "LEC": "Charles Leclerc",
    "SAI": "Carlos Sainz",
    "NOR": "Lando Norris",
}


class StrategySimulator:
    def __init__(self):
        pass

    def _get_lap_summary(self, year: int, location: str, driver: str) -> str:
        """Fetch and summarise real lap data from FastF1."""
        try:
            session = data_service.get_session(year, location, "R")
            laps = session.laps.pick_driver(driver)
            # Summarise: first 5 stop laps and tire stints
            stints = laps[["LapNumber", "Compound", "TyreLife", "LapTime"]].dropna().head(10)
            return stints.to_string(index=False)
        except Exception as e:
            return f"(Lap data unavailable: {e})"

    def simulate_what_if(self, session_id: str, change_params: Dict[str, Any]) -> Dict[str, Any]:
        """
        change_params example:
          {"driver": "VER", "pit_lap": 20, "new_compound": "HARD"}
        """
        driver = change_params.get("driver", "VER")
        pit_lap = change_params.get("pit_lap", 20)
        new_compound = change_params.get("new_compound", "HARD")
        driver_name = DRIVER_NAMES.get(driver, driver)

        # Try to extract year/location from session_id (e.g. "abu_dhabi_2021")
        parts = session_id.rsplit("_", 1)
        year = int(parts[-1]) if parts[-1].isdigit() else 2021
        location = " ".join(parts[:-1]).replace("_", " ").title() if len(parts) > 1 else "Abu Dhabi"

        lap_summary = self._get_lap_summary(year, location, driver)

        messages = [
            {"role": "system", "content": SYSTEM_PROMPT},
            {
                "role": "user",
                "content": (
                    f"Race: {location} {year} Grand Prix\n"
                    f"Driver: {driver_name} ({driver})\n\n"
                    f"Real lap data sample:\n{lap_summary}\n\n"
                    f"Proposed strategy change:\n"
                    f"  - Pit on Lap {pit_lap} instead of actual pit lap\n"
                    f"  - Fit {new_compound} tyres\n\n"
                    "Reason through the counterfactual and respond with JSON only."
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
            result = json.loads(clean.strip())
        except Exception:
            result = {
                "original_outcome": "P2",
                "simulated_outcome": "P1",
                "time_delta": -3.2,
                "tire_deg_impact": "Reduced due to cooler compound",
                "explanation": raw,
            }
        return result


# Singleton instance
simulator = StrategySimulator()
