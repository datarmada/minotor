from dataclasses import dataclass, field
from typing import List, Dict

from minotor.statistics.statistic_library import statistic_library, StatisticLibrary


@dataclass
class PredictionData:
    data: Dict = field(default_factory=lambda: {
        "predictions": {
            "values": [],
            "timing": []
        }
    })

    def update_predictions(self, data: List, duration_per_example: float):
        self._add_prediction_values(data, [duration_per_example] * len(data))
        self._compute_predictions_statistics(statistic_library)

    def _add_prediction_values(self, data: List, timing: List):
        self.data["predictions"]["values"].extend(data)
        self.data["predictions"]["timing"].extend(timing)

    def _compute_predictions_statistics(self, statistics: StatisticLibrary):
        for statistic_name, result in statistics.compute_all_statistics(self.data["predictions"]["values"]):
            self.data["predictions"][statistic_name] = result
