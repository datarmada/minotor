from typing import List, Union, Tuple

import numpy as np
from sklearn.base import TransformerMixin, BaseEstimator
from sklearn.manifold import TSNE


class Projector:
    def __init__(self, projector: Union[TransformerMixin, BaseEstimator]):
        self.projector = projector

    @staticmethod
    def preprocess(values: List):
        """
        :param values: values per feature
        """
        # TODO : case where one of the feature is not numerical and has to be removed
        try:
            arr = np.array(values).astype("float").transpose()
        except ValueError:
            return []
        arr = arr[~np.isnan(arr).any(axis=1)]
        return arr

    def project(self, training_values: List, prediction_values: List) -> Tuple[List, List]:
        training_arr = self.preprocess(training_values)
        prediction_arr = self.preprocess(prediction_values)
        full_arr = np.concatenate([training_arr, prediction_arr])
        if full_arr.shape[0] < 2:
            return [], []
        projection = self.projector.fit_transform(full_arr)
        assert training_arr.shape[0] + prediction_arr.shape[0] == projection.shape[0]
        return projection.tolist()[: training_arr.shape[0]], projection.tolist()[training_arr.shape[0]:]


tsne_projector = Projector(TSNE())
