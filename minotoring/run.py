import json

from tornado import ioloop, web, websocket
from tornado.escape import json_decode

from minotoring.constants import PACKAGE_PATH
from minotoring.data_managers.file_manager import FileManager

# Defining constants
REACT_BUILD_PATH = PACKAGE_PATH / 'front/build'
STATIC_PATH = REACT_BUILD_PATH / 'static'


class DashboardHandler(websocket.WebSocketHandler):
    websockets = set()

    def open(self):
        # Registering WebSocket
        DashboardHandler.websockets.add(self)

        # Sending cached data to front
        fm = FileManager()
        cached_data = {**fm.get_features_data().data, **fm.get_prediction_data().data}
        DashboardHandler.send_data(json.dumps(cached_data))

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


class DefaultHandler(web.RequestHandler):
    def get(self):
        self.render(str(REACT_BUILD_PATH / "index.html"))


def make_app():
    return web.Application([
        (r"/ws", DashboardHandler),
        (r"/data", DataProxy),
        (r"/static/(.*)", web.StaticFileHandler,
         {'path': STATIC_PATH, 'default_filename': 'index.html'}),
        (r"/*.*", DefaultHandler),
    ], debug=True)


def runserver():
    app = make_app()
    app.listen(8888)
    ioloop.IOLoop.current().start()


if __name__ == "__main__":
    runserver()
