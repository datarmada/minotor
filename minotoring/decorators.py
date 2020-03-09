import functools
from typing import Callable, Tuple, Union, List

import numpy as np
import requests


def monitor(func: Callable):
    functools.wraps(func)

    def wrapper_data(data: Union[np.ndarray, List], *args, **kwargs):
        assert type(data) == np.ndarray or type(data) == list
        if type(data) == np.ndarray:
            data = data.tolist()
        requests.post("http://0.0.0.0:5000/data", json={'data': data})
        return func(data, *args, **kwargs)

    return wrapper_data
