import numpy as np


def build(params):
    layers = params["layers"]

    weights_dimentions = [(layers[i]["dim"][0], layers[i+1]["dim"][0])
                          for i in range(0, len(layers) - 1)]

    W = np.array([[[np.random.rand()] * dim[0]] * dim[1]
                  for dim in weights_dimentions])

    b = np.array([0.0] * params["bias"])

    print(weights_dimentions)

    print(W)
