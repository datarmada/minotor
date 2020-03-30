import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { buildGetFetcher } from '../../utils/data-managers/DataFetcher';
import buildInputTableProps from '../../utils/data-managers/InputDataManager';
import Table from '../base-elements/Table';
import SingleFeatureAnalyzer from '../analyzers/SingleFeatureAnalyzer';

const dataSetter = async (response, setFeatureData) => {
  const data = await response.json();
  setFeatureData(data);
};

export default function InputsAnalytics() {
  const [featureData, setFeatureData] = useState({});
  const [selectedFeature, setSelectedFeature] = useState();
  const [hightlightedInput, setHighlightedInput] = useState();
  useEffect(() => {
    const { fetchData, abortController } = buildGetFetcher('data', dataSetter);
    fetchData(setFeatureData);
    return () => {
      abortController.abort();
    };
  }, []);
  if (isEmpty(featureData)) {
    return null;
  }
  return (
    <div className="page">
      <h1>Inputs Analytics</h1>
      {selectedFeature ? (
        <SingleFeatureAnalyzer
          singleFeatureData={featureData.features[selectedFeature]}
          singleFeatureName={selectedFeature}
        />
      ) : null}
      <Table
        {...buildInputTableProps(featureData)}
        onCellClicked={e => {
          setHighlightedInput(e.target.getAttribute('idrow'));
        }}
        onRowClicked={() => {
          console.log('row');
        }}
        onColClicked={e => {
          setSelectedFeature(e.target.textContent);
        }}
      />
    </div>
  );
}
