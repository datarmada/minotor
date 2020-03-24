from dataclasses import dataclass, field
from typing import List, Dict, Tuple

import numpy as np

from minotoring.data_managers.data_containers.single_feature_data_container import SingleFeatureDataContainer
from minotoring.data_managers.data_types import DataType


@dataclass
class FeaturesDataContainer:
    features: Dict[str, SingleFeatureDataContainer] = field(default_factory=dict)

    @staticmethod
    def from_json(data: Dict):
        return FeaturesDataContainer(
            features={
                feature_name: SingleFeatureDataContainer.from_json(feature)
                for feature_name, feature in data["features"].items()
            }
        )

    def get_dict(self):
        return {"features": {feature_name: feature.get_dict() for feature_name, feature in self.features.items()}}

    def update_feature(self, feature_name, data: List, data_type: DataType, is_training: bool):
        if feature_name not in self.features:
            self._add_feature(feature_name, data_type)
        self.features[feature_name].update_feature(data, is_training)

    def _add_feature(self, feature_name: str, data_type: DataType):
        self.features[feature_name] = SingleFeatureDataContainer(data_type)

    def get_values(self, feature_names: List[str] = None) -> Tuple[List, List]:
        if not feature_names:
            feature_names = self.features.keys()
        training_values = [self.features[name].training_phase.values for name in feature_names]
        prediction_values = [self.features[name].prediction_phase.values for name in feature_names]
        return training_values, prediction_values
