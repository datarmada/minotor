import datetime
from abc import abstractmethod, ABC
from typing import List, Tuple

import numpy as np
import pandas as pd

from minotoring.constants import DATETIME_ID_FORMAT
from minotoring.data_managers.data_types import DataType


class PreprocessorABC(ABC):
    @abstractmethod
    def preprocess(self, data) -> List[Tuple[str, List, str]]:
        """
        :param data: data under the input format
        :return: A list corresponding to the features under the format : [(feature_name, values, data_type)]
        """
        pass

    @abstractmethod
    def get_values_infos(self, data) -> Tuple[List, List]:
        """
        :param data: data under the input format
        :return: values ids and values dates
        """
        pass


class NumpyArrayPreprocessor(PreprocessorABC):
    def get_values_infos(self, data: np.ndarray):
        current_date = datetime.datetime.now()
        return [f"{current_date.strftime(DATETIME_ID_FORMAT)}-{i}" for i in range(data.shape[0])], \
               [current_date for _ in range(data.shape[0])]

    def preprocess(self, data: np.ndarray) -> List[Tuple[str, List, DataType]]:
        data = data.transpose()
        return [(f"feature_{i}", _replace_nan_with_none(feature_data), DataType.type2value(feature_data.dtype)) for
                i, feature_data in enumerate(data)]


class PandasDataFramePreprocessor(PreprocessorABC):
    def get_values_infos(self, data: pd.DataFrame) -> Tuple[List, List]:
        current_date = datetime.datetime.now()
        return [f"{current_date.strftime(DATETIME_ID_FORMAT)}-{id}" for id in data.index], \
               [current_date for _ in range(len(data))]

    def preprocess(self, data: pd.DataFrame) -> List[Tuple[str, List, DataType]]:
        return [(col, _replace_nan_with_none(data[col].values), DataType.type2value(data[col].dtype)) for col in data]


type2preprocessor = {
    np.ndarray: NumpyArrayPreprocessor(),
    pd.DataFrame: PandasDataFramePreprocessor()
}


def _replace_nan_with_none(array: np.ndarray) -> List:
    return [x if not pd.isna(x) else None for x in array]
