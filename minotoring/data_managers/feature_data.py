from dataclasses import dataclass, field
from typing import List, Dict, Callable, Any

from minotoring.data_managers.data_types import DataType
from minotoring.data_managers.statistics import statistic_library


@dataclass
class FeatureData:
    data: Dict = field(default_factory=lambda: {
        "features": {}
    })

    def update_feature_train_phase(self, feature_name, data: List, data_type: DataType):
        if feature_name not in self.data["features"]:
            self._add_feature(feature_name, data_type)
        self._compute_feature_statistics(feature_name, statistic_library, data_type, data)

    def update_feature_predict_phase(self, feature_name, data: List, data_type: DataType):
        if feature_name not in self.data["features"]:
            self._add_feature(feature_name, data_type)
        self._add_feature_inference_values(feature_name, data)
        self._compute_feature_statistics(feature_name, statistic_library, data_type)

    def _add_feature(self, feature_name: str, data_type: DataType):
        self.data["features"][feature_name] = {
            "type": data_type.value,
            "train": {},
            "predict": {}
        }

    def _add_feature_inference_values(self, feature_name: str, data: List):
        self.data["features"][feature_name]["predict"]["values"] = \
            self.data["features"][feature_name]["predict"].get("values", []) + data

    def _compute_feature_statistics(self,
                                    feature_name: str,
                                    statistics: Dict[DataType, Dict[str, Callable[[List], Any]]],
                                    data_type: DataType,
                                    training_data: List = None):
        feature_data = training_data if training_data is not None \
            else self.data["features"][feature_name]["predict"]["values"]
        for statistic_name, statistic_func in statistics.get(data_type, {}).items():
            self.data["features"][feature_name]["predict" if training_data is None else "train"][statistic_name] = statistic_func(feature_data)
