import PropTypes, { string } from 'prop-types';
import React from 'react';

// Components
import ProjectionGraph from '../projection-graph/ProjectionGraph';
import SingleFeatureAnalyzer from './SingleFeatureAnalyzer';

export default function FeatureAnalyzerViz(props) {
  const { featureData, onSelectedPoints, selectedFeatures } = props;
  if (selectedFeatures.length === 0) {
    return (
      <div className="no-feature-selected">
        <p>Select one or several features to analyze them</p>
      </div>
    );
  }
  if (selectedFeatures.length === 1) {
    const singleFeatureName = selectedFeatures[0];
    const singleFeatureData = featureData.features[singleFeatureName];
    return (
      <SingleFeatureAnalyzer {...{ singleFeatureData, singleFeatureName }} />
    );
  }
  return (
    <ProjectionGraph
      featureNames={selectedFeatures}
      onSelectedPoints={onSelectedPoints}
    />
  );
}

FeatureAnalyzerViz.propTypes = {
  featureData: PropTypes.objectOf(Object).isRequired,
  selectedFeatures: PropTypes.arrayOf(string),
  onSelectedPoints: PropTypes.func.isRequired,
};

FeatureAnalyzerViz.defaultProps = {
  selectedFeatures: [],
};
