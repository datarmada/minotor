from minotoring.constants import PACKAGE_PATH

import tornado.ioloop
import tornado.web
import tornado.websocket

# Defining constants
STATIC_PATH = PACKAGE_PATH / 'front/build'


class EchoWebSocket(tornado.websocket.WebSocketHandler):
    def open(self):
        print("WebSocket opened")

    def on_message(self, message):
        self.write_message(u"You said: " + message)

    def on_close(self):
        print("WebSocket closed")

    # TODO: For now all CORS are accepted, we'll of course have to change
    # that
    def check_origin(self, origin):
        return True


def make_app():
    return tornado.web.Application([
        (r"/ws", EchoWebSocket),
        (r"/(.*)", tornado.web.StaticFileHandler,
         {'path': STATIC_PATH, 'default_filename': 'index.html'}),
    ], debug=True)


def runserver():
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()


if __name__ == "__main__":
    runserver()
