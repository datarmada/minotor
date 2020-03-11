from dataclasses import dataclass, field
from typing import List, Dict, Callable, Any

from minotoring.data_managers.statistics import statistic_library


@dataclass
class ProjectData:
    data: Dict = field(default_factory=lambda: {
        "features": {}
    })

    def update_feature(self, feature_name, data: List, data_type: str, training: bool = False):
        if feature_name not in self.data["features"]:
            self._add_feature(feature_name, data_type)
        self._add_feature_values(feature_name, data, training)
        self._compute_feature_statistics(feature_name, statistic_library, training)

    def _add_feature(self, feature_name: str, data_type: str):
        self.data["features"][feature_name] = {
            "type": data_type,
            "train": {},
            "predict": {}
        }

    def _add_feature_values(self, feature_name: str, data: List, training: bool):
        if training:
            self.data["features"][feature_name][_get_key(training)]["values"] = data
        else:
            self.data["features"][feature_name][_get_key(training)]["values"] = \
                self.data["features"][feature_name][_get_key(training)].get("values", []) + data

    def _compute_feature_statistics(self, feature_name: str,
                                    statistics: Dict[str, Dict[str, Callable[[List], Any]]],
                                    training: bool):
        data_type = self.data["features"][feature_name]["type"]
        for statistic_name, statistic_func in statistics.get(data_type, {}).items():
            self.data["features"][feature_name][_get_key(training)][statistic_name] = \
                statistic_func(self.data["features"][feature_name][_get_key(training)]["values"])


def _get_key(training: bool):
    return "train" if training else "predict"
