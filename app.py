from flask import Flask, redirect, url_for, request
import processing

app = Flask(__name__)


@app.route('/model', methods=["POST", "GET"])
def model():
    if request.method == 'POST':
        processing.receive_data(request.data)
        return 'True'
    else:
        return "Hello!"


if __name__ == "__main__":
    app.run()
