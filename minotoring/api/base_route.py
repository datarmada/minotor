from tornado import web

class BaseRouteHandler(web.RequestHandler):
  def options(self):
    # no body
    self.set_status(204)
    self.finish()

  def set_default_headers(self):
    self.set_header("Access-Control-Allow-Origin", "*")
    self.set_header("Access-Control-Allow-Headers", "*")
    self.set_header('Access-Control-Allow-Methods', " *")
