import React, { useEffect, useState } from 'react';
import ScatterPlot from '../react-vis/ScatterPlot';

const buildProjectedPlot = (projectedTrainingData, projectedPredictionData) => (
  <ScatterPlot
    data={[
      { data: projectedTrainingData, name: 'Training' },
      {
        data: projectedPredictionData,
        name: 'Prediction',
        color: 'red',
      },
    ]}
  />
);

const fetchProjection = async (
  setProjectedTrainingData,
  setProjectedPredictionData,
  featureNames
) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(featureNames),
  };
  try {
    const response = await fetch(
      'http://0.0.0.0:8888/projection',
      requestOptions
    );
    const data = await response.json();
    const trainProjection = data.training;
    const predictProjection = data.prediction;
    setProjectedTrainingData(
      trainProjection.map(([x, y], idx) => ({
        x,
        y,
      }))
    );
    setProjectedPredictionData(
      predictProjection.map(([x, y], idx) => ({
        x,
        y,
      }))
    );
  } catch (err) {
    console.error(err);
  }
};

export default function ProjectionGraph() {
  const [projectedTrainingData, setProjectedTrainingData] = useState([]);
  const [projectedPredictionData, setProjectedPredictionData] = useState([]);

  useEffect(() => {
    fetchProjection(setProjectedTrainingData, setProjectedPredictionData, [
      'sepal_length',
      'sepal_width',
    ]);
  }, []);

  return (
    <div>
      {buildProjectedPlot(projectedTrainingData, projectedPredictionData)}
    </div>
  );
}
