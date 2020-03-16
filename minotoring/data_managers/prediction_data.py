from dataclasses import dataclass, field
from typing import List, Dict, Callable, Any

from minotoring.data_managers.data_types import DataType
from minotoring.data_managers.statistics import statistic_library


@dataclass
class PredictionData:
    data: Dict = field(default_factory=lambda: {
        "predictions": {
            "values": []
        }
    })

    def update_predictions(self, data: List):
        self._add_prediction_values(data)
        self._compute_predictions_statistics(statistic_library)

    def _add_prediction_values(self, data: List):
        self.data["predictions"]["values"].extend(data)

    def _compute_predictions_statistics(self,
                                        statistics: Dict[DataType, Dict[str, Callable[[List], Any]]]):
        for statistic_name, statistic_func in statistics.get(DataType.FLOAT, {}).items():
            self.data["predictions"][statistic_name] = statistic_func(self.data["predictions"]["values"])
