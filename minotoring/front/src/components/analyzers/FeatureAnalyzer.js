import React, { useEffect, useState } from 'react';

import isEmpty from 'lodash';

// Data managers
import { getDataFetcher } from '../../utils/data-managers/DataFetcher';
import {
  buildAreaPlotProps,
  buildFeatureKlTableProps,
  buildScatterPlotProps,
  buildTableProps,
} from '../../utils/data-managers/FeatureDataManager';

// Components
import AreaPlot from '../react-vis/AreaPlot';
import ProjectionGraph from '../projection-graph/ProjectionGraph';
import ScatterPlot from '../react-vis/ScatterPlot';
import Table from '../base-elements/Table';

// Utils
const toggleSelectedFeature = (feature, selectedFeatures) =>
  selectedFeatures.includes(feature)
    ? selectedFeatures.filter(f => f !== feature)
    : [...selectedFeatures, feature];

const dataSetter = async (response, setFeatureData) => {
  const data = await response.json();
  setFeatureData(data.features);
};

export default function FeatureAnalyzer() {
  const [featureData, setFeatureData] = useState({});
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  // Event functions
  const handleRowClicked = e => {
    const tr = e.currentTarget;
    tr.classList.toggle('selected');
    const feature = tr.firstChild.innerText;
    const newFeatures = toggleSelectedFeature(feature, selectedFeatures);
    setSelectedFeatures(newFeatures);
  };

  useEffect(() => {
    const dataFetcher = getDataFetcher('data', dataSetter);
    dataFetcher(setFeatureData);
  }, []);

  return (
    <div className="feature-analyzer" style={{ padding: '30px' }}>
      <Table
        {...buildFeatureKlTableProps(featureData)}
        onRowClicked={handleRowClicked}
      />
      <div className="projection-graph-container">
        {buildVisualizations(featureData, selectedFeatures)}
      </div>
    </div>
  );
}

const buildVisualizations = (featureData, selectedFeatures) => {
  if (selectedFeatures.length === 0) {
    return (
      <div className="no-feature-selected">
        <p>Select one or several features to analyze them</p>
      </div>
    );
  }
  if (selectedFeatures.length === 1) {
    const singleFeatureName = selectedFeatures[0];
    const singleFeatureData = featureData[singleFeatureName];
    const areaPlotData = buildAreaPlotProps(singleFeatureData);
    const scatterPlotData = buildScatterPlotProps(singleFeatureData);
    return (
      <div className="feature-multi-graph-container">
        <div className="area-plot">
          <AreaPlot
            key="Title of area plot"
            xTitle={singleFeatureName}
            yTitle="Occurence"
            data={areaPlotData}
          />
        </div>
        <div className="scatter-plot">
          <ScatterPlot
            key="Title of scatter plot"
            xTitle="Order of appearance"
            yTitle={singleFeatureName}
            data={scatterPlotData}
          />
        </div>
        <div className="table-container">
          <Table {...buildTableProps([singleFeatureData])} />
        </div>
      </div>
    );
  }
  return <ProjectionGraph featureNames={selectedFeatures} />;
};
