# Minotor Open Source

Minotor is an open source software for data and machine learning models monitoring. 

Data inconsistency, drift and bias are responsible for most of the model failures in the real world. Minotor helps you solve that problem by tracking inconsistency between your training and production data, detecting bias in your model and performance drops. 

Minotor has been built to be easy to handle. Download our Python package, plug your model through a decorator, and you are ready to go !

--- 
- **I'm new to Minotor** 😄 [Get started with Minotor](#getting-started-with-minotor)
- **I want to learn how to use Minotor** 🤓 [Tutorial]()
- **I'm ready to install Minotor** 🚀 [Installation]()
- **I have a question** ❓ [Send us an email]()
- **I would like to contribute** 🤗 [How to contribute]()
--- 
## Getting started with Minotor

To monitor your first project, copy the three commands in the cell below and run them in your terminal.

The first command install Minotor onto your system.

The second command `minotor init` then creates a sample project, using the famous [iris dataset](https://scikit-learn.org/stable/auto_examples/datasets/plot_iris_dataset.html) 

The third command launches the Minotoring Dashboard, where you can monitor your data and inspect differences between train and prod. 

```
pip install minotor
minotor init
minotor run
```
You can now go to http://localhost:3000 in your favorite browser and play with Minotor !

#### After completing installation, learn how to monitor you own project:

[Head to the Minotor tutorial >>]()

#### Having trouble installing Minotor?

[Step-by-step installation guide >>]()

--- 
## License
Licensed under the Apache License, Version 2.0. [Copy of the license](LICENSE.txt)