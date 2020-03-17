import unittest

import numpy as np
import pandas as pd

from minotoring.data_managers.data_types import DataType
from minotoring.data_managers.preprocessors import NumpyArrayPreprocessor, PandasDataFramePreprocessor


class TestPreprocessors(unittest.TestCase):
    def test_numpy_array_preprocessor(self):
        preprocessor = NumpyArrayPreprocessor()
        preprocessed_data = preprocessor.preprocess(np.array([[1.0, 2.0], [3.0, 4.0]]))
        self.assertEqual([("feature_0", [1, 3], DataType.FLOAT), ("feature_1", [2, 4], DataType.FLOAT)],
                         preprocessed_data)

    def test_numpy_nan_preprocessor(self):
        preprocessor = NumpyArrayPreprocessor()
        preprocessed_data = preprocessor.preprocess(np.array([[1.0, 2.0], [3.0, np.nan]]))
        self.assertEqual([("feature_0", [1, 3], DataType.FLOAT), ("feature_1", [2, None], DataType.FLOAT)],
                         preprocessed_data)

    def test_dataframe_preprocessor(self):
        preprocessor = PandasDataFramePreprocessor()
        df = pd.DataFrame({"1": [1.0, 2.0], "2": [3.0, 4.0]})
        preprocessed_data = preprocessor.preprocess(df)
        self.assertEqual([("1", [1, 2], DataType.FLOAT), ("2", [3, 4], DataType.FLOAT)], preprocessed_data)

    def test_pandas_nan_preprocessor(self):
        preprocessor = PandasDataFramePreprocessor()
        df = pd.DataFrame({"1": [1.0, 2.0], "2": [3.0, np.nan]})
        preprocessed_data = preprocessor.preprocess(df)
        self.assertEqual([("1", [1, 2], DataType.FLOAT), ("2", [3, None], DataType.FLOAT)], preprocessed_data)
