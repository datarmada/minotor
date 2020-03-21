import unittest

import numpy as np

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