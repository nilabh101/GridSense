import fastf1
import pandas as pd
import os
from typing import List, Dict, Any

class F1DataService:
    def __init__(self, cache_dir: str = "../data/fastf1_cache"):
        self.cache_dir = cache_dir
        if not os.path.exists(self.cache_dir):
            os.makedirs(self.cache_dir)
        fastf1.Cache.enable_cache(self.cache_dir)

    def get_session(self, year: int, location: str, session_type: str):
        """
        session_type: 'FP1', 'FP2', 'FP3', 'Q', 'S', 'SS', 'R'
        """
        session = fastf1.get_session(year, location, session_type)
        session.load()
        return session

    def get_driver_telemetry(self, session, driver_abbr: str):
        laps = session.laps.pick_driver(driver_abbr)
        telemetry = laps.get_telemetry()
        return telemetry

    def get_session_results(self, session):
        results = session.results
        # Convert to list of dicts for JSON serialization
        return results[['Abbreviation', 'FullName', 'TeamName', 'Position', 'Status', 'Points']].to_dict('records')

    def get_lap_data(self, session):
        laps = session.laps
        return laps[['LapNumber', 'Driver', 'LapTime', 'Stint', 'Compound', 'TyreLife']].to_dict('records')

# Singleton instance
data_service = F1DataService()
