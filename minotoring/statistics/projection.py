from sklearn.base import TransformerMixin


class Projector:
    def __init__(self, projector: TransformerMixin):
        self.projector = projector
