import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ScatterPlot from '../react-vis/ScatterPlot';
import { buildPostFetcher } from '../../utils/data-managers/DataFetcher';

const handleFetchedData = async (
  response,
  setProjectedTrainingData,
  setProjectedPredictionData
) => {
  const data = await response.json();
  const trainIds = data.training.ids;
  const trainProjection = data.training.values;
  const predictIds = data.prediction.ids;
  const predictProjection = data.prediction.values;
  setProjectedTrainingData(
    trainProjection.map(([x, y], idx) => ({
      x,
      y,
      id: trainIds[idx],
    }))
  );
  setProjectedPredictionData(
    predictProjection.map(([x, y], idx) => ({
      x,
      y,
      id: predictIds[idx],
    }))
  );
};

export default function ProjectionGraph(props) {
  const { featureNames } = props;
  const [projectedTrainingData, setProjectedTrainingData] = useState([]);
  const [projectedPredictionData, setProjectedPredictionData] = useState([]);
  const [selectedPoints, setSelectedPoints] = useState({});
  useEffect(() => {
    const { fetchData, abortController } = buildPostFetcher(
      'projection',
      handleFetchedData,
      JSON.stringify(featureNames)
    );
    fetchData(setProjectedTrainingData, setProjectedPredictionData);
    return function cleanUp() {
      abortController.abort();
    };
  }, [featureNames]);
  console.log(selectedPoints);
  return (
    <ScatterPlot
      data={[
        { data: projectedTrainingData, name: 'Training' },
        {
          data: projectedPredictionData,
          name: 'Prediction',
          color: 'red',
        },
      ]}
      isDraggable
      isCrosshair={false}
      {...props}
      onHighlightedPoints={setSelectedPoints}
    />
  );
}

ProjectionGraph.propTypes = {
  featureNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};
