import React, { useState, useEffect } from 'react';
import ProjectionGraph from '../components/projection-graph/ProjectionGraph';
import { getDataFetcher } from '../utils/data-managers/DataFetcher';
import Table from '../components/base-elements/Table';
import { buildTableProps } from '../utils/data-managers/FeatureDataManager';

const dataSetter = async (response, setFeatureData) => {
  const data = await response.json();
  setFeatureData(data.features);
};

export default function FeaturesAnalytics() {
  const [activeFeature, setActiveFeature] = useState();
  const [featureData, setFeatureData] = useState({});

  useEffect(() => {
    const dataFetcher = getDataFetcher('data', dataSetter);
    dataFetcher(setFeatureData);
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
      <ProjectionGraph featureNames={Object.keys(featureData)} />
      <Table
        {...buildTableProps(featureData)}
        onRowClicked={onTrClicked}
        isColFiltrable
        isRowFiltrable
      />
    </div>
  );
}
