import { instanceOf, object, shape } from 'prop-types';
import React, { useState } from 'react';

import { isEmpty } from 'lodash';

// Components
import SingleFeatureAnalyzer from '../analyzers/SingleFeatureAnalyzer';
import Table from '../base-elements/Table';

// Data Managers
import { buildInputTableProps } from '../../utils/data-managers/TableDataManagers';

export default function InputsAnalytics(props) {
  const { featureData, selectedInputs } = props;
  const [selectedFeature, setSelectedFeature] = useState();
  const [highlightedIds, setHighlightedIds] = useState(new Set());
  if (
    isEmpty(featureData) ||
    isEmpty(selectedInputs) ||
    (isEmpty(selectedInputs.Training) && isEmpty(selectedInputs.Prediction))
  ) {
    return null;
  }
  return (
    <div>
      <h1>Inputs Analytics</h1>
      <div className="card-container">
        <div className="card">
          <Table
            className="card"
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
        </div>
        {selectedFeature ? (
          <SingleFeatureAnalyzer
            singleFeatureData={featureData.features[selectedFeature]}
            singleFeatureName={selectedFeature}
            highlightedIds={highlightedIds}
            valuesInfos={featureData.valuesInfos}
          />
        ) : null}
      </div>
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
