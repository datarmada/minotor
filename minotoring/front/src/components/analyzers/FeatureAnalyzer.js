import React, { useEffect, useState } from 'react';

// Data managers
import { getDataFetcher } from '../../utils/data-managers/DataFetcher';
import { buildFeatureKLTableProps } from '../../utils/data-managers/FeatureDataManager';

// Components
import Table from '../base-elements/Table';
import FeatureAnalyzerViz from './FeatureAnalyzerViz';

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
        {...buildFeatureKLTableProps(featureData)}
        onRowClicked={handleRowClicked}
      />
      <div className="projection-graph-container">
        <FeatureAnalyzerViz {...{ featureData, selectedFeatures }} />
      </div>
    </div>
  );
}
