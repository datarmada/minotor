import unittest

import numpy as np

from minotoring.data_managers.data_types import DataType
from minotoring.data_managers.feature_data import FeatureData
from minotoring.data_managers.prediction_data import PredictionData
from minotoring.data_managers.statistics import StatisticLibrary


class TestStatistics(unittest.TestCase):
    def test_compute_statistic_prediction(self):
        project_data = FeatureData()
        project_data._add_feature("feature_test", DataType.INT)
        project_data._add_feature_inference_values("feature_test", [1, 2])
        statistic_library = StatisticLibrary()
        statistic_library.add_statistic(lambda x: x.tolist(), "identity")
        statistic_library.add_statistic(lambda x: sum(x), "sum")
        project_data._compute_feature_statistics("feature_test", statistic_library)
        self.assertListEqual(project_data.data["features"]["feature_test"]["predict"]["identity"], [1, 2])
        self.assertEqual(project_data.data["features"]["feature_test"]["predict"]["sum"], 3)

    def test_compute_statistic_training(self):
        project_data = FeatureData()
        project_data._add_feature("feature_test", DataType.INT)
        statistic_library = StatisticLibrary()
        statistic_library.add_statistic(lambda x: x.tolist(), "identity")
        statistic_library.add_statistic(lambda x: sum(x), "sum")
        project_data._compute_feature_statistics("feature_test", statistic_library, [1, 2])
        self.assertListEqual(project_data.data["features"]["feature_test"]["train"]["identity"], [1, 2])
        self.assertEqual(project_data.data["features"]["feature_test"]["train"]["sum"], 3)

    def test_compute_statistic_with_None(self):
        project_data = FeatureData()
        project_data._add_feature("feature_test", DataType.INT)
        statistic_library = StatisticLibrary()
        statistic_library.add_statistic(np.nanmean, "mean")
        project_data._compute_feature_statistics("feature_test", statistic_library, [1, None])
        self.assertEqual(project_data.data["features"]["feature_test"]["train"]["mean"], 1)

    def test_compute_statistic_with_str(self):
        project_data = FeatureData()
        project_data._add_feature("feature_test", DataType.INT)
        statistic_library = StatisticLibrary()
        statistic_library.add_statistic(np.nanmean, "mean")

        project_data._compute_feature_statistics("feature_test", statistic_library, ["test"])
        self.assertEqual(project_data.data["features"]["feature_test"]["train"]["mean"], None)

    def test_compute_statistic_1_dimension(self):
        project_data = PredictionData()
        project_data._add_prediction_values([1, 2], [0, 0])
        statistic_library = StatisticLibrary()
        statistic_library.add_statistic(lambda x: x.tolist(), "identity")
        statistic_library.add_statistic(lambda x: np.mean(x, axis=0).tolist(), "mean")
        project_data._compute_predictions_statistics(statistic_library)
        self.assertListEqual(project_data.data["predictions"]["identity"], [1, 2])
        self.assertEqual(project_data.data["predictions"]["mean"], 1.5)

    def test_compute_statistic_2_dimensions(self):
        project_data = PredictionData()
        project_data._add_prediction_values([[3, 4], [1, 2]], [0, 0])
        statistic_library = StatisticLibrary()
        statistic_library.add_statistic(lambda x: x.tolist(), "identity")
        statistic_library.add_statistic(lambda x: np.mean(x, axis=0).tolist(), "mean")
        project_data._compute_predictions_statistics(statistic_library)
        self.assertListEqual(project_data.data["predictions"]["identity"], [[3, 4], [1, 2]])
        self.assertListEqual(project_data.data["predictions"]["mean"], [2, 3])
