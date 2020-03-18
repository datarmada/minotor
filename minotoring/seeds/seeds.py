import numpy as np
import pandas as pd
from random import uniform

from minotoring.decorators.feature_monitoring import monitor_training_features, monitor_prediction_features


@monitor_training_features
def train(data):
    return data


@monitor_prediction_features
def predict(data):
    return data


# Data
iris = pd.read_csv('https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv')
iris = iris.select_dtypes(include=[np.number])

train(iris)

# Randomly tweak numerical data
iris = iris.apply(lambda x: x*uniform(0, 2))

predict(iris)
