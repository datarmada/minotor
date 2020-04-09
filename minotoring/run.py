from tornado import ioloop, web

from minotoring.api.projection_handler import ProjectionHandler
from minotoring.api.data_handler import DataHandler
from minotoring.api.training_data_handler import TrainingDataHandler

from minotoring.constants import PACKAGE_PATH

# Defining constants
REACT_BUILD_PATH = PACKAGE_PATH / 'front' / 'build'
STATIC_PATH = REACT_BUILD_PATH / 'static'


class DefaultHandler(web.RequestHandler):
    def get(self):
        self.render(str(REACT_BUILD_PATH / "index.html"))


def make_app():
    return web.Application([
        (r"/data", DataHandler),
        (r"/projection", ProjectionHandler),
        (r"/training-data", TrainingDataHandler),
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
