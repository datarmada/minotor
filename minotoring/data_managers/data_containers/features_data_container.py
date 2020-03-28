from dataclasses import dataclass, field
from typing import List, Dict, Tuple

from minotoring.data_managers.data_containers.single_feature_data_container import SingleFeatureDataContainer
from minotoring.data_managers.data_containers.values_informations import ValuesInformations
from minotoring.data_managers.data_types import DataType


@dataclass
class FeaturesDataContainer:
    features: Dict[str, SingleFeatureDataContainer] = field(default_factory=dict)
    values_infos: ValuesInformations = field(default_factory=ValuesInformations)

    @staticmethod
    def from_json(data: Dict):
        return FeaturesDataContainer(
            features={
                feature_name: SingleFeatureDataContainer.from_json(feature)
                for feature_name, feature in data["features"].items()
            },
            values_infos=ValuesInformations.from_json(data["valuesInfos"])
        )

    def get_dict(self):
        return {"features": {feature_name: feature.get_dict() for feature_name, feature in self.features.items()},
                "valuesInfos": self.values_infos.get_dict()
                }

    def update_feature(self, feature_name, data: List, data_type: DataType, is_training: bool):
        if feature_name not in self.features:
            self._add_feature(feature_name, data_type)
        self.features[feature_name].update_feature(data, is_training)

    def add_values_infos(self, values_ids: List, values_dates: List, is_training: bool):
        self.values_infos.add_ids(values_ids, is_training)
        self.values_infos.add_dates(values_dates, is_training)

    def _add_feature(self, feature_name: str, data_type: DataType):
        self.features[feature_name] = SingleFeatureDataContainer(data_type)

    def get_values(self, feature_names: List[str] = None) -> Tuple[List, List]:
        if not feature_names:
            feature_names = self.features.keys()
        training_values = [self.features[name].training_phase.values for name in feature_names]
        prediction_values = [self.features[name].prediction_phase.values for name in feature_names]
        return training_values, prediction_values
