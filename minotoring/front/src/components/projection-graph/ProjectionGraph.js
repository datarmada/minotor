import { arrayOf, func, string } from 'prop-types';
import React, { useEffect, useState } from 'react';

// Components
import ScatterPlot from '../react-vis/ScatterPlot';

// Data Managers
import { buildPostFetcher } from '../../utils/data-managers/DataFetcher';

// Utils
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
  const { featureNames, onSelectedPoints } = props;
  const [projectedTrainingData, setProjectedTrainingData] = useState([]);
  const [projectedPredictionData, setProjectedPredictionData] = useState([]);

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

  return (
    <ScatterPlot
      data={[
        {
          data: projectedTrainingData,
          name: 'Training',
          color: 'var(--charts-flat-color)',
        },
        {
          data: projectedPredictionData,
          name: 'Prediction',
          color: 'var(--charts-main-bright-color)',
        },
      ]}
      isDraggable
      isCrosshair={false}
      {...props}
      onHighlightedPoints={onSelectedPoints}
    />
  );
}

ProjectionGraph.propTypes = {
  featureNames: arrayOf(string).isRequired,
  onSelectedPoints: func.isRequired,
};
