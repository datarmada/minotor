# Minotor Open Source

Minotor is an open source software for data and machine learning models monitoring. 

Data inconsistency, drift and bias are responsible for most of the model failures in the real world. Minotor helps you solve that problem by tracking inconsistency between your training and production data, detecting bias in your model and performance drops. 

Minotor has been built to be easy to handle. Download our Python package, plug your model through a decorator, and you are ready to go !

--- 
- **I'm new to Minotor** 😄 [Get started with Minotor](#getting-started-with-minotor)
- **I'd like to read the detailed docs** 🤓 [Read the docs]()
- **I'm ready to install Minotor** 🚀 [Installation]()
- **I have a question** ❓ [Send us an email]()
- **I would like to contribute** 🤗 [How to contribute]()
--- 
## Getting started with Minotor

To monitor your first project, copy the three commands in the cell below and run them in your terminal.

The first command install Minotor Open Source onto your system.

The second command `minotor init` then creates a sample project, using the famous [iris dataset](https://scikit-learn.org/stable/auto_examples/datasets/plot_iris_dataset.html) 

The third command launches the Minotoring Dashboard, where you can monitor your data and inspect differences between train and prod. 

```
pip install minotor
minotor init
minotor run
```