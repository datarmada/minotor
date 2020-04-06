import unittest

import numpy as np
import pandas as pd

from minotoring.data_managers.data_types import DataType
from minotoring.data_managers.preprocessors import NumpyArrayPreprocessor, PandasDataFramePreprocessor


class TestPreprocessors(unittest.TestCase):
    def test_numpy_array_preprocessor(self):
        preprocessor = NumpyArrayPreprocessor()
        preprocessed_data = preprocessor.preprocess(np.array([[1.0, 2.0], [3.0, 4.0]]))
        self.assertEqual("feature_0", preprocessed_data[0][0])
        self.assertEqual("feature_1", preprocessed_data[1][0])
        self.assertEqual([1, 3], list(preprocessed_data[0][1].values()))
        self.assertEqual([2, 4], list(preprocessed_data[1][1].values()))
        self.assertEqual(DataType.FLOAT, preprocessed_data[0][2])

    def test_numpy_nan_preprocessor(self):
        preprocessor = NumpyArrayPreprocessor()
        preprocessed_data = preprocessor.preprocess(np.array([[1.0, 2.0], [3.0, np.nan]]))
        self.assertEqual([2, None], list(preprocessed_data[1][1].values()))

    def test_dataframe_preprocessor(self):
        preprocessor = PandasDataFramePreprocessor()
        df = pd.DataFrame({"1": [1.0, 2.0], "2": [3.0, 4.0]})
        preprocessed_data = preprocessor.preprocess(df)
        self.assertEqual("1", preprocessed_data[0][0])
        self.assertEqual("2", preprocessed_data[1][0])
        self.assertEqual([1, 2], list(preprocessed_data[0][1].values()))
        self.assertEqual([3, 4], list(preprocessed_data[1][1].values()))
        self.assertEqual(DataType.FLOAT, preprocessed_data[0][2])

    def test_pandas_nan_preprocessor(self):
        preprocessor = PandasDataFramePreprocessor()
        df = pd.DataFrame({"1": [1.0, 2.0], "2": [3.0, np.nan]})
        preprocessed_data = preprocessor.preprocess(df)
        self.assertEqual([3, None], list(preprocessed_data[1][1].values()))

    def test_pandas_str_preprocessor(self):
        preprocessor = PandasDataFramePreprocessor()
        df = pd.DataFrame({"1": ["1", "2"], "2": ["3", np.nan]})
        preprocessed_data = preprocessor.preprocess(df)
        self.assertEqual(["1", "2"], list(preprocessed_data[0][1].values()))
        self.assertEqual(["3", None], list(preprocessed_data[1][1].values()))
        self.assertEqual(DataType.OTHER, preprocessed_data[0][2])
        self.assertEqual(DataType.OTHER, preprocessed_data[1][2])

    def test_pandas_categorical_preprocessor(self):
        preprocessor = PandasDataFramePreprocessor()
        df = pd.DataFrame({"1": pd.Series(["a", np.nan], dtype="category")})
        preprocessed_data = preprocessor.preprocess(df)
        self.assertEqual(["a", None], list(preprocessed_data[0][1].values()))
        self.assertEqual(DataType.CATEGORY, preprocessed_data[0][2])
