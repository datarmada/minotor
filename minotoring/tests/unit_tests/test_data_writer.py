import unittest

import numpy as np
import pandas as pd

from minotoring.minotoring.data_managers.preprocessors import DataWriterNumpyArray, DataWriterPandasDataframe


class TestDataWriter(unittest.TestCase):
    def test_create_numpy_data(self):
        data_writer = DataWriterNumpyArray(".test")
        array = np.array([[1, 2], [3, 4]])
        json_data = data_writer.fill_json_w_data(array, training=True)
        self.assertDictEqual(json_data, {
            "features": {
                "feature_0": {
                    "type": "int",
                    "train": {
                        "values": [1, 3]
                    },
                    "infer": {
                    }
                },
                "feature_1": {
                    "type": "int",
                    "train": {
                        "values": [2, 4]
                    },
                    "infer": {
                    }
                }
            }
        })

    def test_create_pandas_data(self):
        data_writer = DataWriterPandasDataframe(".test")
        df = pd.DataFrame({"col_1": [1, 3], "col_2": [2, 4]})
        json_data = data_writer.fill_json_w_data(df, training=True)
        self.assertDictEqual(json_data, {
            "features": {
                "col_1": {
                    "type": "int",
                    "train": {
                        "values": [1, 3]
                    },
                    "infer": {
                    }
                },
                "col_2": {
                    "type": "int",
                    "train": {
                        "values": [2, 4]
                    },
                    "infer": {
                    }
                }
            }
        })

    def test_wrong_data(self):
        data_writer_pandas = DataWriterPandasDataframe(".test")
        df = pd.DataFrame({"col_1": [1, 3], "col_2": [2, 4]})
        data_writer_numpy = DataWriterNumpyArray(".test")
        array = np.array([[1, 2], [3, 4]])
        self.assertRaises(AssertionError, lambda: data_writer_pandas.fill_json_w_data(array))
        self.assertRaises(AssertionError, lambda: data_writer_numpy.fill_json_w_data(df))

    def test_infer_data(self):
        data_writer = DataWriterPandasDataframe(".test")
        df = pd.DataFrame({"col_1": [1, 3], "col_2": [2, 4]})
        json_data = data_writer.fill_json_w_data(df)
        self.assertListEqual(json_data["features"]["col_1"]["infer"]["values"], [1, 3])
        self.assertListEqual(json_data["features"]["col_2"]["infer"]["values"], [2, 4])

        json_data = data_writer.fill_json_w_data(df)
        self.assertListEqual(json_data["features"]["col_1"]["infer"]["values"], [1, 3, 1, 3])
        self.assertListEqual(json_data["features"]["col_2"]["infer"]["values"], [2, 4, 2, 4])

    def test_train_and_infer_data(self):
        data_writer = DataWriterNumpyArray(".test")
        array = np.array([[1, 2], [3, 4]])
        data_writer.fill_json_w_data(array, training=True)
        json_data = data_writer.fill_json_w_data(array)
        self.assertListEqual(json_data["features"]["feature_0"]["infer"]["values"], [1, 3])
        self.assertListEqual(json_data["features"]["feature_0"]["train"]["values"], [1, 3])
        self.assertListEqual(json_data["features"]["feature_1"]["infer"]["values"], [2, 4])
        self.assertListEqual(json_data["features"]["feature_1"]["train"]["values"], [2, 4])
