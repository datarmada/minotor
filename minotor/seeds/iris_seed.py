import numpy as np
import pandas as pd
from random import uniform

from minotor.data_managers.file_manager import FileManager
from minotor.decorators.feature_monitoring import monitor_training_features, monitor_prediction_features

fm = FileManager()


@monitor_training_features
def train(data):
    return data


@monitor_prediction_features
def predict(data):
    return data


def run():
    fm.clean_feature_data()

    # Data
    df = pd.read_csv(
        'https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv')

    train(df)

    # Randomly tweak numerical data
    df_numerical = df.select_dtypes(include=[np.number])
    df[df_numerical.columns] = df_numerical.apply(
        lambda x: x*uniform(0.8, 1))

    predict(df)


if __name__ == '__main__':
    run()
