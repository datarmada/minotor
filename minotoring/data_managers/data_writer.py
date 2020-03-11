import json
from abc import abstractmethod, ABC
from pathlib import Path
from typing import Dict, List

import numpy as np
import pandas as pd

from minotoring.minotoring.data_managers.constants import DATA_DIR


class DataWriterABC(ABC):
    def __init__(self, project_name: str):
        project_dir = DATA_DIR / project_name
        project_dir.mkdir(exist_ok=True, parents=True)
        self.json_path: Path = project_dir / "data.json"
        self.json_data: Dict = {}
        if self.json_path.exists():
            self._load_json()
        else:
            self._create_json()

    @abstractmethod
    def fill_json_w_data(self, data, training: bool = False) -> Dict:
        pass

    def write_json_file(self):
        with self.json_path.open('w') as f:
            json.dump(self.json_data, f)

    def _load_json(self):
        with self.json_path.open('r') as f:
            self.json_data = json.load(f)

    def _create_json(self):
        self.json_data = {
            "features": {}
        }

    def _fill_feature_values(self, feature_name: str, data: List, data_type: str = "Numeric", training: bool = False):
        if feature_name not in self.json_data["features"]:
            self.json_data["features"][feature_name] = _create_generic_feature(data_type)
        if training:
            self.json_data["features"][feature_name]["train"]["values"] = data
        else:
            self.json_data["features"][feature_name]["predict"]["values"] = \
                self.json_data["features"][feature_name]["predict"].get("values", []) + data


class DataWriterNumpyArray(DataWriterABC):
    def fill_json_w_data(self, data: np.ndarray, training: bool = False) -> Dict:
        assert type(data) == np.ndarray
        data = data.transpose()
        for i, feature_data in enumerate(data):
            self._fill_feature_values(f"feature_{i}", feature_data.tolist(), feature_data.dtype, training)
        return self.json_data


class DataWriterPandasDataframe(DataWriterABC):
    def fill_json_w_data(self, data: pd.DataFrame, training: bool = False) -> Dict:
        assert type(data) == pd.DataFrame
        for col in data:
            self._fill_feature_values(col, data[col].values.tolist(), data[col].dtype, training)
        return self.json_data


def _create_generic_feature(data_type: str) -> Dict:
    return {
        "type": data_type,
        "train": {
        },
        "predict": {
        },
    }


type2data_writer = {
    np.ndarray: DataWriterNumpyArray,
    pd.DataFrame: DataWriterPandasDataframe
}
