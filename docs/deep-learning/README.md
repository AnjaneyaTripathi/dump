# Deep Learning

## Introduction

### What is deep learning?

- ANN with multiple layers
- Unlike ML where features need to be identified or engineered, DL learns the features throught its multiple layers.
- Typically used with unstructured data (extracting features are tougher).
- Required large set of data points.

### Neurons

- Similar to biological neurons.
- Each input x<sub>i</sub> is multiplied with weight w<sub>i</sub> since importance of inputs are not the same.
- z = x<sub>1</sub>w<sub>1</sub> + x<sub>2</sub>w<sub>2</sub> + x<sub>3</sub>w<sub>3</sub> + b
- It is then passed through an activation function `y = f(z)` which decided if the neuron _fires_ or not.

### Layers

- Input layer (takes in the signals).
- Hidden layers (processes the signals and derives complex relationships).
- Output layer (single for binary classification, multiple for multi-class classification emitting the probability, for regression the value is returned).
- Neurons in layer `i` interact with all other neurons in `i-1` and `i+1`.

### Activation Functions

Introduces non-linearity (real world data is rarely linearly separable, thus straight line relationship cannot be assumed).

- Sigmoid Function: 
    - scales between 0 and 1, monotonic, differentiable
    - f(x) = $\frac {1}{1 +e^{-x}}$
- tanh Function:
    - scales between -1 and 1, monotonic, differentiable
    - f(x) = $\frac {1 - e^{-2x}}{1 + e^{-2x}}$
- Rectified Linear Unit Function
    - f(x) = $max(0, x)$
    - suffers from dying ReLU (outputs 0 always if input is negative)
- Leaky ReLU Function:
    - f(x) = $x$, $x$ >= 0
    - f(x) = $\alpha{x}$, $x$ < 0
    - $\alpha$ can be parametrized, random or usually set to 0.01
- Exponential Linear Function
- Swish Function
- Softmax Function (usually used for output layer of multi-class classification)

### Forward Propagation

- 



