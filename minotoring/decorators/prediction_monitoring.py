import functools
from typing import Callable

import requests

from minotoring.data_managers.file_manager import FileManager


def monitor_predictions(project_name: str):
    def decorator_monitor(func: Callable):
        functools.wraps(func)

        def wrapper_data(*args, **kwargs):
            result = func(*args, **kwargs)
            file_manager = FileManager(project_name)
            prediction_data_container = file_manager.get_prediction_data()
            prediction_data_container.update_predictions(result)
            file_manager.write_prediction_data(prediction_data_container)
            requests.post("http://0.0.0.0:5000/data", json=prediction_data_container.data)

            return result

        return wrapper_data()

    return decorator_monitor