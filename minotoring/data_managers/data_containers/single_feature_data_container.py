from dataclasses import dataclass, field
from typing import List, Dict

from minotoring.data_managers.data_containers.feature_phase_container import FeaturePhaseContainerABC, \
    FeaturePredictionPhaseContainer, \
    FeatureTrainingPhaseContainer
from minotoring.data_managers.data_types import DataType
from minotoring.data_managers.statistics import statistic_library


@dataclass()
class SingleFeatureDataContainer:
    data_type: DataType
    training_phase: FeaturePhaseContainerABC = field(default_factory=FeatureTrainingPhaseContainer)
    prediction_phase: FeaturePhaseContainerABC = field(default_factory=FeaturePredictionPhaseContainer)

    @staticmethod
    def from_json(data: Dict):
        return SingleFeatureDataContainer(data_type=DataType.type2value(data["data_type"]),
                                          training_phase=FeaturePhaseContainerABC.from_json(data["train"]),
                                          prediction_phase=FeaturePhaseContainerABC.from_json(data["predict"])
                                          )

    def get_dict(self):
        return {
            "type": self.data_type.value,
            "train": self.training_phase.get_dict(),
            "predict": self.prediction_phase.get_dict()
        }

    def update_feature(self, data: List, is_training: bool):
        phase_data = self.training_phase if is_training else self.prediction_phase
        phase_data.add_values(data)
        phase_data.compute_statistics(statistic_library)
