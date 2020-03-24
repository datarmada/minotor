from minotoring.data_managers.file_manager import FileManager
from minotoring.api.base_route import BaseRouteHandler

class DataHandler(BaseRouteHandler):
  def get(self):
    fm = FileManager()
    cached_data = fm.get_json()
    self.set_header('Content-Type', 'application/json')
    self.write(cached_data)
    self.set_status(200)