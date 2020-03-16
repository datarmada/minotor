from enum import Enum


class DataType(Enum):
    INT = "int"
    FLOAT = "float"
    CATEGORY = "category"
    STRING = "string"
    OTHER = "other"

    @staticmethod
    def type2value(dtype) -> 'DataType':
        for element in DataType:
            if dtype == element.value:
                return element
