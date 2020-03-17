import React, { useState } from 'react';
import Table from '../components/base-elements/Table';
// Components
import AreaPlot from '../components/react-vis/AreaPlot';
import BarPlot from '../components/react-vis/BarPlot';

import { buildTableProps } from '../components/data-managers/FeatureTableAdapter';

const onTrClicked = e => {
  const tr = e.currentTarget;
  if (tr.dataset.header === 'false') {
    const selectedFeature = tr.firstChild.innerText;
    // TODO: display graphs related to selected feature
    console.log(`User has selected the feature : ${selectedFeature}`);
  }
};
// Event functions
export default function FeaturesAnalytics(props) {
  const { data } = props;

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
      <Table {...buildTableProps(data)} onTrClicked={onTrClicked} />
      <AreaPlot {...AREA_SERIES_PROPS} />
      <BarPlot {...AREA_SERIES_PROPS} />
    </div>
  );
}
