from typing import List, Tuple, Callable, Any, Dict

import numpy as np


def _compose_library_with_np_array(library: Dict[str, Callable[[np.ndarray], Any]]):
    return {key: _compose_func_with_np_array(val) for key, val in library.items()}


def _compose_func_with_np_array(func: Callable[[np.ndarray], Any]):
    return lambda x: _call_func_w_casted_list(func, x)


def _call_func_w_casted_list(func: Callable[[np.ndarray], Any], x: List) -> Any:
    try:
        arr = np.array(x).astype("float")
    except ValueError:
        return None
    return func(arr)


def _histogram(values: np.ndarray) -> Tuple[List, List]:
    histogram_w_arrays = np.histogram(values[~np.isnan(values)])
    return histogram_w_arrays[0].tolist(), histogram_w_arrays[1].tolist()


def _nan_percentage(values: np.ndarray) -> float:
    return sum(np.isnan(values)) / len(values)


raw_statistic_library = {
    "mean": np.nanmean,
    "std": np.nanstd,
    "hist": _histogram,
    "nb_nan": _nan_percentage,
    "95_percentile": lambda x: np.percentile(x, 95),
    "05_percentile": lambda x: np.percentile(x, 5)
}

# This is to ensure None values are transformed to np.nan so that is is handled properly by numpy functions
statistic_library = _compose_library_with_np_array(raw_statistic_library)
