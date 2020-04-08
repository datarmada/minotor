import { arrayOf, func, string } from 'prop-types';
import React, { useEffect, useState } from 'react';

// Components
import ScatterPlot from '../react-vis/ScatterPlot';

// Data Managers
import { buildJsonPostFetcher } from '../../utils/data-managers/DataFetcher';

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
    const { fetchData, abortController } = buildJsonPostFetcher(
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
          data: projectedTrainingData.map(dot => ({ ...dot, size: 4 })),
          name: 'Training',
          color: 'var(--charts-flat-color)',
          opacity: 0.8,
        },
        {
          data: projectedPredictionData.map(dot => ({ ...dot, size: 4 })),
          name: 'Prediction',
          color: 'var(--charts-main-bright-color)',
          opacity: 0.8,
        },
      ]}
      isDraggable
      isCrosshair={false}
      {...props}
      onHighlightedPoints={onSelectedPoints}
      title="Features projected with T-SNE algorithm"
      description="Select points for a detailed analysis"
    />
  );
}

ProjectionGraph.propTypes = {
  featureNames: arrayOf(string).isRequired,
  onSelectedPoints: func.isRequired,
};
