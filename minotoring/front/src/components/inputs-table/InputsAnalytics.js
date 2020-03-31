import { isEmpty } from 'lodash';
import PropTypes, { object } from 'prop-types';
import React, { useState } from 'react';
import { buildInputTableProps } from '../../utils/data-managers/TableDataManagers';
import SingleFeatureAnalyzer from '../analyzers/SingleFeatureAnalyzer';
import Table from '../base-elements/Table';

export default function InputsAnalytics(props) {
  const { featureData, selectedInputs } = props;
  const [selectedFeature, setSelectedFeature] = useState();
  const [hightlightedInput, setHighlightedInput] = useState();
  if (
    isEmpty(featureData) ||
    isEmpty(selectedInputs) ||
    (isEmpty(selectedInputs.Training) && isEmpty(selectedInputs.Prediction))
  ) {
    return null;
  }
  return (
    <div className="page">
      <h1>Inputs Analytics</h1>
      <Table
        {...buildInputTableProps(featureData, selectedInputs)}
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
      {selectedFeature ? (
        <SingleFeatureAnalyzer
          singleFeatureData={featureData.features[selectedFeature]}
          singleFeatureName={selectedFeature}
        />
      ) : null}
    </div>
  );
}

InputsAnalytics.propTypes = {
  featureData: PropTypes.shape({
    features: object,
    values_infos: object,
  }).isRequired,
  selectedInputs: PropTypes.shape({
    Training: PropTypes.instanceOf(Set),
    Prediction: PropTypes.instanceOf(Set),
  }).isRequired,
};
