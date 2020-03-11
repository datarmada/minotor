import json
from pathlib import Path

from minotoring.minotoring.data_managers.constants import DATA_DIR
from minotoring.minotoring.data_managers.data_structure import ProjectData


class FileManager:
    def __init__(self, project_name: str):
        project_dir = DATA_DIR / project_name
        project_dir.mkdir(exist_ok=True, parents=True)
        self.json_path: Path = project_dir / "data.json"

    def get_project_data(self) -> ProjectData:
        return ProjectData(self._load_json()) if self.json_path.exists() else ProjectData()

    def write_project_data(self, project_data: ProjectData):
        with self.json_path.open('w') as f:
            json.dump(project_data.data, f)

    def _load_json(self):
        with self.json_path.open('r') as f:
            return json.load(f)

