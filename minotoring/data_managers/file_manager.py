import json
from pathlib import Path

from minotoring.constants import DATA_DIR
from minotoring.data_managers.data_containers.features_data_container import SingleFeatureDataContainer, \
    FeaturesDataContainer
from minotoring.data_managers.prediction_data import PredictionData


class FileManager:
    def __init__(self):
        self.feature_json_path: Path = DATA_DIR / "feature_data.json"
        self.prediction_json_path: Path = DATA_DIR / "prediction_data.json"

    def get_features_data(self) -> FeaturesDataContainer:
        return FeaturesDataContainer.from_json(
            _load_json(self.feature_json_path)) if self.feature_json_path.exists() else FeaturesDataContainer()

    def write_features_data(self, project_data: FeaturesDataContainer):
        with self.feature_json_path.open('w') as f:
            json.dump(project_data.get_dict(), f)

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
