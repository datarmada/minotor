import { instanceOf, object, shape } from 'prop-types';
import React, { useState } from 'react';

import { isEmpty } from 'lodash';

// Components
import SingleFeatureAnalyzer from './SingleFeatureAnalyzer';
import Table from '../base-elements/Table';

// Data Managers
import SingleInputAnalyzer from './SingleInputAnalyzer';
import { buildInputTableProps } from '../../utils/data-managers/TableDataManagers';

export default function InputsAnalytics(props) {
  const { featureData, selectedInputs: selectedIds } = props;
  const [selectedFeature, setSelectedFeature] = useState();
  const [highlightedIds, setHighlightedIds] = useState(new Set());
  const [selectedRowId, setSelectedRowId] = useState();
  if (isEmpty(featureData) || isEmpty(selectedIds)) {
    return null;
  }
  
  return (
    <div className="card-container column">
      <div className="card">
        <Table
          {...buildInputTableProps(featureData, selectedIds)}
          onCellClicked={e => {
            setHighlightedIds(new Set([e.currentTarget.getAttribute('idrow')]));
            setSelectedFeature(e.currentTarget.getAttribute('idcol'));
            setSelectedRowId(null);
          }}
          onRowClicked={e => {
            setSelectedRowId(e.currentTarget.textContent);
            setSelectedFeature(null);
            setHighlightedIds(new Set());
          }}
          onColClicked={e => {
            setSelectedFeature(e.currentTarget.textContent);
            setHighlightedIds(new Set());
            setSelectedRowId(null);
          }}
        />
      </div>
      {selectedFeature ? (
        <div className="card-margin">
          <SingleFeatureAnalyzer
            singleFeatureData={featureData.features[selectedFeature]}
            singleFeatureName={selectedFeature}
            highlightedIds={highlightedIds}
            valuesInfos={featureData.valuesInfos}
          />
        </div>
      ) : null}
      <div className="card-margin">
        <SingleInputAnalyzer
          featureData={featureData}
          selectedId={selectedRowId}
        />
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
