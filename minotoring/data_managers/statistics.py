from typing import List, Tuple

import numpy as np

from minotoring.data_managers.data_types import DataType


def _histogram(values: List) -> Tuple[List, List]:
    histogram_w_arrays = np.histogram(values)
    return histogram_w_arrays[0].tolist(), histogram_w_arrays[1].tolist()


def _nb_nan(values: List) -> int:
    return int(sum(np.isnan(values)))


statistic_library = {
    DataType.INT: {
        "mean": np.nanmean,
        "std": np.nanstd,
        "hist": _histogram,
        "nb_nan": _nb_nan
    },
    DataType.FLOAT: {
        "mean": np.nanmean,
        "std": np.nanstd,
        "hist": _histogram,
        "nb_nan": _nb_nan
    },
}
