from tornado import web
from tornado.escape import json_decode

from minotoring.api.websocket_handler import DashboardHandler
from minotoring.api.base_route import BaseRouteHandler

class DataProxy(BaseRouteHandler):
    def post(self):
        # request contains a json
        if self.request.headers['Content-Type'] == 'application/json':
            data = json_decode(self.request.body)
            DashboardHandler.send_data(data)
            self.set_status(200)
        # request not formatted correctly : bad request returned
        else:
            self.set_status(400, 'Request should have Content-Type set to application/json')