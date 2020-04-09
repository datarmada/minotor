from typing import List, Union, Tuple

import numpy as np
import pandas as pd

from pandas.core.indexes.base import Index
from sklearn.base import TransformerMixin, BaseEstimator
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE


class Projector:
    def __init__(self, projector: Union[TransformerMixin, BaseEstimator]):
        self.projector = projector

    @staticmethod
    def preprocess(df: pd.DataFrame) -> pd.DataFrame:
        return df.select_dtypes('number').dropna()

    def project(self, training_df: pd.DataFrame, prediction_df: pd.DataFrame) -> Tuple[Index, Index, np.ndarray, np.ndarray]:
        """
        :return: kept_training_ids, kept_prediction_ids, projected training vectors, projected prediction vectores
        """
        training_df = self.preprocess(training_df)
        prediction_df = self.preprocess(prediction_df)
        full_df = pd.concat([training_df, prediction_df])
        if len(full_df) < 2:
            return [], [], [], []
        projection = self.projector.fit_transform(full_df.to_numpy())
        return training_df.index, prediction_df.index, \
            projection[: len(training_df)], projection[len(training_df):]


tsne_projector = Projector(TSNE())
pca_projector = Projector(PCA(n_components=2))
