from abc import abstractmethod, ABC
from typing import List, Tuple

import numpy as np
import pandas as pd

from minotoring.data_managers.data_types import DataType


class PreprocessorABC(ABC):
    @abstractmethod
    def preprocess(self, data) -> List[Tuple[str, List, str]]:
        """
        :param data: data under the input format
        :return: A list corresponding to the features under the format : [(feature_name, values, data_type)]
        """
        pass


class NumpyArrayPreprocessor(PreprocessorABC):
    def preprocess(self, data: np.ndarray) -> List[Tuple[str, List, DataType]]:
        data = data.transpose()
        return [(f"feature_{i}", feature_data.tolist(), DataType.type2value(feature_data.dtype)) for i, feature_data in enumerate(data)]


class PandasDataFramePreprocessor(PreprocessorABC):
    def preprocess(self, data) -> List[Tuple[str, List, DataType]]:
        return [(col, data[col].values.tolist(), DataType.type2value(data[col].dtype)) for col in data]


type2preprocessor = {
    np.ndarray: NumpyArrayPreprocessor(),
    pd.DataFrame: PandasDataFramePreprocessor()
}
