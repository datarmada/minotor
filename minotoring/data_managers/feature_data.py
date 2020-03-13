from dataclasses import dataclass, field
from typing import List, Dict, Callable, Any

from minotoring.data_managers.statistics import statistic_library


@dataclass
class FeatureData:
    data: Dict = field(default_factory=lambda: {
        "features": {}
    })

    def update_feature_train_phase(self, feature_name, data: List, data_type: str):
        if feature_name not in self.data["features"]:
            self._add_feature(feature_name, data_type)
        self._compute_feature_statistics(feature_name, statistic_library, data)

    def update_feature_predict_phase(self, feature_name, data: List, data_type: str):
        if feature_name not in self.data["features"]:
            self._add_feature(feature_name, data_type)
        self._add_feature_inference_values(feature_name, data)
        self._compute_feature_statistics(feature_name, statistic_library)

    def _add_feature(self, feature_name: str, data_type: str):
        self.data["features"][feature_name] = {
            "type": data_type,
            "train": {},
            "predict": {}
        }

    def _add_feature_inference_values(self, feature_name: str, data: List):
        self.data["features"][feature_name]["predict"]["values"] = \
            self.data["features"][feature_name]["predict"].get("values", []) + data

    def _compute_feature_statistics(self,
                                    feature_name: str,
                                    statistics: Dict[str, Dict[str, Callable[[List], Any]]],
                                    training_data: List = None):
        data_type = self.data["features"][feature_name]["type"]
        feature_data = training_data if training_data is not None \
            else self.data["features"][feature_name]["predict"]["values"]
        for statistic_name, statistic_func in statistics.get(data_type, {}).items():
            self.data["features"][feature_name]["predict"][statistic_name] = statistic_func(feature_data)


def _get_key(training: bool):
    return "train" if training else "predict"
