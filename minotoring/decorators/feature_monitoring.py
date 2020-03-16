import functools
from typing import Callable, Union

import numpy as np
import pandas as pd
import requests

from minotoring.data_managers.file_manager import FileManager
from minotoring.data_managers.preprocessors import type2preprocessor


def monitor_training_features(project_name: str):
    return _decorator_monitor_features_factory(project_name, training=True)


def monitor_prediction_features(project_name: str):
    return _decorator_monitor_features_factory(project_name, training=False)


def _decorator_monitor_features_factory(project_name: str, training: bool = False):
    def decorator_monitor(func: Callable):
        functools.wraps(func)

        def wrapper_data(data: Union[np.ndarray, pd.DataFrame], *args, **kwargs):
            assert type2preprocessor.get(type(data)) is not None, \
                f"Your data type must be among {type2preprocessor.keys()} "
            file_manager = FileManager(project_name)
            feature_data_container = file_manager.get_feature_data()
            preprocessor = type2preprocessor[type(data)]
            for feature_name, feature_data, data_type in preprocessor.preprocess(data):
                if training:
                    feature_data_container.update_feature_train_phase(feature_name, feature_data, data_type)
                else:
                    feature_data_container.update_feature_predict_phase(feature_name, feature_data, data_type)
            file_manager.write_feature_data(feature_data_container)

            requests.post("http://0.0.0.0:8888/data", json=feature_data_container.data)
            return func(data, *args, **kwargs)

        return wrapper_data

    return decorator_monitor
