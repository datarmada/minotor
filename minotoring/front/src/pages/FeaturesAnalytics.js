import React, { useState } from 'react';
import Table from '../components/base-elements/Table';
import useFeatureData from '../utils/data-managers/FeatureDataManager';
import buildTableProps from '../utils/data-managers/FeatureTableAdapter';
// Components
import AreaPlot from '../components/react-vis/AreaPlot';
import BarPlot from '../components/react-vis/BarPlot';

export default function FeaturesAnalytics(props) {
  const [activeFeature, setActiveFeature] = useState(null);
  const [areaPlotData, setAreaPlotData] = useState({});
  const featureData = useFeatureData();

  // Constants
  const REACT_VIS_PROPS = {
    xTitle: "I'm axis X",
    yTitle: "And I'm axis Y",
    width: 600,
    height: 400,
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
      setAreaPlotData({ trainData: histTrain, predictData: histPredict });
    }
  };

  return (
    <div id="features-analytics">
      <h1 style={{ marginBottom: '30px' }}>Features Analytics</h1>
      <Table {...buildTableProps(featureData)} onTrClicked={onTrClicked} />
      <AreaPlot
        trainData={areaPlotData.trainData}
        predictData={areaPlotData.predictData}
        {...REACT_VIS_PROPS}
      />
      <BarPlot {...REACT_VIS_PROPS} />
    </div>
  );
}

// Utils
const hist2reactVisData = ([Y, X]) => Y.map((y, idx) => ({ x: X[idx], y }));
