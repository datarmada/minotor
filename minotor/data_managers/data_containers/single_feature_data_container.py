from dataclasses import dataclass, field
from typing import List, Dict

from minotor.data_managers.data_containers.feature_phase_container import FeaturePhaseContainerABC, \
    FeaturePredictionPhaseContainer, \
    FeatureTrainingPhaseContainer
from minotor.data_managers.data_types import DataType
from minotor.statistics.statistic_library import statistic_library, StatisticLibrary, crossed_statistic_library


@dataclass
class SingleFeatureDataContainer:
    data_type: DataType
    training_phase: FeaturePhaseContainerABC = field(default_factory=FeatureTrainingPhaseContainer)
    prediction_phase: FeaturePhaseContainerABC = field(default_factory=FeaturePredictionPhaseContainer)

    @staticmethod
    def from_json(data: Dict):
        return SingleFeatureDataContainer(data_type=DataType.type2value(data["type"]),
                                          training_phase=FeatureTrainingPhaseContainer.from_json(data["training"]),
                                          prediction_phase=FeaturePredictionPhaseContainer.from_json(data["prediction"])
                                          )

    def get_dict(self):
        return {
            "type": self.data_type.value,
            "training": self.training_phase.get_dict(),
            "prediction": self.prediction_phase.get_dict()
        }

    def update_feature(self, data: Dict, is_training: bool):
        phase_data = self.training_phase if is_training else self.prediction_phase
        phase_data.add_values(data)
        phase_data.compute_statistics(statistic_library)
        self.compute_crossed_statistics(crossed_statistic_library)

    def compute_crossed_statistics(self, crossed_statistic_library: StatisticLibrary):
        if self.training_phase.values and self.prediction_phase.values:
            for statistic_name, result in crossed_statistic_library.compute_all_statistics(
                    [self.training_phase.list_values, list(self.prediction_phase.values.values())]
            ):
                self.prediction_phase.statistics[statistic_name] = result
