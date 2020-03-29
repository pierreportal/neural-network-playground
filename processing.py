import json
import data_processing
import model


def receive_data(string):
    data = json.loads(string)
    params, dataset = data["networkParams"], data["data"]
    data_processing.preprocessing(dataset)
    model.build(params)
    # print(params, dataset)
