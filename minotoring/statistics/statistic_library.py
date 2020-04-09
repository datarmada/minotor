from typing import List, Tuple, Callable, Any, Dict, Generator

import numpy as np
from scipy.stats import entropy


class StatisticLibrary:
    def __init__(self):
        self.statistics: Dict[str, Callable[[np.ndarray], Any]] = {}

    def add_statistic(self, statistic: Callable[[np.ndarray], Any], name: str = None):
        if name is None:
            name = statistic.__name__
        self.statistics[name] = statistic

    def compute_all_statistics(self, values: List[List]) -> Generator[Any, None, None]:
        for statistic_name in self.statistics:
            yield statistic_name, self._compute_statistic(values, statistic_name)

    def _compute_statistic(self, values: List, statistic_name: str):
        statistic = self.statistics[statistic_name]
        try:
            arr = np.array(values).astype("float")
        except ValueError:
            return None
        return statistic(arr)


def _histogram(values: np.ndarray) -> Tuple[np.ndarray, np.ndarray]:
    histogram_w_arrays = np.histogram(values[~np.isnan(values)], bins="auto")
    return histogram_w_arrays[0], histogram_w_arrays[1]


def _nan_percentage(values: np.ndarray) -> float:
    return sum(np.isnan(values)) / len(values)


def percentile_factory(percentile: int):
    return lambda x: np.nanpercentile(x, percentile)


def _compute_distribution(data: np.ndarray, bins: np.ndarray, epsilon=0.00001) -> np.ndarray:
    # adding epsilon enables us to handle null probabilities
    return np.histogram(data[~np.isnan(data)], bins=bins)[0] + epsilon


def _compute_bins(data: np.ndarray) -> np.ndarray:
    return np.histogram(data[~np.isnan(data)], bins="auto")[1]


def compute_kl_divergence(data: np.ndarray):
    """
    :param data: an array containing the training data as first element and production data as second element
    """
    training_data = data[0]
    prod_data = data[1]
    bins = _compute_bins(np.concatenate([training_data, prod_data]))
    p = _compute_distribution(training_data, bins)
    q = _compute_distribution(prod_data, bins)
    return entropy(p, q)


# Regular Statistic Library

statistic_functions = {
    "mean": np.nanmean,
    "std": np.nanstd,
    "hist": _histogram,
    "nanPercentage": _nan_percentage,
    "percentile95": percentile_factory(95),
    "percentile05": percentile_factory(5)
}
statistic_library = StatisticLibrary()
for name, func in statistic_functions.items():
    statistic_library.add_statistic(func, name)

# Statistic Library using predict and train
crossed_statistic_library = StatisticLibrary()
crossed_statistic_library.add_statistic(compute_kl_divergence, "KLDivergence")
