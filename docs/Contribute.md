# How to contribute

We are very happy to receive and merge your contributions into this repository!

To contribute via pull request, follow these steps:

1. Create an issue describing the feature you want to work on
2. Write your code, tests and documentation, and format them (ESLint for Javascript and autopep8 for Python)
3. Create a pull request describing your changes

Your pull request will be reviewed by a maintainer, who will get back to you about any necessary changes or questions. You will also be asked to sign a [Contributor License Agreement](https://cla-assistant.io/).

# Development Internals

The project is divided in two parts: a Python backend handling the data and a ReactJS frontend to build the dashboard. Both can be managed with Docker, but you can also run them separately.

## Docker & docker-compose

### Installing

Simply install [Docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/) and you are good to go with the command:

```bash
docker-compose up -d
```

### Running the tests

If you use Docker, you probably want to run the tests inside the running containers. Here is how.

We are using unittest to test the Python code.

```bash
sudo docker-compose exec app python -m unittest discover minotoring/tests
```

We are using jest to run our ReactJS tests.

```bash
sudo docker-compose exec npm npm run test
```

_Note: in both cases if you installed docker-compose so that it runs without sudo, of course remove sudo from the commands above._

## Python

Minotor uses [Poetry](https://python-poetry.org/) for dependency management. If you want to build it from source,

<!-- This line is a header 4 on purpose, so that the reader can't miss that -->

#### you have to [install Poetry](https://python-poetry.org/docs/#installation) first.

### Installing

Run the following code line to install dependencies

```bash
poetry install
```

### Formatting

For now, we follow [pep8](https://www.python.org/dev/peps/pep-0008/) recommandations.
Feel free to use any tool you want to help you do that, even if it is not mentioned in the
list below.

#### VScode

**@Julien please fill this part**

#### Atom

Install [python-autopep8](https://atom.io/packages/python-autopep8) and give it
the `autopep8` path in the settings if it is not in your system's path.

### Running the tests

We are using unittest to test the Python code. Run the tests at the source of the project:

```bash
python -m unittest discover minotoring/tests
```

## ReactJS

The frontend project is located at `/minotoring/front`.

### Installing

At the root of the project, install the dependencies with npm:

```bash
npm install
```

You can as well use yarn as package manager:

```bash
yarn install
```

### Formatting

We use ESlint to format and spot issues in the Javascript code.

The rules are explicited in the `.eslintrc` file.

Since the frontend project is not at the root of the global project, you may have to specify the root to the working directory to your IDE.

#### VScode

Create a `.vscode/settings.json` file if it doesn't exist and add a field:

```json
  "eslint.workingDirectories": [
    "./minotoring/front"
  ],
```

#### Atom

Install [linter](https://atom.io/packages/linter) and [linter-eslint](https://atom.io/packages/linter-eslint)
and you should be good to go. Don't forget to install node dependencies (dev dependencies included)
as shown above so that the `node_modules` folder in `/minotoring/front` exists and is not empty.

### Running the test

We are using jest to run our ReactJS tests.
Run the test with npm:

```bash
npm run test
```