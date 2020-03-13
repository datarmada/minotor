from typing import List, Tuple

import numpy as np


def _histogram(values: List) -> Tuple[List, List]:
    histogram_w_arrays = np.histogram(values)
    return histogram_w_arrays[0].tolist(), histogram_w_arrays[1].tolist()


def _nb_nan(values: List) -> List:
    return sum(np.isnan(values))


statistic_library = {
    "int": {
        "mean": np.nanmean,
        "std": np.nanstd,
        "hist": _histogram,
        "nb_nan": _nb_nan
    },
    "float": {
        "mean": np.nanmean,
        "std": np.nanstd,
        "hist": _histogram,
        "nb_nan": _nb_nan
    },
}
