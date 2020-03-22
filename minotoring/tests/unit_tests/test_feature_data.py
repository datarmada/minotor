import unittest

from minotoring.data_managers.data_containers.feature_phase_container import FeaturePredictionPhaseContainer, \
    FeatureTrainingPhaseContainer
from minotoring.data_managers.data_containers.features_data_container import FeaturesDataContainer
from minotoring.data_managers.data_types import DataType


class TestProjectData(unittest.TestCase):
    def test_empty_project(self):
        project_data = FeaturesDataContainer()
        self.assertDictEqual(project_data.get_dict(), {
            "features": {
            }
        })

    def test_add_feature(self):
        project_data = FeaturesDataContainer()
        project_data._add_feature("feature_test", DataType.INT)
        self.assertDictEqual(project_data.get_dict(), {
            "features": {
                "feature_test": {
                    "type": "int",
                    "train": {"values": []},
                    "predict": {"values": []}
                }
            }
        })

    def test_add_feature_values_predict(self):
        project_data = FeaturePredictionPhaseContainer()

        project_data.add_values([1, 2])
        self.assertListEqual(project_data.values, [1, 2])
        project_data.add_values([1, 2])
        self.assertListEqual(project_data.values, [1, 2, 1, 2])

    def test_add_feature_values_train(self):
        project_data = FeatureTrainingPhaseContainer()

        project_data.add_values([1, 2])
        self.assertListEqual(project_data.values, [1, 2])
        project_data.add_values([1, 2])
        self.assertListEqual(project_data.values, [1, 2])
