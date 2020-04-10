import os
import sys

from minotor.data_managers.file_manager import FileManager
from minotor.run import runserver
from minotor.seeds.iris_seed import run as run_iris

fm = FileManager()

ARG_COMMAND = {
    'iris-example': run_iris,
    'clean': fm.clean_data,
    'clean-training': fm.clean_feature_data,
    'clean-prediction': fm.clean_prediction_data,
}


def main():
    # if no args, then runserver
    if len(sys.argv) <= 1:
        return runserver()

    # keeping only the first arg
    command_name = sys.argv[1]
    if command_name not in ARG_COMMAND:
        available_command = ' '.join(list(ARG_COMMAND.keys()))
        if len(ARG_COMMAND.keys()) == 1:
            return f"The only available command after minotor is: {available_command}"
        return f"Available commands after minotor are: {available_command}"
    return ARG_COMMAND.get(command_name)()


if __name__ == '__main__':
    main()
