import unittest

import numpy as np
import pandas as pd

from minotoring.minotoring.data_writer import DataWriterArray, DataWriterPandas


class TestDataWriter(unittest.TestCase):
    def test_create_numpy_data(self):
        data_writer = DataWriterArray("test")
        array = np.array([[1, 2], [3, 4]])
        json_file = data_writer.fill_w_train(array)
        self.assertDictEqual(json_file, {
            "features": {
                "feature_0": {
                    "type": "Numeric",
                    "value_train": [1, 3],
                    "value_test": []
                },
                "feature_1": {
                    "type": "Numeric",
                    "value_train": [2, 4],
                    "value_test": []
                }
            }
        })

    def test_create_pandas_data(self):
        data_writer = DataWriterPandas("test")
        df = pd.DataFrame({"col_1": [1, 3], "col_2": [2, 4]})
        json_file = data_writer.fill_w_train(df)
        self.assertDictEqual(json_file, {
            "features": {
                "col_1": {
                    "type": "int",
                    "value_train": [1, 3],
                    "value_test": []
                },
                "col_2": {
                    "type": "int",
                    "value_train": [2, 4],
                    "value_test": []
                }
            }
        })

    def test_wrong_data(self):
        data_writer_pandas = DataWriterPandas("test")
        df = pd.DataFrame({"col_1": [1, 3], "col_2": [2, 4]})
        data_writer_numpy = DataWriterArray("test")
        array = np.array([[1, 2], [3, 4]])
        self.assertRaises(AssertionError, lambda: data_writer_pandas.fill_w_train(array))
        self.assertRaises(AssertionError, lambda: data_writer_numpy.fill_w_train(df))
