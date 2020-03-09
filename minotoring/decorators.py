import functools
import json
from typing import Callable, Tuple, Union, List

import numpy as np
import requests


def monitor(func: Callable):
    functools.wraps(func)

    def wrapper_data(*args: Tuple[Union[np.ndarray, List]], **kwargs):
        data = args[0]
        assert type(data) == np.ndarray or type(data) == list
        if type(data) == np.ndarray:
            data = data.tolist()
        requests.post("http://0.0.0.0:5000/data", json={'data': data})
        return func(*args, **kwargs)

    return wrapper_data
