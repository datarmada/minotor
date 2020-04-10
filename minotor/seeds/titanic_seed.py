import numpy as np
import pandas as pd
from random import uniform
from minotor.constants import DATA_DIR
from minotor.decorators.feature_monitoring import monitor_training_features, monitor_prediction_features
import os


@monitor_training_features
def train(data):
    return data


@monitor_prediction_features
def predict(data):
    return data


def run():
    FILE_PATH = DATA_DIR / "feature_data.json"
    if os.path.exists(FILE_PATH):
        os.remove(FILE_PATH)

    # Data
    df = pd.read_csv(
        'https://raw.githubusercontent.com/plotly/datasets/master/titanic.csv')

    train(df)

    # Randomly tweak numerical data
    df_numerical = df.select_dtypes(include=[np.number])
    df[df_numerical.columns] = df_numerical.apply(
        lambda x: x*uniform(0.8, 1))

    predict(df)


if __name__ == '__main__':
    run()
