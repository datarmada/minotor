import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DraggableScatterPlot from '../react-vis/DraggableScatterPlot';
import { postDataFetcher } from '../../utils/data-managers/DataFetcher';

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
  const { featureNames } = props;
  const [projectedTrainingData, setProjectedTrainingData] = useState([]);
  const [projectedPredictionData, setProjectedPredictionData] = useState([]);

  useEffect(() => {
    const fetchData = postDataFetcher(
      'projection',
      handleFetchedData,
      JSON.stringify(featureNames)
    );
    fetchData(setProjectedTrainingData, setProjectedPredictionData);
  }, [featureNames]);

  return (
    <DraggableScatterPlot
      data={[
        { data: projectedTrainingData, name: 'Training' },
        {
          data: projectedPredictionData,
          name: 'Prediction',
          color: 'red',
        },
      ]}
      {...props}
    />
  );
}

ProjectionGraph.propTypes = {
  featureNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};
