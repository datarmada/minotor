import json

from tornado.escape import json_decode

from minotor.api.base_route import BaseRouteHandler
from minotor.encoders.json_encoder import ExtendedJSONEncoder
from minotor.data_managers.file_manager import FileManager
from minotor.statistics.projection import tsne_projector


class ProjectionHandler(BaseRouteHandler):
    def post(self):
        if self.request.headers['Content-Type'] == 'application/json':
            feature_names = json_decode(self.request.body)
            fm = FileManager()
            cached_data = fm.get_features_data()
            training_df, prediction_df = cached_data.get_dataframes(
                feature_names)
            training_ids, prediction_ids, training_projection, prediction_projection = tsne_projector.project(
                training_df, prediction_df)
            self.set_header('Content-Type', 'application/json')
            self.write(json.dumps(
                {
                    "training": {"values": training_projection, "ids": training_ids},
                    "prediction": {"values": prediction_projection, "ids": prediction_ids}
                }, cls=ExtendedJSONEncoder))
            self.set_status(200)
        else:
            self.set_status(
                400, 'Request should have Content-Type set to application/json')
