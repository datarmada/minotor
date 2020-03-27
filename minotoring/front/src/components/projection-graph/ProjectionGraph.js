import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ScatterPlot from '../react-vis/ScatterPlot';
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
  }, []);

  return (
    <div>
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
      />
    </div>
  );
}

ProjectionGraph.propTypes = {
  featureNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};
