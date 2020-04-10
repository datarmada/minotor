from minotor.api.base_route import BaseRouteHandler
from minotor.decorators.feature_monitoring import monitor_training_features
import pandas as pd
import pickle


@monitor_training_features
def save_data(data):
    pass


class TrainingDataHandler(BaseRouteHandler):
    def post(self):
        try:
            data = pickle.loads(self.request.files["training_data"][0]["body"])
        except Exception as e:
            self.set_status(400, "You must send a pickled file")
            return
        try:
            save_data(data)
        except Exception as e:
            self.set_status(400, str(e))
        return
