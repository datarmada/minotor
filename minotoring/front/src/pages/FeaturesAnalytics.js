import React, { useState } from 'react';

// Data Managers
import buildTableProps from '../utils/data-managers/FeatureTableAdapter';
import useFeatureData, {
  buildAreaPlotProps,
  buildScatterPlotProps,
} from '../utils/data-managers/FeatureDataManager';

// Components
import AreaPlot from '../components/react-vis/AreaPlot';
import ScatterPlot from '../components/react-vis/ScatterPlot';
import Table from '../components/base-elements/Table';

export default function FeaturesAnalytics(props) {
  const [activeFeature, setActiveFeature] = useState(null);
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
    setActiveFeature(selectedFeature);
  };

  // Preparing data for the plot components
  let plots = null;
  if (featureData && activeFeature) {
    const data = featureData[activeFeature];
    const areaPlotData = buildAreaPlotProps(data);
    const scatterPlotData = buildScatterPlotProps(data);
    plots = [
      <AreaPlot key="Title of area plot" data={areaPlotData} {...REACT_VIS_PROPS} />,
      <ScatterPlot key="Title of scatter plot" data={scatterPlotData} {...REACT_VIS_PROPS} />,
    ];
  }

  return (
    <div id="features-analytics">
      <h1 style={{ marginBottom: '30px' }}>Features Analytics</h1>
      <Table {...buildTableProps(featureData)} onTrClicked={onTrClicked} />
      {plots}
    </div>
  );
}
