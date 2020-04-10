FROM python:3.7-slim

RUN mkdir /code
WORKDIR /code

COPY ./minotor /code/minotor
COPY ./pyproject.toml .
COPY ./poetry.lock .
COPY ./setup.py .

RUN pip install poetry

# Project initialization:
RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi

RUN python setup.py sdist bdist_wheel

RUN pip install virtualenv
RUN virtualenv test
RUN /bin/bash -c "source test/bin/activate"
RUN pip install dist/minotor-0.0.0-py3-none-any.whl
