import webbrowser

from tornado import ioloop, web

from minotor.api.projection_handler import ProjectionHandler
from minotor.api.data_handler import DataHandler
from minotor.api.training_data_handler import TrainingDataHandler

from minotor.constants import PACKAGE_PATH

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
    url = 'http://localhost:8888'
    print('Starting server ...')
    app = make_app()
    app.listen(8888)
    print(f'Minotor is available at {url} in your browser !')
    webbrowser.open_new_tab(url)
    ioloop.IOLoop.current().start()


if __name__ == "__main__":
    runserver()
