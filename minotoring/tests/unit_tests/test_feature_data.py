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
            },
            "valuesInfos": {
                "training": {
                    "dates": [],
                    "ids": []
                },
                "prediction": {
                    "dates": [],
                    "ids": []
                },
                "id2phase": {}
            }
        })

    def test_add_feature(self):
        project_data = FeaturesDataContainer()
        project_data._add_feature("feature_test", DataType.INT)
        self.assertDictEqual(project_data.get_dict()["features"], {
            "feature_test": {
                "type": "int",
                "training": {"values": {}},
                "prediction": {"values": {}}
            }
        })

    def test_add_feature_values_predict(self):
        project_data = FeaturePredictionPhaseContainer()

        project_data.add_values({1: 1, 2: 2})
        self.assertDictEqual(project_data.values, {1: 1, 2: 2})
        project_data.add_values({3: 1, 4: 2})
        self.assertDictEqual(project_data.values, {1: 1, 2: 2, 3: 1, 4: 2})

    def test_add_feature_values_train(self):
        project_data = FeatureTrainingPhaseContainer()

        project_data.add_values({1: 1, 2: 2})
        self.assertDictEqual(project_data.values, {1: 1, 2: 2})
        project_data.add_values({1: 1, 2: 2})
        self.assertDictEqual(project_data.values, {1: 1, 2: 2})
