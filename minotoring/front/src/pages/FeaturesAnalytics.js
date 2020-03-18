import React from 'react';
import Table from '../components/base-elements/Table';
import useFeatureData from '../utils/data-managers/UseFeatureData';
import buildTableProps from '../utils/data-managers/FeatureTableAdapter';
// Components
import AreaPlot from '../components/react-vis/AreaPlot';
import BarPlot from '../components/react-vis/BarPlot';

const onTrClicked = e => {
  const tr = e.currentTarget;
  const selectedFeature = tr.firstChild.innerText;
  // TODO: display graphs related to selected feature
  console.log(`User has selected the feature : ${selectedFeature}`);
};

export default function FeaturesAnalytics(props) {
  const featureData = useFeatureData();

  // Constants
  const AREA_SERIES_PROPS = {
    xTitle: "I'm axis X",
    yTitle: "And I'm axis Y",
    width: 600,
    height: 400,
    data: []
  };

  return (
    <div id="features-analytics">
      <h1 style={{ marginBottom: '30px' }}>Features Analytics</h1>
      <Table {...buildTableProps(featureData)} onTrClicked={onTrClicked} />
      <AreaPlot {...AREA_SERIES_PROPS} />
      <BarPlot {...AREA_SERIES_PROPS} />
    </div>
  );
}
