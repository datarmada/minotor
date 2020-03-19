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
  const PLOTS_DIMENSIONS = {
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
      <AreaPlot
        key="Title of area plot"
        xTitle={activeFeature}
        yTitle="Occurence"
        data={areaPlotData}
        {...PLOTS_DIMENSIONS}
      />,
      <ScatterPlot
        key="Title of scatter plot"
        xTitle="Order of appearance"
        yTitle={activeFeature}
        data={scatterPlotData}
        {...PLOTS_DIMENSIONS}
      />,
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
