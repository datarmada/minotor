import unittest

import numpy as np

from minotoring.data_managers.data_containers.feature_phase_container import FeatureTrainingPhaseContainer
from minotoring.data_managers.data_containers.single_feature_data_container import SingleFeatureDataContainer
from minotoring.data_managers.data_types import DataType
from minotoring.statistics.statistic_library import StatisticLibrary, crossed_statistic_library


class TestStatistics(unittest.TestCase):
    def test_compute_statistic(self):
        project_data = FeatureTrainingPhaseContainer()
        project_data.add_values([1, 2])
        statistic_library = StatisticLibrary()
        statistic_library.add_statistic(lambda x: x.tolist(), "identity")
        statistic_library.add_statistic(lambda x: sum(x), "sum")
        project_data.compute_statistics(statistic_library)
        self.assertListEqual(project_data.statistics["identity"], [1, 2])
        self.assertEqual(project_data.statistics["sum"], 3)

    def test_compute_statistic_with_None(self):
        project_data = FeatureTrainingPhaseContainer()
        project_data.add_values([1, None])
        statistic_library = StatisticLibrary()
        statistic_library.add_statistic(np.nanmean, "mean")
        project_data.compute_statistics(statistic_library)
        self.assertEqual(project_data.statistics["mean"], 1)

    def test_compute_statistic_with_str(self):
        project_data = FeatureTrainingPhaseContainer()
        project_data.add_values(["test"])
        statistic_library = StatisticLibrary()
        statistic_library.add_statistic(np.nanmean, "mean")

        project_data.compute_statistics(statistic_library)
        self.assertEqual(project_data.statistics["mean"], None)

    def test_compute_crossed_statistic(self):
        project_data = SingleFeatureDataContainer(data_type=DataType.INT)
        project_data.training_phase.add_values([1, 2])
        project_data.prediction_phase.add_values([1, 2])
        project_data.compute_crossed_statistics(crossed_statistic_library)
        self.assertEqual(project_data.prediction_phase.statistics["kl_divergence"], 0)
