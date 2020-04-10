from dataclasses import dataclass, field
from datetime import datetime
from typing import List, Dict

from minotor.constants import DATETIME_FORMAT


@dataclass
class ValuesInformationsPerPhase:
    ids: List[str] = field(default_factory=list)
    dates: List[datetime] = field(default_factory=list)

    @staticmethod
    def from_json(data: Dict):
        return ValuesInformationsPerPhase(ids=data["ids"],
                                          dates=[datetime.strptime(date_string, DATETIME_FORMAT) for date_string in
                                                 data["dates"]])

    def get_dict(self):
        return {
            "ids": self.ids,
            "dates": [date.strftime(DATETIME_FORMAT) for date in self.dates]
        }


@dataclass
class ValuesInformations:
    training: ValuesInformationsPerPhase = field(default_factory=ValuesInformationsPerPhase)
    prediction: ValuesInformationsPerPhase = field(default_factory=ValuesInformationsPerPhase)

    @staticmethod
    def from_json(data: Dict):
        return ValuesInformations(training=ValuesInformationsPerPhase.from_json(data["training"]),
                                  prediction=ValuesInformationsPerPhase.from_json(data["prediction"]))

    def get_dict(self):
        return {
            "training": self.training.get_dict(),
            "prediction": self.prediction.get_dict(),
            "id2phase": {
                **{id: "training" for id in self.training.ids},
                **{id: "prediction" for id in self.prediction.ids}
            }
        }
    
    def add_ids(self, values_ids: List, is_training: bool):
        if is_training:
            self.training.ids.extend(values_ids)
        else:
            self.prediction.ids.extend(values_ids)

    def add_dates(self, values_dates: List, is_training: bool):
        if is_training:
            self.training.dates.extend(values_dates)
        else:
            self.prediction.dates.extend(values_dates)
