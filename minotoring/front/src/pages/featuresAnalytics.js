import React, { useEffect, useState } from 'react';

// Components
import AreaPlot from '../components/react-vis/AreaPlot';
import BarPlot from '../components/react-vis/BarPlot';
import Table from '../components/base-elements/Table';

const mapObjectToArray = (obj, func) =>
  Object.entries(obj).map(([key, value]) => func(key, value));

const transformSingleFeature = (featureName, featureData) =>
  Object.assign({ featureName: featureName }, featureData);

const transformData = rawData =>
  mapObjectToArray(rawData.features, transformSingleFeature);

const extractStatistics = singleFeature =>
  Object.keys(singleFeature).filter(key => key !== 'values');

const getOrderedKeys = rawData =>
  ['featureName'].concat(
    extractStatistics(
      Object.keys(rawData.features).length > 0 ? rawData.features[0] : {}
    )
  );

const verboseKeyNames = {
  featureName: 'Name of the features',
  mean: 'Mean',
  std: 'Standard Deviation',
  nb_nan: 'Number of NaN'
};

// Event functions
const onTrClicked = e => {
  const tr = e.currentTarget;
  if (tr.dataset.header === 'false') {
    const selectedFeature = tr.firstChild.innerText;
    // TODO: display graphs related to selected feature
    console.log(`User has selected the feature : ${selectedFeature}`);
  }
};

const buildTableProps = rawData => {
  return {
    onTrClicked,
    orderedKeys: getOrderedKeys(rawData),
    verboseKeyNames: verboseKeyNames,
    data: transformData(rawData)
  };
};

export default function FeaturesAnalytics(props) {
  const [data, setData] = useState({ features: {} });

  // Constants
  const AREA_SERIES_PROPS = {
    xTitle: "I'm axis X",
    yTitle: "And I'm axis Y",
    width: 600,
    height: 400,
    data: []
  };

  useEffect(() => {
    const ws = new WebSocket('ws://0.0.0.0:8888/ws');
    ws.onopen = function() {
      console.log('WebSocket opened');
    };
    ws.onmessage = function(e) {
      setData(JSON.parse(e.data).area);
    };
    ws.onclose = function(e) {
      console.log('WebSocket closed');
    };
    return function cleanup() {
      ws.close();
    };
  });

  return (
    <div id="features-analytics">
      <h1 style={{ marginBottom: '30px' }}>Features Analytics</h1>
      <Table {...buildTableProps(data)} />
      <AreaPlot {...AREA_SERIES_PROPS} />
      <BarPlot {...AREA_SERIES_PROPS} />
    </div>
  );
}
