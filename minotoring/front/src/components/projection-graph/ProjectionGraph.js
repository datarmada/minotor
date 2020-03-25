import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DataFetcher from '../../utils/data-managers/DataFetcher';
import DragableScatterPlot from '../react-vis/DragableScatterPlot';

const buildProjectedPlot = (projectedTrainingData, projectedPredictionData) => (
  <DragableScatterPlot
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

const handleFetchedData = async (
  response,
  setProjectedTrainingData,
  setProjectedPredictionData
) => {
  const data = await response.json();
  const trainProjection = data.training;
  const predictProjection = data.prediction;
  setProjectedTrainingData(
    trainProjection.map(([x, y]) => ({
      x,
      y,
    }))
  );
  setProjectedPredictionData(
    predictProjection.map(([x, y]) => ({
      x,
      y,
    }))
  );
};

export default function ProjectionGraph(props) {
  const { features } = props;
  const [projectedTrainingData, setProjectedTrainingData] = useState([]);
  const [projectedPredictionData, setProjectedPredictionData] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(features),
    };
    const dataFetcher = DataFetcher(
      requestOptions,
      'projection',
      handleFetchedData
    );
    dataFetcher(setProjectedTrainingData, setProjectedPredictionData);
  }, []);

  return (
    <div>
      {buildProjectedPlot(projectedTrainingData, projectedPredictionData)}
    </div>
  );
}

ProjectionGraph.propTypes = {
  features: PropTypes.objectOf(Object).isRequired,
};
