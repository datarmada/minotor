from tornado import web
from tornado.escape import json_decode

from minotoring.data_managers.file_manager import FileManager
from minotoring.statistics.projection import tsne_projector, pca_projector


class ProjectionHandler(web.RequestHandler):
    def post(self):
        if self.request.headers['Content-Type'] == 'application/json':
            feature_names = json_decode(self.request.body)
            fm = FileManager()
            cached_data = fm.get_features_data()
            training_values, prediction_values = cached_data.get_values(feature_names)
            training_projection, prediction_projection = tsne_projector.project(training_values, prediction_values)
            self.set_header('Content-Type', 'application/json')
            self.write({"training": training_projection, "prediction": prediction_projection})
            self.set_status(200)
        else:
            self.set_status(400, 'Request should have Content-Type set to application/json')

    def options(self):
        # no body
        self.set_status(204)
        self.finish()

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "*")
        self.set_header('Access-Control-Allow-Methods', " *")
        self.set_header('Access-Control-Allow-Credentials', "true")
