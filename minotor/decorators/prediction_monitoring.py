import functools
from typing import Callable

import requests

from minotor.data_managers.file_manager import FileManager
import time


def monitor_predictions(func: Callable):
    functools.wraps(func)

    def wrapper_data(*args, **kwargs):
        start_time = time.perf_counter()
        result = func(*args, **kwargs)
        duration = time.perf_counter() - start_time
        duration_per_example = duration / len(result)
        file_manager = FileManager()
        prediction_data_container = file_manager.get_prediction_data()
        prediction_data_container.update_predictions(
            result, duration_per_example)
        file_manager.write_prediction_data(prediction_data_container)
        return result

    return wrapper_data
