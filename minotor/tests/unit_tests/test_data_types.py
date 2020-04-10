import unittest

import numpy as np
import pandas as pd

from minotor.data_managers.data_types import DataType


class TestDataType(unittest.TestCase):
    def test_numpy_float2data_type(self):
        arr = np.array([[1.0, 1.2]])
        dtype = arr.dtype
        self.assertEqual(DataType.type2value(dtype), DataType.FLOAT)

    def test_numpy_int2data_type(self):
        arr = np.array([[1, 1]])
        dtype = arr.dtype
        self.assertEqual(DataType.type2value(dtype), DataType.INT)

    def test_numpy_bool2data_type(self):
        arr = np.array([[True, False]])
        dtype = arr.dtype
        self.assertEqual(DataType.type2value(dtype), DataType.BOOL)

    def test_pandas_int2data_type(self):
        s = pd.Series([1, 2])
        self.assertEqual(DataType.type2value(s.dtype), DataType.INT)

    def test_pandas_float2data_type(self):
        s = pd.Series([1.0, 2.0])
        self.assertEqual(DataType.type2value(s.dtype), DataType.FLOAT)

    def test_pandas_cat2data_type(self):
        s = pd.Series(["cat1", "cat2"], dtype="category")
        self.assertEqual(DataType.type2value(s.dtype), DataType.CATEGORY)

    def test_pandas_bool2data_type(self):
        s = pd.Series([True, False])
        self.assertEqual(DataType.type2value(s.dtype), DataType.BOOL)
