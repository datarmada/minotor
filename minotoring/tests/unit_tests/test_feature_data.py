import unittest

from minotoring.data_managers.data_types import DataType
from minotoring.data_managers.feature_data import FeatureData


class TestProjectData(unittest.TestCase):
    def test_empty_project(self):
        project_data = FeatureData()
        self.assertDictEqual(project_data.data, {
            "features": {
            }
        })

    def test_add_feature(self):
        project_data = FeatureData()
        project_data._add_feature("feature_test", DataType.INT)
        self.assertDictEqual(project_data.data, {
            "features": {
                "feature_test": {
                    "type": "int",
                    "train": {},
                    "predict": {}
                }
            }
        })

    def test_add_feature_values_predict(self):
        project_data = FeatureData()
        project_data._add_feature("feature_test", DataType.INT)
        project_data._add_feature_inference_values("feature_test", [1, 2])
        self.assertDictEqual(project_data.data, {
            "features": {
                "feature_test": {
                    "type": "int",
                    "train": {},
                    "predict": {"values": [1, 2]}
                }
            }
        })
        project_data._add_feature_inference_values("feature_test", [1, 2])
        self.assertDictEqual(project_data.data, {
            "features": {
                "feature_test": {
                    "type": "int",
                    "train": {},
                    "predict": {"values": [1, 2, 1, 2]}
                }
            }
        })

    def test_compute_statistic_prediction(self):
        project_data = FeatureData()
        project_data._add_feature("feature_test", DataType.INT)
        project_data._add_feature_inference_values("feature_test", [1, 2])
        statistic_library = {
            DataType.INT: {
                "identity": lambda x: x,
                "sum": lambda x: sum(x)
            }
        }
        project_data._compute_feature_statistics("feature_test", statistic_library, DataType.INT)
        self.assertListEqual(project_data.data["features"]["feature_test"]["predict"]["identity"], [1, 2])
        self.assertEqual(project_data.data["features"]["feature_test"]["predict"]["sum"], 3)

    def test_compute_statistic_training(self):
        project_data = FeatureData()
        project_data._add_feature("feature_test", DataType.INT)
        project_data._add_feature_inference_values("feature_test", [1, 2])
        statistic_library = {
            DataType.INT: {
                "identity": lambda x: x,
                "sum": lambda x: sum(x)
            }
        }
        project_data._compute_feature_statistics("feature_test", statistic_library, DataType.INT, [1, 2])
        self.assertListEqual(project_data.data["features"]["feature_test"]["train"]["identity"], [1, 2])
        self.assertEqual(project_data.data["features"]["feature_test"]["train"]["sum"], 3)
