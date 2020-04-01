import PropTypes, { object } from 'prop-types';
import React, { useState } from 'react';
import { isEmpty } from 'lodash';

// Components
import SingleFeatureAnalyzer from '../analyzers/SingleFeatureAnalyzer';
import Table from '../base-elements/Table';
import Trs from '../base-elements/Trs';

// Data Managers
import {
  buildInputTableProps,
  buildStatisticsTableProps,
} from '../../utils/data-managers/TableDataManagers';

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
    <div className="page">
      <h1>Inputs Analytics</h1>
      <Table
        {...buildInputTableProps(featureData, selectedInputs)}
        onCellClicked={e => {
          setHighlightedIds(new Set([e.target.getAttribute('idrow')]));
          setSelectedFeature(e.target.getAttribute('idcol'));
        }}
        onColClicked={e => {
          setSelectedFeature(e.target.textContent);
        }}
        additionalRow={<Trs {...buildStatisticsTableProps(featureData)} />}
      />
      {selectedFeature ? (
        <SingleFeatureAnalyzer
          singleFeatureData={featureData.features[selectedFeature]}
          singleFeatureName={selectedFeature}
          highlightedIds={highlightedIds}
          valuesInfos={featureData.valuesInfos}
        />
      ) : null}
    </div>
  );
}

InputsAnalytics.propTypes = {
  featureData: PropTypes.shape({
    features: object,
    valuesInfos: object,
  }).isRequired,
  selectedInputs: PropTypes.shape({
    Training: PropTypes.instanceOf(Set),
    Prediction: PropTypes.instanceOf(Set),
  }).isRequired,
};
