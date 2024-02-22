# GRADED FUNCTION: initialize_parameters_deep
import numpy as np
from activation_functions import sigmoid
from activation_functions import relu

def initialize_parameters_deep(layer_dims):
    parameters = {}
    L = len(layer_dims) 
    for l in range(1, L):
       
        parameters['W' + str(l)] = np.random.randn(layer_dims[l], layer_dims[l-1] ) * 0.01
        parameters['b' + str(l)] = np.zeros((layer_dims[l], 1))
    return parameters



def linear_forward(A, W, b):
    Z = np.dot(W, A) + b
    cache = (A, W, b)
    return Z, cache

def linear_activation_forward(A_prev, W, b, activation):
    if activation == "sigmoid":
        Z, linear_cache = linear_forward(A_prev, W, b)
        A, activation_cache = sigmoid(Z)
    elif activation == "relu":
        Z, linear_cache = linear_forward(A_prev,W,b)
        A, activation_cache = relu(Z)
    cache = (linear_cache, activation_cache)
    return A, cache

def L_model_forward(X, parameters):
    caches = []
    A = X
    L = len(parameters) // 2                  # number of layers in the neural network
    
    for l in range(1, L):
        A_prev = A 
        A, cache = linear_activation_forward(A_prev, parameters["W" + str(l)], parameters["b" + str(l)], "relu")
        caches.append(cache)
    AL, cache = linear_activation_forward(A, parameters["W" + str(L)], parameters["b" + str(L)], "sigmoid")
    caches.append(cache)      
    return AL, caches

