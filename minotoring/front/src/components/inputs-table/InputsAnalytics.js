import React, { useEffect, useState } from 'react';
import { getDataFetcher } from '../../utils/data-managers/DataFetcher';
import { buildTableProps } from '../../utils/data-managers/FeatureDataManager';
import Table from '../base-elements/Table';

const dataSetter = async (response, setFeatureData) => {
  const data = await response.json();
  setFeatureData(data.features);
};

export default function InputsAnalytics() {
  const [featureData, setFeatureData] = useState({});

  useEffect(() => {
    const dataFetcher = getDataFetcher('data', dataSetter);
    dataFetcher(setFeatureData);
  }, []);

  return (
    <div>
      <h1>Inputs Analytics</h1>
      <Table
        {...buildTableProps(featureData)}
        onCellClicked={() => {
          console.log('cell');
        }}
        onRowClicked={() => {
          console.log('row');
        }}
        onColClicked={() => {
          console.log('col');
        }}
      />
    </div>
  );
}
