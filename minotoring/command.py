import sys

from minotoring.run import runserver
from minotoring.seeds.iris_seed import run as run_iris

ARG_COMMAND = {
    'iris-example': run_iris,
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
            return f"The only available command after minotoring is: {available_command}"
        return f"Available commands after minotoring are: {available_command}"
    return ARG_COMMAND.get(command_name)()


if __name__ == '__main__':
    main()
