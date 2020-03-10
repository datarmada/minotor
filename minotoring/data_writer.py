import json
from abc import abstractmethod, ABC
from pathlib import Path
from typing import Dict, List

import numpy as np
import pandas as pd

from minotoring.minotoring.constants import DATA_DIR


class DataWriterABC(ABC):
    def __init__(self, project_name: str):
        project_dir = DATA_DIR / project_name
        project_dir.mkdir(exist_ok=True, parents=True)
        self.json_path: Path = project_dir / "data.json"
        self.json_file: Dict = {}
        if self.json_path.exists():
            self.load_json()
        else:
            self.create_json()

    def load_json(self):
        with self.json_path.open('r') as f:
            self.json_file = json.load(f)

    def create_json(self):
        self.json_file = {
            "features": {}
        }

    def write_json_file(self):
        with self.json_path.open('w') as f:
            json.dump(self.json_file, f)

    def fill_feature(self, feature_name: str, data: List, data_type: str = "Numeric"):
        if feature_name not in self.json_file["features"]:
            self.json_file["features"][feature_name] = {
                "type": data_type,
                "value_train": [],
                "value_test": []
            }
        self.json_file["features"][feature_name]["value_train"] = data

    @abstractmethod
    def fill_w_train(self, data) -> Dict:
        pass


class DataWriterArray(DataWriterABC):
    def fill_w_train(self, data: np.ndarray) -> Dict:
        assert type(data) == np.ndarray
        data = data.transpose()
        for i, feature_data in enumerate(data):
            self.fill_feature(f"feature_{i}", feature_data.tolist(), "Numeric")
        return self.json_file


class DataWriterPandas(DataWriterABC):
    def fill_w_train(self, data: pd.DataFrame) -> Dict:
        assert type(data) == pd.DataFrame
        for col in data:
            self.fill_feature(col, data[col].values.tolist(), data[col].dtype)
        return self.json_file


type2data_writer = {
    np.ndarray: DataWriterArray,
    pd.DataFrame: DataWriterPandas
}
