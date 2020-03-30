# import numpy as np
# import model_functions

# default_bias = 0.0
# default_weight = np.random.randn() * 1e-3
# model = None


# class network():
#     def __init__(self, params):
#         self.params = params
#         print('\n\n## INITIALIZE NETWORK ##')
#         print('WEIGHTS:')
#         print(self.params['weights'])
#         print('\n\n\n')

#     def __repr__(self):
#         layers = self.params["layers"]

#         def activation(layer):
#             return f"activation: {layer['activation']}" if layer['activation'] != None else ''

#         return '\n'.join([f"{layer['type']} layer ({layer['dim'][0]}) {activation(layer)}" for layer in layers])

#     def fit(self, X_train, y_train, lr, epochs):

#         for i in range(0, epochs):

#             y_pred, caches = model_functions.forward_propagation(
#                 X_train, self.params)

#             cost = model_functions.compute_cost(
#                 y_pred, y_train, cost_function='cross-entropy-loss')

#             grads = model_functions.backward_propagation(
#                 y_train, y_pred, caches)

#             parameters = model_functions.update_parameters(
#                 self.params, grads, lr, i)
#             self.params['weights'] = parameters["weights"]
#             self.params['bias'] = parameters["bias"]
#             # if i % 100 == 0:
#             #     print(self.params['weights'])
#             #     print(self.params['bias'])
#             model_functions.print_epoch_infos(i, cost)
#         return cost, parameters
# #


# #
# def build(params):
#     layers = params["layers"]
#     model_parameters = {"layers": layers, "weights": {},
#                         "bias": {}, "activations": {}}

#     weight_dimensions = [(layers[i+1]["dim"][0], layers[i]["dim"][0])
#                          for i in range(0, len(layers) - 1)]
#     # put in a helper file:

#     for (i, w) in enumerate(weight_dimensions):

#         model_parameters['weights'][f'W_{i}'] = np.random.randn(
#             w[0], w[1]) * 0.01

#         model_parameters['bias'][f'b_{i}'] = np.array(
#             [default_bias] * w[0]).reshape(w[0], 1)
#         model_parameters['activations'][f'activation_{i}'] = layers[i + 1]["activation"]

#     model = network(model_parameters)
#     return model
