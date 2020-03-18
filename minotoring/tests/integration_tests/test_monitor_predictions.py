import unittest

import numpy as np

from minotoring.decorators.prediction_monitoring import monitor_predictions


class TestMonitorPredictions(unittest.TestCase):
    def test_monitor_predictions(self):
        @monitor_predictions
        def new_sum(data: np.ndarray):
            return np.nansum(data, axis=1)

        arr = np.array([[1.0, 1.1], [1.2, np.nan]])
        self.assertListEqual(new_sum(arr).tolist(),[2.1, 1.2]) 
