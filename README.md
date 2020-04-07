# Minotor Open Source

Minotor is an open source software for data and machine learning models monitoring.

Data inconsistency, drift and bias are responsible for most of the model failures in the real world. Minotor helps you solve that problem by tracking inconsistency between your training and production data, detecting bias in your model and performance drops.

Minotor has been built to be easy to handle. Download our Python package, plug your model through a decorator, and you are ready to go !

---

- **I'm new to Minotor** 😄 [Get started now !](#getting-started-with-minotor)
- **I want to learn how to use Minotor** 🤓 [Tutorial](docs/Tutorial.md)
- **I'm ready to install Minotor** 🚀 [Installation](docs/Installation.md)
- **I would like to contribute** 🤗 Thanks ! Check out [how to contribute](docs/Contribute.md)
- **I have a question or a suggestion** ❓ Send us an email at contact@datarmada.com

---

## Getting started with Minotor

To monitor your first project, copy the three commands in the cell below and run them in your terminal.

```
$ pip install minotor
$ minotor iris-example
$ minotor run
```

`pip install minotor` installs Minotor onto your system.

`minotor iris-example` creates a sample project using the famous [iris dataset](https://scikit-learn.org/stable/auto_examples/datasets/plot_iris_dataset.html).

`minotor run` launches the Minotor dashboard, where you can monitor your data and inspect differences between train and prod.

You can now go to http://localhost:8888 in your favorite browser and play with Minotor !

#### After completing installation, learn how to monitor you own project:

[Head to the Minotor tutorial :arrow_right:](docs/Tutorial.md)

#### Having trouble installing Minotor?

[Step-by-step installation guide :arrow_right:](docs/Installation.md)

---

## License

Licensed under the Apache License, Version 2.0. [Copy of the license](LICENSE.txt)
