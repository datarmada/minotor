from pathlib import Path

DATA_DIR = Path.home() / ".cache" / "pyminotor"
DATA_DIR.mkdir(parents=True, exist_ok=True)