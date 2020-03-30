import React, { useEffect, useState } from 'react';
import Table from '../components/base-elements/Table';
import ProjectionGraph from '../components/projection-graph/ProjectionGraph';
import { buildGetFetcher } from '../utils/data-managers/DataFetcher';
import { buildTableProps } from '../utils/data-managers/FeatureDataManager';

const dataSetter = async (response, setFeatureData) => {
  const data = await response.json();
  setFeatureData(data.features);
};

export default function FeaturesAnalytics() {
  const [featureData, setFeatureData] = useState({});

  useEffect(() => {
    const { fetchData, abortController } = buildGetFetcher('data', dataSetter);
    fetchData(setFeatureData);
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className="page">
      <h1>Features Analytics</h1>
      <ProjectionGraph
        width={600}
        height={400}
        featureNames={Object.keys(featureData)}
      />
      <Table {...buildTableProps(featureData)} isColFiltrable isRowFiltrable />
    </div>
  );
}
