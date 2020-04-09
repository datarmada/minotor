import itertools

import numpy as np
import pandas as pd

NUMPY_ENCODINGS = [
    (np.integer, int),
    (np.floating, float),
    (np.ndarray, lambda obj: obj.tolist()),
]

PANDAS_ENCODINGS = [
    (pd.core.indexes.base.Index, lambda obj: obj.tolist())
]

ENCODERS = NUMPY_ENCODINGS + PANDAS_ENCODINGS
