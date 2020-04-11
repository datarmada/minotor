# Tutorial : Minotor Basics

This page explains the basics of monitoring your project using Minotor, once [the installation](Installation.md) is completed in the same environment as your project.

**Important: for now, Minotor is only accepting data that are Numpy arrays or Pandas DataFrame.**

## Import your training data

First of all, you need to import your training data to be able to compare it to the prediction data afterwards. It will enable Minotor to compute some relevant statistics.

### Using the Python decorator

Use the related decorator on your training pipeline.

```python
from minotor.decorators.feature_monitoring import monitor_training_features

@monitor_training_features
def train(data):
    # Do stuff with your data and train your model

```

### Using the interface

When no data has been imported, you will find on the dashboard a button which
will let you do so.

**Don't forget that for now, Minotor is only accepting data that are Numpy arrays or Pandas DataFrame, so you must pickle one of those two types.**

If you can't see the button, you probably have some data already imported. To get
rid of it, use the `minotor clean` command mentionned [here](#Commands).

<img src="img/add-training-data.gif" width="100%"/>

## Track your prediction data

Use the decorator on your inference function to track continuously your inference data and monitor the differences with your training data.

```python
from minotor.decorators.feature_monitoring import monitor_prediction_features

@monitor_prediction_features
def predict(data):
    # Do stuff with your data and predict through your model

```

**:warning: In order to compare those data, the training data and the prediction data you are importing in Minotor must have the same preprocessing, if any :warning:**

## Inspect your data

### Quick feature analysis and projection

#### Layout

In the table at the top, you can select one ore several feature.

- when **one feature is selected**, you can see the distribution graphs of both the
  training and prediction data, a scatter plot with the value of this feature by order
  of appearance of the inputs, but also a table with the statistics related to this feature.
- when **several values are selected**, the graph you see is the projection of all the
  features selected on two axis, using the [T-SNE algorithm](https://en.wikipedia.org/wiki/T-distributed_stochastic_neighbor_embedding), for both the training and prediction data.

<img src="img/fa-and-projection.gif" width="100%"/>

#### How to interpret this ?

With those visual representations, it is fairly easy! The more the blue dots (or curve)
are separated from the grey dots (or curve), the more your data is drifted / drifting.

### Input selection

On the projection graph, you can select the dots which seems suspicious to you,
in order to analyze them more precisely.

<img src="img/select-inputs.gif" width="100%"/>

### Input analysis

<img src="img/input-analysis.gif" width="100%"/>

## Commands

`$ minotor` :arrow_right: starts the Minotor interface

`$ minotor iris-example` :arrow_right: fills the Minotor interface with sample data
from the iris dataset

`$ minotor clean` :arrow_right: cleans both training and prediction data

`$ minotor clean-training` :arrow_right: cleans training data

`$ minotor clean-prediction` :arrow_right: cleans prediction data
