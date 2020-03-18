import React, { useState } from 'react';
import Table from '../components/base-elements/Table';
import useFeatureData from '../utils/data-managers/FeatureDataManager';
import buildTableProps from '../utils/data-managers/FeatureTableAdapter';
// Components
import AreaPlot from '../components/react-vis/AreaPlot';
import ScatterPlot from '../components/react-vis/ScatterPlot';

export default function FeaturesAnalytics(props) {
  const [activeFeature, setActiveFeature] = useState(null);
  const [plotData, setPlotData] = useState([]);
  const featureData = useFeatureData();

  // Constants
  const REACT_VIS_PROPS = {
    xTitle: "I'm axis X",
    yTitle: "And I'm axis Y",
    width: 600,
    height: 400,
    data: plotData,
  };

  // Event functions
  const onTrClicked = (e) => {
    const tr = e.currentTarget;
    const selectedFeature = tr.firstChild.innerText;

    if (selectedFeature != activeFeature) {
      const data = featureData[selectedFeature];
      const histTrain = hist2reactVisData(data.train.hist);
      const histPredict = hist2reactVisData(data.predict.hist);
      setActiveFeature(selectedFeature);
      setPlotData([
        {
          data: histTrain,
          name: 'Train Data',
          color: 'grey',
          type: 'train',
        },
        {
          data: histPredict,
          values: data.predict.values,
          mean: data.predict.mean,
          name: 'Predict Data',
          type: 'predict',
        },
      ]);
    }
  };

  return (
    <div id="features-analytics">
      <h1 style={{ marginBottom: '30px' }}>Features Analytics</h1>
      <Table {...buildTableProps(featureData)} onTrClicked={onTrClicked} />
      <AreaPlot {...REACT_VIS_PROPS} />
      <ScatterPlot type="outliers" {...REACT_VIS_PROPS} />
    </div>
  );
}

// Utils
const hist2reactVisData = ([Y, X]) => Y.map((y, idx) => ({ x: X[idx], y }));
