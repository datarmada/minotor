import React, { useEffect, useState } from 'react';

import { getDataFetcher } from '../../utils/data-managers/DataFetcher';

// Components
import Table from '../base-elements/Table';

const dataSetter = async (response, setFeatureData) => {
  const data = await response.json();
  setFeatureData(data.features);
};

export default function FeatureAnalyzer(props) {
  const [featureData, setFeatureData] = useState({});

  useEffect(() => {
    const dataFetcher = getDataFetcher('data', dataSetter);
    dataFetcher(setFeatureData);
  }, []);

  return (
    <div className="feature-analyzet" style={{ padding: '30px' }}>
      <Table
        data={Object.keys(featureData).map(name => ({
          name,
          kl_divergence: featureData[name].predict.kl_divergence,
        }))}
        mainCol="name"
        onRowClicked={() => 1}
        orderedColumns={['name', 'kl_divergence']}
        isRowFiltrable
      />
    </div>
  );
}
