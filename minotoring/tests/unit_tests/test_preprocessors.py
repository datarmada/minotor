import unittest

import pandas as pd

from minotoring.data_managers.preprocessors import NumpyArrayPreprocessor, PandasDataFramePreprocessor


class TestPreprocessors(unittest.TestCase):
    def test_numpy_array_preprocessor(self):
        preprocessor = NumpyArrayPreprocessor()
        preprocessed_data = preprocessor.preprocess(np.array([[1.0, 2.0], [3.0, 4.0]]))
        self.assertEqual([("feature_0", [1, 3], "float"), ("feature_1", [2, 4], "float")], preprocessed_data)

    def test_dataframe_preprocessor(self):
        preprocessor = PandasDataFramePreprocessor()
        df = pd.DataFrame({"1": [1.0, 2.0], "2": [3.0, 4.0]})
        preprocessed_data = preprocessor.preprocess(df)
        self.assertEqual([("1", [1, 2], "float"), ("2", [3, 4], "float")], preprocessed_data)
