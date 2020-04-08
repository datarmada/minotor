import itertools
import numpy as np

NUMPY_ENCODINGS = [
    (np.integer, int),
    (np.floating, float),
    (np.ndarray, lambda obj: obj.tolist()),
]

ENCODERS = NUMPY_ENCODINGS
