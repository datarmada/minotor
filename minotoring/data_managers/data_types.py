from enum import Enum


class DataType(Enum):
    INT = "int"
    FLOAT = "float"
    CATEGORY = "category"
    STRING = "string"
    OTHER = "other"

    @staticmethod
    def type2value(dtype) -> 'DataType':
        return val if val in (elt.value for elt in DataType) else DataType.OTHER

    