import datetime
from abc import abstractmethod, ABC
from typing import List, Tuple, Dict

import numpy as np
import pandas as pd

from minotor.constants import DATETIME_ID_FORMAT
from minotor.data_managers.data_types import DataType


class PreprocessorABC(ABC):
    def __init__(self):
        self.current_ids = None
        self.current_dates = None

    def preprocess(self, data) -> List[Tuple[str, Dict, str]]:
        """
        :param data: data under the input format
        :return: A list corresponding to the features under the format : [(feature_name, values, data_type)]
        """
        self.current_ids, self.current_dates = self.get_values_infos(data)
        return self.get_preprocessed_data(data)

    @abstractmethod
    def get_values_infos(self, data) -> Tuple[List, List]:
        """
        :param data: data under the input format
        :return: values ids and values dates
        """
        pass

    @abstractmethod
    def get_preprocessed_data(self, data) -> List[Tuple[str, Dict, str]]:
        pass


class NumpyArrayPreprocessor(PreprocessorABC):
    def get_values_infos(self, data: np.ndarray) -> Tuple[List, List]:
        current_date = datetime.datetime.now()
        return [f"{current_date.strftime(DATETIME_ID_FORMAT)}-{i}" for i in range(data.shape[0])], \
               [current_date for _ in range(data.shape[0])]

    def get_preprocessed_data(self, data: np.ndarray) -> List[Tuple[str, Dict, DataType]]:
        data = data.transpose()
        return [(f"feature_{i}",
                 {key: val for key, val in zip(self.current_ids, _replace_nan_with_none(feature_data))},
                 DataType.type2value(feature_data.dtype))
                for i, feature_data in enumerate(data)]


class PandasDataFramePreprocessor(PreprocessorABC):
    def get_values_infos(self, data: pd.DataFrame) -> Tuple[List, List]:
        current_date = datetime.datetime.now()
        return [f"{current_date.strftime(DATETIME_ID_FORMAT)}-{id}" for id in data.index], \
               [current_date for _ in range(len(data))]

    def get_preprocessed_data(self, data: pd.DataFrame) -> List[Tuple[str, Dict, DataType]]:
        return [(col,
                {key: val for key, val in zip(self.current_ids, _replace_nan_with_none(data[col].values))},
                 DataType.type2value(data[col].dtype))
                for col in data]


type2preprocessor = {
    np.ndarray: NumpyArrayPreprocessor(),
    pd.DataFrame: PandasDataFramePreprocessor()
}


def _replace_nan_with_none(array: np.ndarray) -> List:
    return [x if not pd.isna(x) else None for x in array]
