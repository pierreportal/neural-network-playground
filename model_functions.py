# import numpy as np
# from math import log, exp


# def relu(z):
#     print('\n### Relu Z')
#     print(z[0][:10])
#     return z * (z > 0)


# def relu_prime(z, cache): return 1 * (z > 0)


# def tanh(z): return np.sinh(z) / np.cosh(z)


# def tanh_prime(z, cache): return 1 - tanh(z)


# def sigmoid(z): return 1/(1 + np.exp(-z))


# def sigmoid_prime(z, cache): return sigmoid(z) * (1-sigmoid(z))


# def softmax(z): return z


# def softmax_prime(z, cache): return softmax(z, c) * (1-softmax(z, c))


# def layer_activation(activation, z):
#     if activation == 'relu':
#         return relu(z)
#     elif activation == 'tanh':
#         return tanh(z)
#     elif activation == 'sigmoid':
#         return sigmoid(z)
#     elif activation == 'softmax':
#         return softmax(z)


# def forward_propagation(X_train, params):
#     weights, bias, activations = params["weights"], params["bias"], params["activations"]
#     caches = {}
#     a = X_train.T
#     for i in range(len(weights)):

#         a_next, caches[f"cache{i}"] = linear_activation_forward(
#             a, weights[f"W_{i}"], bias[f"b_{i}"], activations[f"activation_{i}"])

#         caches[f"activation{i}"] = activations[f"activation_{i}"]

#         a = a_next

#     y_pred = a

#     return y_pred, caches  # caches["cache0"] = (A_prev, W, b), Z


# def linear_activation_forward(A_prev, W, b, activation):

#     Z, linear_cache = np.dot(W, A_prev) + b, (A_prev, W, b)
#     print('\n\n#### W')
#     print(W)
#     A, activation_cache = layer_activation(activation, Z), Z
#     print('\n\n##### A', activation)
#     print(A[0][:10])
#     cache = (linear_cache, activation_cache)  # (A_prev, W, b), Z
#     return A, cache
# ###############################################


# # COST ########################################
# def compute_cost(y_pred, y_train, cost_function):
#     if cost_function == 'cross-entropy-loss':
#         return binary_cross_entropy(y_pred, y_train)
# ###############################################


# def binary_cross_entropy(y_pred, y_train):
#     m = y_train.shape[1]
#     sum_ = np.sum((np.log(y_pred) * y_train) +
#                   (1 - np.log(y_pred) * 1-y_train))
#     mean_sum_score = 1.0 / m * sum_
#     return -mean_sum_score
# # BACKWARD ####################################


# def backward_propagation(y_train, y_pred, caches):
#     grads = {}
#     grads[f"dA{len(caches) // 2}"] = -(np.divide(y_train, y_pred) -
#                                        np.divide(1-y_train, 1-y_pred))
#     for i in reversed(range(1, len(caches) // 2 + 1)):
#         # caches["cache0"] = (A_prev, W, b), Z
#         da, dw, db = linear_activation_backward(
#             grads[f"dA{i}"], caches[f"cache{i-1}"], caches[f"activation{i-1}"])
#         grads[f"dA{i-1}"] = da
#         grads[f"dW{i-1}"] = dw
#         grads[f"db{i-1}"] = db
#     return grads


# def linear_activation_backward(dA, cache, activation):
#     linear_cache, activation_cache = cache  # (A_prev, W, b), Z
#     if activation == 'sigmoid':
#         # print('########################### SIGMOID')
#         # print('### dA')
#         # print(dA)
#         # print('### linear cache')
#         # print(linear_cache)
#         # print('#####################')
#         dZ = sigmoid_prime(dA, activation_cache)

#         dA_prev, dW, db = linear_backward(dZ, linear_cache)
#     if activation == 'relu':
#         dZ = relu_prime(dA, activation_cache)
#         dA_prev, dW, db = linear_backward(dZ, linear_cache)
#     cache = (linear_cache, activation_cache)
#     return dA_prev, dW, db


# def linear_backward(dZ, cache):
#     A_prev, W, b = cache
#     m = A_prev.shape[1]
#     dW = np.dot(dZ, A_prev.T) / m
#     db = np.sum(dZ, axis=1, keepdims=True) / m
#     dA_prev = np.dot(W.T, dZ)
#     print('\n##### dW:')
#     print(dW)
#     return dA_prev, dW, db

# # UPDATE ###########################################


# def update_parameters(parameters, grads, learning_rate, epoch):
#     L = 2
#     weights = parameters["weights"]
#     bias = parameters["bias"]
#     updated_params = {}
#     for l in range(L):
#         weights['W_'+str(l)] = weights['W_'+str(l)] - \
#             learning_rate * grads['dW'+str(l)]
#         bias['b_'+str(l)] = bias['b_'+str(l)] - \
#             learning_rate * grads['db'+str(l)]

#     updated_params["weights"] = weights
#     updated_params["bias"] = bias
#     # if epoch % 100 == 0:
#     # print('##### W #####')
#     # print(weights)
#     # print('##### end W #####')
#     # print(grads['dW0'])
#     # print(grads['dW1'])
#     print('\n\n##### GRADS')
#     print(grads['dW1'])
#     print(grads['dW0'])
#     return updated_params


# def print_epoch_infos(epoch, loss):
#     pass
#     # print(f"epoch {epoch} >>> loss: {loss}")
