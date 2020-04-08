import numpy as np
import pandas as pd
from random import uniform
from minotoring.constants import DATA_DIR
from minotoring.decorators.feature_monitoring import monitor_training_features, monitor_prediction_features
import os


@monitor_training_features
def train(data):
    return data


@monitor_prediction_features
def predict(data):
    return data


if __name__ == '__main__':
    FILE_PATH = DATA_DIR / "feature_data.json"
    if os.path.exists(FILE_PATH):
        os.remove(FILE_PATH)

    # Data
    iris = pd.read_csv(
        'https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv')
    iris = iris.select_dtypes(include=[np.number])

    train(iris)

    # Randomly tweak numerical data
    iris['sepal_length'] = iris['sepal_length'].apply(
        lambda x: x*uniform(0.8, 1))

    predict(iris)
