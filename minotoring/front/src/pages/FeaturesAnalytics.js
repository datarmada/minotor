import React, { useState, useEffect } from 'react';
import ProjectionGraph from '../components/projection-graph/ProjectionGraph';
import DataFetcher from '../utils/data-managers/DataFetcher';
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
    const requestOptions = {
      method: 'GET',
    };
    const dataFetcher = DataFetcher(requestOptions, 'data', dataSetter);
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
      <ProjectionGraph features={Object.keys(featureData)} />
      <Table
        {...buildTableProps(featureData)}
        onTrClicked={onTrClicked}
        colFiltrable
      />
    </div>
  );
}
