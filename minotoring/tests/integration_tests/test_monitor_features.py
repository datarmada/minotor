import unittest

import numpy as np

from minotoring.decorators.feature_monitoring import monitor_training_features, monitor_prediction_features


class TestMonitorTrainingFeatures(unittest.TestCase):
    def test_monitor_training_features(self):
        @monitor_training_features
        def identity_function(data):
            return data

        arr = np.array([[1.0, 1.1], [1.2, np.nan]])
        try:
            identity_function(arr)
        except Exception:
            self.fail()

    def test_monitor_prediction_features(self):
        @monitor_prediction_features
        def identity_function(data):
            return data
        arr = np.array([[1.0, 1.1], [1.2, np.nan]])
        try:
            identity_function(arr)
        except Exception:
            self.fail()
