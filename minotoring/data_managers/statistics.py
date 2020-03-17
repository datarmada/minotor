from typing import List, Tuple, Callable, Any, Dict

import numpy as np


def _compose_library_with_np_array(library: Dict[str, Callable[[np.ndarray], Any]]):
    return {key: _compose_func_with_np_array(val) for key, val in library.items()}


def _compose_func_with_np_array(func: Callable[[np.ndarray], Any]):
    return lambda x: func(np.array(x).astype("float"))


def _histogram(values: np.ndarray) -> Tuple[List, List]:
    histogram_w_arrays = np.histogram(values[~np.isnan(values)])
    return histogram_w_arrays[0].tolist(), histogram_w_arrays[1].tolist()


def _nb_nan(values: np.ndarray) -> int:
    return int(sum(np.isnan(values)))


raw_statistic_library = {
    "mean": np.nanmean,
    "std": np.nanstd,
    "hist": _histogram,
    "nb_nan": _nb_nan
}

statistic_library = _compose_library_with_np_array(raw_statistic_library)
