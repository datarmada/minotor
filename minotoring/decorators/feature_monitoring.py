import functools
from typing import Callable, Union

import numpy as np
import pandas as pd
import requests

from minotoring.constants import BACK_END_ROUTE
from minotoring.data_managers.file_manager import FileManager
from minotoring.data_managers.preprocessors import type2preprocessor


def monitor_training_features(func: Callable):
    return _decorator_monitor_features_factory(func, training=True)


def monitor_prediction_features(func: Callable):
    return _decorator_monitor_features_factory(func, training=False)


def _decorator_monitor_features_factory(func: Callable, training: bool = False):
    functools.wraps(func)

    def wrapper_data(data: Union[np.ndarray, pd.DataFrame], *args, **kwargs):
        assert type2preprocessor.get(type(data)) is not None, \
            f"Your data type must be among {type2preprocessor.keys()} "
        file_manager = FileManager()
        feature_data_container = file_manager.get_features_data()
        preprocessor = type2preprocessor[type(data)]
        for feature_name, feature_data, data_type in preprocessor.preprocess(data):
            feature_data_container.update_feature(feature_name, feature_data, data_type, training)
        file_manager.write_features_data(feature_data_container)
        return func(data, *args, **kwargs)

    return wrapper_data
