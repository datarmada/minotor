import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { buildFeatureKLTableProps } from '../../utils/data-managers/FeatureDataManager';
// Components
import Table from '../base-elements/Table';
import FeatureAnalyzerViz from './FeatureAnalyzerViz';

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
    <div className="feature-analyzer" style={{ padding: '30px' }}>
      <Table
        {...buildFeatureKLTableProps(featureData.features)}
        onRowClicked={handleRowClicked}
      />
      <div className="projection-graph-container">
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
  featureData: PropTypes.objectOf(Object).isRequired,
  onSelectedPoints: PropTypes.func.isRequired,
};
