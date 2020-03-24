import json

from tornado import websocket

from minotoring.data_managers.file_manager import FileManager


class DashboardHandler(websocket.WebSocketHandler):
    websockets = set()

    def open(self):
        # Registering WebSocket
        DashboardHandler.websockets.add(self)

        # Sending cached data to front
        fm = FileManager()
        cached_data = fm.get_json()
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
