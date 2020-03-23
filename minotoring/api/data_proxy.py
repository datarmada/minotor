from tornado import web
from tornado.escape import json_decode

from minotoring.api.websocket_handler import DashboardHandler


class DataProxy(web.RequestHandler):

    def post(self):
        # request contains a json
        if self.request.headers['Content-Type'] == 'application/json':
            data = json_decode(self.request.body)
            DashboardHandler.send_data(data)
            self.set_status(200)
        # request not formatted correctly : bad request returned
        else:
            self.set_status(400, 'Request should have Content-Type set to application/json')

    # TODO: For now all origins are accepted, we'll of course have to change
    # that
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "*")
        self.set_header('Access-Control-Allow-Methods', ' *')

    def options(self):
        # no body
        self.set_status(204)
        self.finish()
