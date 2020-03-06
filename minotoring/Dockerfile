FROM python:3.6-slim

RUN mkdir /code
WORKDIR /code

COPY .. .

RUN pip install poetry

# Project initialization:
RUN poetry config virtualenvs.create false \
    && poetry install --no-dev --no-interaction --no-ansi
