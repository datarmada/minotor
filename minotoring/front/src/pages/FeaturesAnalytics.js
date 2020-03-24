import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// Data Managers
import {
  buildAreaPlotProps,
  buildScatterPlotProps,
  buildTableProps,
} from '../utils/data-managers/FeatureDataManager';
// Components
import AreaPlot from '../components/react-vis/AreaPlot';
import ScatterPlot from '../components/react-vis/ScatterPlot';
import Table from '../components/base-elements/Table';

// Utils
const buildPlots = (featureData, activeFeature) => {
  if (!(featureData && activeFeature)) {
    return null;
  }
  const data = featureData[activeFeature];
  const areaPlotData = buildAreaPlotProps(data);
  const scatterPlotData = buildScatterPlotProps(data);
  const plots = [
    <AreaPlot
      key="Title of area plot"
      xTitle={activeFeature}
      yTitle="Occurence"
      data={areaPlotData}
    />,
    <ScatterPlot
      key="Title of scatter plot"
      xTitle="Order of appearance"
      yTitle={activeFeature}
      data={scatterPlotData}
    />,
  ];
  return plots;
};

const buildProjectedPlot = (projectedTrainingData, projectedPredictionData) => (
  <ScatterPlot
    data={[
      { data: projectedTrainingData, name: 'Training', color: 'blue' },
      {
        data: projectedPredictionData,
        name: 'Prediction',
        color: 'red',
      },
    ]}
    xTitle="test"
    yTitle="test"
    key="key"
  />
);

export default function FeaturesAnalytics(props) {
  const [activeFeature, setActiveFeature] = useState(null);
  const [projectedTrainingData, setProjectedTrainingData] = useState([]);
  const [projectedPredictionData, setProjectedPredictionData] = useState([]);
  const { featureData } = props;

  const fetchProjection = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(['sepal_length', 'sepal_width']),
    };
    const response = await fetch(
      'http://0.0.0.0:8888/projection',
      requestOptions
    );
    const data = await response.json();
    const train_projection = data.training;
    const predict_projection = data.prediction;
    setProjectedTrainingData([
      ...projectedTrainingData,
      ...train_projection.map(([x, y], idx) => ({
        x,
        y,
      })),
    ]);
    setProjectedPredictionData([
      ...projectedPredictionData,
      ...predict_projection.map(([x, y], idx) => ({
        x,
        y,
      })),
    ]);
  };

  useEffect(() => {
    fetchProjection();
  }, []);

  // Event functions
  const onTrClicked = e => {
    const tr = e.currentTarget;
    const selectedFeature = tr.firstChild.innerText;
    setActiveFeature(selectedFeature);
  };

  return (
    <div id="features-analytics">
      <h1 style={{ marginBottom: '30px' }}>Features Analytics</h1>
      {buildProjectedPlot(projectedTrainingData, projectedPredictionData)}
      <Table {...buildTableProps(featureData)} onTrClicked={onTrClicked} />
      {buildPlots(featureData, activeFeature)}
    </div>
  );
}

FeaturesAnalytics.propTypes = {
  featureData: PropTypes.object.isRequired,
};
