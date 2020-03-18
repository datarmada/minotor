from dataclasses import dataclass, field
from typing import List, Dict, Callable, Any

from minotoring.data_managers.statistics import statistic_library


@dataclass
class PredictionData:
    data: Dict = field(default_factory=lambda: {
        "predictions": {
            "values": [],
            "timing":[]
        }
    })

    def update_predictions(self, data: List, duration_per_example: float):
        self._add_prediction_values(data, [duration_per_example] * len(data))
        self._compute_predictions_statistics(statistic_library)

    def _add_prediction_values(self, data: List, timing: List):
        self.data["predictions"]["values"].extend(data)
        self.data["predictions"]["timing"].extend(timing)
        
    def _compute_predictions_statistics(self, statistics: Dict[str, Callable[[List], Any]]):
        for statistic_name, statistic_func in statistics.items():
            self.data["predictions"][statistic_name] = statistic_func(self.data["predictions"]["values"])
