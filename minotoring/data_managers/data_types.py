from enum import Enum


class DataType(Enum):
    INT = "int"
    FLOAT = "float"
    CATEGORY = "category"
    BOOL = "bool"
    OTHER = "other"

    @staticmethod
    def type2value(dtype) -> 'DataType':
        for element in DataType:
            try:
                if dtype == element.value:
                    return element
            except TypeError:
                continue
        return DataType.OTHER
