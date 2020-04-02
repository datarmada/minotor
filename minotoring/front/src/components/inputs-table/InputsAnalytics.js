import { instanceOf, object, shape } from 'prop-types';
import React, { useState } from 'react';

import { isEmpty } from 'lodash';

// Components
import SingleFeatureAnalyzer from '../analyzers/SingleFeatureAnalyzer';
import Table from '../base-elements/Table';

// Data Managers
import { buildInputTableProps } from '../../utils/data-managers/TableDataManagers';
import SingleInputAnalyzer from '../analyzers/SingleInputAnalyzer';

export default function InputsAnalytics(props) {
  const { featureData, selectedInputs } = props;
  const [selectedFeature, setSelectedFeature] = useState();
  const [highlightedIds, setHighlightedIds] = useState(new Set());
  return (
    <div className="page">
      <h1>Inputs Analytics</h1>
      <Table
        {...buildInputTableProps(featureData, selectedInputs)}
        onCellClicked={e => {
          setHighlightedIds(new Set([e.target.getAttribute('idrow')]));
          setSelectedFeature(e.target.getAttribute('idcol'));
        }}
        onRowClicked={() => {
          console.log('row');
        }}
        onColClicked={e => {
          setSelectedFeature(e.target.textContent);
        }}
      />
      {selectedFeature ? (
        <SingleFeatureAnalyzer
          singleFeatureData={featureData.features[selectedFeature]}
          singleFeatureName={selectedFeature}
          highlightedIds={highlightedIds}
          valuesInfos={featureData.valuesInfos}
        />
      ) : null}
      <SingleInputAnalyzer featureData={featureData} />
    </div>
  );
}

InputsAnalytics.propTypes = {
  featureData: shape({
    features: object,
    valuesInfos: object,
  }).isRequired,
  selectedInputs: shape({
    Training: instanceOf(Set),
    Prediction: instanceOf(Set),
  }).isRequired,
};
