"""
Telemetry Reasoning Agent — uses real FastF1 telemetry + Sarvam AI analysis.

Workflow:
1. Load real session telemetry for the chosen driver from FastF1.
2. Compute key metrics (speed profile, throttle aggression, brake consistency).
3. Call Sarvam AI to interpret the numbers and surface human-readable anomalies.
"""
from typing import Dict, Any
import json
from sarvam_client import sarvam_chat
from data_service import data_service


SYSTEM_PROMPT = """
You are an elite Formula 1 performance engineer and telemetry analyst.
You are given statistical summaries of a driver's lap telemetry. Your job is to:
1. Identify performance anomalies or inefficiencies.
2. Rate the driver's aggression (throttle management) and consistency (braking).
3. Suggest what the driver could improve.

Respond in structured JSON only:
{
  "driver": "<abbreviation>",
  "summary": {
    "avg_speed": <float>,
    "max_speed": <float>,
    "throttle_aggression_score": <float 0-1>,
    "consistency_rating": "<Low|Medium|High>"
  },
  "anomalies": ["<finding 1>", "<finding 2>"],
  "recommendations": ["<recommendation 1>", "<recommendation 2>"]
}
"""


class TelemetryAgent:
    def __init__(self):
        pass

    def _compute_stats(self, year: int, location: str, session_type: str, driver: str) -> Dict[str, Any]:
        """Compute raw telemetry statistics from FastF1."""
        session = data_service.get_session(year, location, session_type)
        telemetry = data_service.get_driver_telemetry(session, driver)

        avg_speed = float(telemetry["Speed"].mean())
        max_speed = float(telemetry["Speed"].max())
        throttle_std = float(telemetry["Throttle"].std())
        brake_std = float(telemetry["Brake"].std()) if "Brake" in telemetry.columns else None
        avg_throttle = float(telemetry["Throttle"].mean())

        # Gear shift aggression proxy: high std in Speed = aggressive corner entry variance
        speed_std = float(telemetry["Speed"].std())

        return {
            "avg_speed": round(avg_speed, 2),
            "max_speed": round(max_speed, 2),
            "throttle_std": round(throttle_std, 2),
            "avg_throttle_pct": round(avg_throttle, 2),
            "speed_variance": round(speed_std, 2),
            "brake_std": round(brake_std, 2) if brake_std is not None else "N/A",
        }

    def analyze_driver_performance(self, year: int, location: str, session_type: str, driver: str) -> Dict[str, Any]:
        """Compute stats from FastF1 and pass to Sarvam AI for expert analysis."""
        stats = self._compute_stats(year, location, session_type, driver)

        messages = [
            {"role": "system", "content": SYSTEM_PROMPT},
            {
                "role": "user",
                "content": (
                    f"Race: {location} {year} (Session: {session_type})\n"
                    f"Driver: {driver}\n\n"
                    f"Telemetry statistics:\n"
                    f"  Average Speed: {stats['avg_speed']} km/h\n"
                    f"  Top Speed: {stats['max_speed']} km/h\n"
                    f"  Throttle Std Dev: {stats['throttle_std']}% (higher = more aggressive)\n"
                    f"  Average Throttle: {stats['avg_throttle_pct']}%\n"
                    f"  Speed Variance (corner entry): {stats['speed_variance']} km/h std\n"
                    f"  Brake Pressure Std Dev: {stats['brake_std']}\n\n"
                    "Analyze this and respond with JSON only."
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
            result = json.loads(clean.strip())
        except Exception:
            # Fallback to computed stats if JSON parsing fails
            result = {
                "driver": driver,
                "summary": {
                    "avg_speed": stats["avg_speed"],
                    "max_speed": stats["max_speed"],
                    "throttle_aggression_score": round(stats["throttle_std"] / 100, 2),
                    "consistency_rating": "High" if isinstance(stats["brake_std"], float) and stats["brake_std"] < 10 else "Variable",
                },
                "anomalies": [raw],
                "recommendations": [],
            }
        return result


# Singleton instance
telemetry_agent = TelemetryAgent()
