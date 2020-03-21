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

    def compute_all_statistics(self, values: List) -> Generator[Any, None, None]:
        for statistic_name in self.statistics:
            yield statistic_name, self._compute_statistic(values, statistic_name)

    def _compute_statistic(self, values: List, statistic_name: str):
        statistic = self.statistics[statistic_name]
        try:
            arr = np.array(values).astype("float")
        except ValueError:
            return None
        return statistic(arr)


def _histogram(values: np.ndarray) -> Tuple[List, List]:
    histogram_w_arrays = np.histogram(values[~np.isnan(values)], bins="auto")
    return histogram_w_arrays[0].tolist(), histogram_w_arrays[1].tolist()


def _nan_percentage(values: np.ndarray) -> float:
    return sum(np.isnan(values)) / len(values)


def percentile_factory(percentile: int):
    return lambda x: np.nanpercentile(x, percentile)


def _compute_distribution(data: np.ndarray, lower_bound: float, upper_bound: float) -> np.ndarray:
    return np.histogram(data[~np.isnan(data)], bins="auto", range=(lower_bound, upper_bound))[0]


def compute_kl_divergence(data: np.ndarray):
    training_data = data[0]
    prod_data = data[1]
    min_range = min(np.concatenate([training_data, prod_data]))
    max_range = max(np.concatenate([training_data, prod_data]))
    q = _compute_distribution(training_data, min_range, max_range)
    p = _compute_distribution(prod_data, min_range, max_range)
    return entropy(p, q)


# Regular Statistic Library
statistic_library = StatisticLibrary()
statistic_library.add_statistic(np.nanmean, "mean")
statistic_library.add_statistic(np.nanstd, "std")
statistic_library.add_statistic(_histogram, "hist")
statistic_library.add_statistic(_nan_percentage, "nan_percentage")
statistic_library.add_statistic(percentile_factory(95), "95_percentile")
statistic_library.add_statistic(percentile_factory(5), "05_percentile")

# Statistic Library using predict and train
crossed_statistic_library = StatisticLibrary()
crossed_statistic_library.add_statistic(compute_kl_divergence, "kl_divergence")
