from flask import Flask, redirect, url_for, request
import processing

app = Flask(__name__)


@app.route('/model', methods=["POST", "GET"])
def model():
    if request.method == 'POST':
        result = processing.receive_data(request.data)

        summary_object = {
            "acc": str(result.history["accuracy"]),
            "loss": str(result.history["loss"])
        }

        return str(summary_object)
    else:
        return True


if __name__ == "__main__":
    app.run()
