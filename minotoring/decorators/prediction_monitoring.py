import functools
from typing import Callable

import requests

from minotoring.data_managers.file_manager import FileManager
from minotoring.constants import BACK_END_ROUTE
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
        prediction_data_container.update_predictions(result, duration_per_example)
        file_manager.write_prediction_data(prediction_data_container)
        requests.post(BACK_END_ROUTE, json=prediction_data_container.data)

        return result

    return wrapper_data
