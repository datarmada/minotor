import functools
from typing import Callable, Union

import numpy as np
import pandas as pd
import requests

from minotoring.minotoring.data_writer import type2data_writer


def monitor_train(project_name: str):
    def decorator_monitor(func: Callable):
        functools.wraps(func)

        def wrapper_data(data: Union[np.ndarray, pd.DataFrame], *args, **kwargs):
            assert type(data) == np.ndarray or type(data) == pd.DataFrame
            data_writer = type2data_writer[type(data)](project_name)
            json_file = data_writer.fill_w_train(data)
            data_writer.write_json_file()

            requests.post("http://0.0.0.0:5000/data", json=json_file)
            return func(data, *args, **kwargs)

        return wrapper_data

    return decorator_monitor
