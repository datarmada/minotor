from abc import abstractmethod, ABC
from dataclasses import dataclass, field
from typing import Dict, List

from minotor.statistics.statistic_library import StatisticLibrary


@dataclass
class FeaturePhaseContainerABC(ABC):
    values: Dict = field(default_factory=dict)
    statistics: Dict = field(default_factory=dict)

    def get_dict(self):
        return dict({"values": self.values}, **self.statistics)

    @property
    def list_values(self) -> List:
        return list(self.values.values())

    @abstractmethod
    def add_values(self, data: Dict):
        pass

    def compute_statistics(self, statistic_library: StatisticLibrary):
        for statistic_name, result in statistic_library.compute_all_statistics(self.list_values):
            self.statistics[statistic_name] = result


@dataclass
class FeatureTrainingPhaseContainer(FeaturePhaseContainerABC):
    def add_values(self, data: Dict):
        self.values = data

    @staticmethod
    def from_json(data: Dict):
        return FeatureTrainingPhaseContainer(values=data["values"],
                                             statistics={stat_name: val
                                                         for stat_name, val in data.items() if stat_name != "values"})


@dataclass
class FeaturePredictionPhaseContainer(FeaturePhaseContainerABC):
    def add_values(self, data: Dict):
        self.values = {**data, **self.values}

    @staticmethod
    def from_json(data: Dict):
        return FeaturePredictionPhaseContainer(values=data["values"],
                                               statistics={stat_name: val
                                                           for stat_name, val in data.items() if stat_name != "values"})
