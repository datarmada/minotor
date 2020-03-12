from uuid import uuid4

from constants import PACKAGE_PATH

from tornado import ioloop, web, websocket
from tornado.escape import json_decode

# Defining constants
STATIC_PATH = PACKAGE_PATH / 'front/build'


class DashboardHandler(websocket.WebSocketHandler):
    websockets = set()

    def open(self):
        DashboardHandler.websockets.add(self)

    def on_message(self, data):
        pass

    def on_close(self):
        DashboardHandler.websockets.remove(self)

    @classmethod
    def send_data(cls, data):
        for ws in DashboardHandler.websockets:
            ws.write_message(data)

    # TODO: For now all origins are accepted, we'll of course have to change
    # that
    def check_origin(self, origin):
        return True


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


def make_app():
    return web.Application([
        (r"/ws", DashboardHandler),
        (r"/data", DataProxy),
        (r"/(.*)", web.StaticFileHandler,
         {'path': STATIC_PATH, 'default_filename': 'index.html'}),
    ], debug=True)


def runserver():
    app = make_app()
    app.listen(8888)
    ioloop.IOLoop.current().start()


if __name__ == "__main__":
    runserver()
