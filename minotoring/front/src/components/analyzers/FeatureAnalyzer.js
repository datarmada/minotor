import { object, shape, func } from 'prop-types';
import React, { useState } from 'react';

import { isEmpty } from 'lodash';

// Components
import FeatureAnalyzerViz from './FeatureAnalyzerViz';
import Table from '../base-elements/Table';

// Data Managers
import { buildFeatureTableProps } from '../../utils/data-managers/TableDataManagers';

// Utils
const toggleSelectedFeature = (feature, selectedFeatures) =>
  selectedFeatures.includes(feature)
    ? selectedFeatures.filter(f => f !== feature)
    : [...selectedFeatures, feature];

export default function FeatureAnalyzer(props) {
  const { featureData, onSelectedPoints } = props;
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  if (isEmpty(featureData)) {
    return null;
  }

  // Event functions
  const handleRowClicked = e => {
    const tr = e.currentTarget.parentElement;
    tr.classList.toggle('selected');
    const feature = tr.firstChild.innerText;
    const newFeatures = toggleSelectedFeature(feature, selectedFeatures);
    setSelectedFeatures(newFeatures);
  };

  return (
    <div className="feature-analyzer card-container">
      <div className="card table">
        <Table
          {...buildFeatureTableProps(featureData.features, [
            'featureName',
            'KLDivergence',
          ])}
          isRowFiltrable
          onRowClicked={handleRowClicked}
          rowDropdownName="Select features"
        />
      </div>
      <div className="feature-analyzer-viz-container card-margin">
        <FeatureAnalyzerViz
          {...{
            featureData,
            selectedFeatures,
            onSelectedPoints,
          }}
        />
      </div>
    </div>
  );
}

FeatureAnalyzer.propTypes = {
  featureData: shape({
    features: object,
    values_infos: object,
  }).isRequired,
  onSelectedPoints: func.isRequired,
};
