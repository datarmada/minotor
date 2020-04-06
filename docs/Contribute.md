# How to contribute

We are very happy to receive and merge your contributions into this repository!

To contribute via pull request, follow these steps:

1. Create an issue describing the feature you want to work on
2. Write your code, tests and documentation, and format them with ESlint
3. Create a pull request describing your changes

Your pull request will be reviewed by a maintainer, who will get back to you about any necessary changes or questions. You will also be asked to sign a [Contributor License Agreement](https://cla-assistant.io/).

# Development Internals

The project is divided in two parts: a Python backend handling the data and a ReactJS frontend to build the dashboard.

## Python
 
Minotor uses Poetry for packaging and dependency management. If you want to build it from source, you have to install Poetry first. This is how it can be done:

```
curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python3
```
There are several other ways to install Poetry. Please, follow [the official guide](https://python-poetry.org/docs/#installation) to see all possible options.

### Installing

Run the following code line to install dependencies

```
poetry install
```

### Running the tests

We are using unittest to test the Python code. Run the tests at the source of the project:
```
python -m unittest discover minotoring/tests
```

## ReactJS

The frontend project is located at /minotoring/front. 

### Installing

At the root of the project, install the dependencies with npm:
```
npm install
```

You can as well use yarn as package manager:
```
yarn install
```

### Formatting
We use ESlint to format and spot issues in the Javascript code. 

The rules are explicited in the ```.eslintrc```  file. 

Since the frontend project is not at the root of the global project, you may have to specify the root to the working directory to your IDE.

#### VScode

Create a ```.vscode/settings.json``` file if it doesn't exist and add a field:
```json
  "eslint.workingDirectories": [
    "./minotoring/front"
  ],
```

#### Atom

**@Boris please fill this**

### Running the test

We are using jest to run our ReactJS tests.
Run the test with npm:
```
npm run test
```
