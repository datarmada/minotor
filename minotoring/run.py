import os

from flask import Flask, send_from_directory, request, Response

app = Flask(__name__, static_folder="./front/build")


# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path: str):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


@app.route('/data', methods=["POST"])
def receive_data():
    data = request.json
    print(data)
    return Response(data)


def runserver():
    app.run("0.0.0.0", debug=True)


if __name__ == "__main__":
    runserver()
