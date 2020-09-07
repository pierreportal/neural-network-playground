import json
# import data_processing
import numpy as np
import tensorflow as tf
from tensorflow import keras
import random
from sklearn import preprocessing
# from keras.utils import to_categorical


def receive_data(string):
    data = json.loads(string)
    params, dataset = data["networkParams"], data["data"]
    for key in params:
        if key == 'layers':
            print('\nlayers:')
            for layer in params[key]:
                print(layer)
        else:
            print(f'\n{key}: {params[key]}')
    return keras_model(params, dataset)


def preprocess_data(json_data):
    full_data = [{"x1": data[0], "x2":data[1], "y":data[2]}
                 for data in json_data]

    random.shuffle(full_data)

    features = np.array([[data["x1"], data["x2"]] for data in full_data])

    labels = [data["y"]
              for data in full_data]
    normalized_X = preprocessing.minmax_scale(
        features, feature_range=(0, 1), axis=0, copy=True)

    def one_hot_encoding(data):

        dic = {}

        for category in data:
            dic[f'{category}'] = list(dic.keys()).index(
                f'{category}') if category in list(dic.keys()) else len(dic)

        return [dic[x] for x in data]

    one_hot_Y = np.array([y for y in one_hot_encoding(labels)])

    return normalized_X, one_hot_Y


def keras_model(params, dataset):
    layers = params["layers"]
    optimizer = params["optimizer"]
    loss = params["lossFunction"]
    lr = float(params["learningRate"])
    epochs = params["epochs"]
    batch_size = params["batch_size"]

    model = keras.Sequential()

    normalized_X, one_hot_Y = preprocess_data(dataset)
    for layer in layers:
        shape = layer["dim"]
        activation = layer["activation"]
        model.add(keras.layers.Dense(
            shape[0], input_shape=(shape[0],), activation=activation))

    def to_categorical(one_hot):
        print(one_hot)
        return [[int(i == x) for i in range(np.max(one_hot) + 1)] for x in one_hot]

    model_loss_function = None

    if loss == "binary-crossentropy":
        model_loss_function = keras.losses.binary_crossentropy
    if loss == "categorical-crossentropy":
        model_loss_function = keras.losses.categorical_crossentropy
        one_hot_Y = np.array(to_categorical(one_hot_Y))
        print(one_hot_Y)
    model_optimizer = None

    if optimizer == "adam":
        model_optimizer = keras.optimizers.Adam
    if optimizer == "rmsprop":
        model_optimizer = keras.optimizers.RMSprop
    if optimizer == "stochastic-gradient-descent":
        model_optimizer = keras.optimizers.SGD

    model.compile(optimizer=model_optimizer(learning_rate=lr),
                  loss=model_loss_function, metrics=['accuracy'])
    print(model.summary())

    history = model.fit(normalized_X, one_hot_Y, batch_size=batch_size,
                        epochs=epochs, verbose=2)
    return history
