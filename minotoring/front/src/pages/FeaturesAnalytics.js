import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
// Data Managers
import {buildAreaPlotProps, buildScatterPlotProps, buildTableProps,} from '../utils/data-managers/FeatureDataManager';
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

export default function FeaturesAnalytics(props) {
  const [activeFeature, setActiveFeature] = useState(null);

  const {featureData} = props;

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(["feature_0", "feature_1"])
    };

    fetch("http://0.0.0.0:8888/projection", requestOptions)
      .then(
        res => console.log(res.json())
      );
  }, []);

  // Event functions
  const onTrClicked = e => {
    const tr = e.currentTarget;
    const selectedFeature = tr.firstChild.innerText;
    setActiveFeature(selectedFeature);
  };

  return (
    <div id="features-analytics">
      <h1 style={{marginBottom: '30px'}}>Features Analytics</h1>
      <Table {...buildTableProps(featureData)} onTrClicked={onTrClicked}/>
      {buildPlots(featureData, activeFeature)}
    </div>
  );
}

FeaturesAnalytics.propTypes = {
  featureData: PropTypes.object.isRequired,
};
