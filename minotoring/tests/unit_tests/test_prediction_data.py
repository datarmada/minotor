import unittest

import numpy as np

from minotoring.data_managers.data_types import DataType
from minotoring.data_managers.prediction_data import PredictionData


class TestPredictionData(unittest.TestCase):
    def test_empty_project(self):
        project_data = PredictionData()
        self.assertDictEqual(project_data.data, {
            "predictions": {
                "values": []
            }
        })

    def test_add_feature_values_predict(self):
        project_data = PredictionData()
        project_data._add_prediction_values([1, 2])
        self.assertDictEqual(project_data.data,
                             {
                                 "predictions": {
                                     "values": [1, 2]
                                 }
                             })

    def test_compute_statistic_1_dimension(self):
        project_data = PredictionData()
        project_data._add_prediction_values([1, 2])
        statistic_library = {
            DataType.FLOAT: {
                "identity": lambda x: x,
                "mean": lambda x: np.mean(x, axis=0).tolist()
            }
        }
        project_data._compute_predictions_statistics(statistic_library)
        self.assertListEqual(project_data.data["predictions"]["identity"], [1, 2])
        self.assertEqual(project_data.data["predictions"]["mean"], 1.5)

    def test_compute_statistic_2_dimensions(self):
        project_data = PredictionData()
        project_data._add_prediction_values([[3, 4], [1, 2]])
        statistic_library = {
            DataType.FLOAT: {
                "identity": lambda x: x,
                "mean": lambda x: np.mean(x, axis=0).tolist()
            }
        }
        project_data._compute_predictions_statistics(statistic_library)
        self.assertListEqual(project_data.data["predictions"]["identity"], [[3, 4], [1, 2]])
        self.assertListEqual(project_data.data["predictions"]["mean"], [2, 3])
