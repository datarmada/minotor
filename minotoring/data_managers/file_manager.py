import json
from pathlib import Path

from constants import DATA_DIR
from data_managers.feature_data import FeatureData
from data_managers.prediction_data import PredictionData


class FileManager:
    def __init__(self, project_name: str):
        project_dir = DATA_DIR / project_name
        project_dir.mkdir(exist_ok=True, parents=True)
        self.feature_json_path: Path = project_dir / "feature_data.json"
        self.prediction_json_path: Path = project_dir / "prediction_data.json"

    def get_feature_data(self) -> FeatureData:
        return FeatureData(
            _load_json(self.feature_json_path)
        ) if self.feature_json_path.exists() else FeatureData()

    def write_feature_data(self, project_data: FeatureData):
        with self.feature_json_path.open('w') as f:
            json.dump(project_data.data, f)

    def get_prediction_data(self) -> PredictionData:
        return PredictionData(
            _load_json(self.prediction_json_path)
        ) if self.prediction_json_path.exists() else PredictionData()

    def write_prediction_data(self, project_data: PredictionData):
        with self.prediction_json_path.open('w') as f:
            json.dump(project_data.data, f)


def _load_json(path: Path):
    with path.open('r') as f:
        return json.load(f)
