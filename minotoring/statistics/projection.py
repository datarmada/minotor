from typing import List, Union

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

    def project(self, values: List) -> List:
        arr = self.preprocess(values)
        if arr.shape[0] < 2:
            return []
        projection = self.projector.fit_transform(arr)
        return projection.tolist()


tsne_projector = Projector(TSNE())
