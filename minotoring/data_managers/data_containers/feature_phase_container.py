from abc import abstractmethod, ABC
from dataclasses import dataclass, field
from typing import Dict, List

from minotoring.statistics.statistic_library import StatisticLibrary


@dataclass
class FeaturePhaseContainerABC(ABC):
    values: List = field(default_factory=list)
    statistics: Dict = field(default_factory=dict)

    def get_dict(self):
        return dict({"values": self.values}, **self.statistics)

    @abstractmethod
    def add_values(self, data: List):
        pass

    def compute_statistics(self, statistic_library: StatisticLibrary):
        for statistic_name, result in statistic_library.compute_all_statistics(self.values):
            self.statistics[statistic_name] = result


@dataclass
class FeatureTrainingPhaseContainer(FeaturePhaseContainerABC):
    def add_values(self, data: List):
        self.values = data

    @staticmethod
    def from_json(data: Dict):
        return FeatureTrainingPhaseContainer(values=data["values"],
                                             statistics={stat_name: val
                                                         for stat_name, val in data.items() if stat_name != "values"})


@dataclass
class FeaturePredictionPhaseContainer(FeaturePhaseContainerABC):
    def add_values(self, data: List):
        self.values += data

    @staticmethod
    def from_json(data: Dict):
        return FeaturePredictionPhaseContainer(values=data["values"],
                                               statistics={stat_name: val
                                                           for stat_name, val in data.items() if stat_name != "values"})
