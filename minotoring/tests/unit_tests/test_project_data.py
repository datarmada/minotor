import unittest

from minotoring.data_managers.data_structure import ProjectData


class TestProjectData(unittest.TestCase):
    def test_empty_project(self):
        project_data = ProjectData()
        self.assertDictEqual(project_data.data, {
            "features": {
            }
        })

    def test_add_feature(self):
        project_data = ProjectData()
        project_data._add_feature("feature_test", "int")
        self.assertDictEqual(project_data.data, {
            "features": {
                "feature_test": {
                    "type": "int",
                    "train": {},
                    "predict": {}
                }
            }
        })

    def test_add_feature_values_train(self):
        project_data = ProjectData()
        project_data._add_feature("feature_test", "int")
        project_data._add_feature_values("feature_test", [1, 2], training=True)
        self.assertDictEqual(project_data.data, {
            "features": {
                "feature_test": {
                    "type": "int",
                    "train": {"values": [1, 2]},
                    "predict": {}
                }
            }
        })

    def test_add_feature_values_predict(self):
        project_data = ProjectData()
        project_data._add_feature("feature_test", "int")
        project_data._add_feature_values("feature_test", [1, 2], training=False)
        self.assertDictEqual(project_data.data, {
            "features": {
                "feature_test": {
                    "type": "int",
                    "train": {},
                    "predict": {"values": [1, 2]}
                }
            }
        })

    def test_compute_statistic(self):
        project_data = ProjectData()
        project_data._add_feature("feature_test", "int")
        project_data._add_feature_values("feature_test", [1, 2], training=False)
        statistic_library = {
            "int": {
                "identity": lambda x: x,
                "sum": lambda x: sum(x)
            }
        }
        project_data._compute_feature_statistics("feature_test", statistic_library, training=False)
        self.assertListEqual(project_data.data["features"]["feature_test"]["predict"]["identity"], [1, 2])
        self.assertEqual(project_data.data["features"]["feature_test"]["predict"]["sum"], 3)
