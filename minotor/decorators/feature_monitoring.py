import functools
from typing import Callable, Union

import numpy as np
import pandas as pd

from minotor.data_managers.file_manager import FileManager
from minotor.data_managers.preprocessors import type2preprocessor


def monitor_training_features(func: Callable):
    return _decorator_monitor_features_factory(func, training=True)


def monitor_prediction_features(func: Callable):
    return _decorator_monitor_features_factory(func, training=False)


def _decorator_monitor_features_factory(func: Callable, training: bool = False):
    functools.wraps(func)

    def wrapper_data(data: Union[np.ndarray, pd.DataFrame], *args, **kwargs):
        allowed_types_string = ' '.join(
            [str(elt) for elt in type2preprocessor.keys()])
        assert type2preprocessor.get(type(data)) is not None, \
            f"Your data type must be one of the following : {allowed_types_string}"
        file_manager = FileManager()
        feature_data_container = file_manager.get_features_data()
        preprocessor = type2preprocessor[type(data)]
        for feature_name, feature_data, data_type in preprocessor.preprocess(data):
            feature_data_container.update_feature(
                feature_name, feature_data, data_type, training)
        feature_data_container.add_values_infos(
            preprocessor.current_ids, preprocessor.current_dates, training)
        file_manager.write_features_data(feature_data_container)
        return func(data, *args, **kwargs)

    return wrapper_data
