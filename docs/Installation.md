# Installation

## Quick installation

You can install Minotor using pip (requires Python >= 3.6)

```
$ pip install minotor
```

Having trouble installing? Read our [step-by-step installation guide](#step-by-step-installation-guide) below.

When you are done installing, you can head over to [the tutorial](Tutorial.md)!

## Step-by-step installation guide

### 1. Install the Python development environment

Check if your Python environment is already configured:

```
$ python3 --version
$ pip3 --version
```

If these packages are already installed, these commands should display version numbers for each step, and you can skip to [the next step](#create-a-virtual-environment-strongly-recommended).

Otherwise, proceed with the instructions below to install them.

#### Ubuntu

Fetch the relevant packages using apt, and install virtualenv using pip.

```
$ sudo apt update
$ sudo apt install python3-dev python3-pip
```

#### MacOS

Install the [Homebrew](https://brew.sh/) package manager if you haven’t already.

Once you’re done, you can install Python3.

```
$ brew update
$ brew install python
```

#### Windows

Make sure the Microsoft VC++ Compiler is installed, so python can compile any dependencies. You can get the compiler from [Visual Studio](https://visualstudio.microsoft.com/visual-cpp-build-tools/). Download the installer and select VC++ Build tools in the list.
Install [Python 3](https://www.python.org/downloads/windows/) (64-bit version) for Windows.

```
C:\> pip3 install -U pip
```

### 2. Create a virtual environment (strongly recommended)

Tools like [virtualenv](https://virtualenv.pypa.io/en/latest/) and [virtualenvwrapper]() provide isolated Python environments, which are cleaner than installing packages systemwide (as they prevent dependency conflicts). They also let you install packages without root privileges.

#### Ubuntu / MacOS

Create a new virtual environment (here we call it venv) by choosing a Python interpreter and making a ./venv directory to hold it:

```
$ python3 -m venv ./venv
```

Activate the virtual environment:

```
$ source ./venv/bin/activate
```

#### Windows

Create a new virtual environment by choosing a Python interpreter and making a .\venv directory to hold it:

```
C:\> python3 -m venv --system-site-packages ./venv
```

Activate the virtual environment:

```
C:\> .\venv\Scripts\activate
```

### 3. Install Minotor

First make sure your pip version is up to date:

```
$ pip install -U pip
```

To install Minotor:

```
$ pip install minotor
```

**Congratulations! You have successfully installed Minotor**

You can now head over to [the tutorial](Tutorial.md).
