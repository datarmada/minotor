FROM python:3.6-slim

RUN mkdir /code
WORKDIR /code

COPY ./minotoring/*.py /code/
COPY ./pyproject.toml .
COPY ./poetry.lock .

RUN pip install poetry

# Project initialization:
RUN poetry config virtualenvs.create false \
    && poetry install --no-dev --no-interaction --no-ansi
