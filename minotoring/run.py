import os

from flask import Flask, send_from_directory

app = Flask(__name__, static_folder="./front/build")

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

def runserver():
    app.run("0.0.0.0", debug=True)

if __name__ == "__main__":
    runserver()