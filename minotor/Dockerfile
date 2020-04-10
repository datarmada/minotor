FROM python:3.7-slim

RUN mkdir /code
WORKDIR /code

COPY ./minotor/*.py /code/minotor/
COPY ./pyproject.toml /code
COPY ./poetry.lock /code

RUN pip install poetry

# Project initialization:
RUN poetry config virtualenvs.create false \
    && poetry install --no-dev --no-interaction --no-ansi
