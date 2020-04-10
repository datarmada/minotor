from pathlib import Path

PACKAGE_PATH = Path(__file__).absolute().parent

DATA_DIR = Path.home() / ".cache" / "pyminotor"
DATA_DIR.mkdir(parents=True, exist_ok=True)

DATETIME_FORMAT = "%m/%d/%y %H:%M:%S"
DATETIME_ID_FORMAT = "%m%d%y%H%M%S%f"
