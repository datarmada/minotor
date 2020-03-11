import functools
from typing import Callable, Union

import numpy as np
import pandas as pd
import requests

from minotoring.minotoring.data_writer import type2data_writer


def monitor_train(project_name: str):
    return _decorator_monitor_factory(project_name, training=True)


def monitor_predict(project_name: str):
    return _decorator_monitor_factory(project_name, training=False)


def _decorator_monitor_factory(project_name: str, training: bool = False):
    def decorator_monitor(func: Callable):
        functools.wraps(func)

        def wrapper_data(data: Union[np.ndarray, pd.DataFrame], *args, **kwargs):
            assert type2data_writer.get(type(data)) is not None, \
                f"Your data type must be among {type2data_writer.keys()} "
            data_writer = type2data_writer[type(data)](project_name)
            json_file = data_writer.fill_json_w_data(data, training)
            data_writer.write_json_file()

            requests.post("http://0.0.0.0:5000/data", json=json_file)
            return func(data, *args, **kwargs)

        return wrapper_data

    return decorator_monitor
