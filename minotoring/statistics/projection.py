from typing import List, Union

import numpy as np
from sklearn.base import TransformerMixin, BaseEstimator
from sklearn.manifold import TSNE


class Projector:
    def __init__(self, projector: Union[TransformerMixin, BaseEstimator]):
        self.projector = projector

    def project(self, data: np.ndarray) -> List:
        if data.shape[0] < 2:
            return []
        print(data)
        data[np.where(np.isnan(data))] = 0
        return self.projector.fit_transform(data).tolist()


tsne_projector = Projector(TSNE())
