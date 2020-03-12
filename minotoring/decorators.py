import functools
from typing import Callable, Union

import numpy as np
import pandas as pd
import requests

from minotoring.data_managers.file_manager import FileManager
from minotoring.data_managers.preprocessors import type2preprocessor


def monitor_train(project_name: str):
    return _decorator_monitor_factory(project_name, training=True)


def monitor_predict(project_name: str):
    return _decorator_monitor_factory(project_name, training=False)


def _decorator_monitor_factory(project_name: str, training: bool = False):
    def decorator_monitor(func: Callable):
        functools.wraps(func)

        def wrapper_data(data: Union[np.ndarray, pd.DataFrame], *args, **kwargs):
            assert type2preprocessor.get(type(data)) is not None, \
                f"Your data type must be among {type2preprocessor.keys()} "
            file_manager = FileManager(project_name)
            project_data = file_manager.get_project_data()
            preprocessor = type2preprocessor[type(data)]
            for feature_name, feature_data, data_type in preprocessor.preprocess(data):
                if training:
                    project_data.update_feature_train_phase(feature_name, feature_data, data_type)
                else:
                    project_data.update_feature_predict_phase(feature_name, feature_data, data_type)
            file_manager.write_project_data(project_data)

            requests.post("http://0.0.0.0:5000/data", json=project_data.data)
            return func(data, *args, **kwargs)

        return wrapper_data

    return decorator_monitor
