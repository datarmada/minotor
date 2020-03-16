from pathlib import Path

PACKAGE_PATH = Path(__file__).absolute().parent

DATA_DIR = Path.home() / ".cache" / "pyminotor"
DATA_DIR.mkdir(parents=True, exist_ok=True)

BACK_END_ROUTE = "http://0.0.0.0:8888/data"