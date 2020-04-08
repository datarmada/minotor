from minotoring.api.base_route import BaseRouteHandler

class TrainingDataHandler(BaseRouteHandler):
  def post(self):
    if self.request.headers['Content-Type'] == 'multipart/form-data':
        print(self.request)