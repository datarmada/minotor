import unittest

from minotor.data_managers.prediction_data import PredictionData


class TestPredictionData(unittest.TestCase):
    def test_empty_project(self):
        project_data = PredictionData()
        self.assertDictEqual(project_data.data, {
            "predictions": {
                "values": [],
                "timing": []
            }
        })

    def test_add_feature_values_predict(self):
        project_data = PredictionData()
        project_data._add_prediction_values([1, 2], [0, 0])
        self.assertListEqual(project_data.data["predictions"]["values"], [1, 2])
        self.assertListEqual(project_data.data["predictions"]["timing"], [0, 0])
