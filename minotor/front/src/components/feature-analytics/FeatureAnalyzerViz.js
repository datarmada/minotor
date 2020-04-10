import { arrayOf, func, object, objectOf, string } from 'prop-types';
import React from 'react';

// Components
import ProjectionGraph from './ProjectionGraph';
import SingleFeatureAnalyzer from './SingleFeatureAnalyzer';

export default function FeatureAnalyzerViz(props) {
  const { featureData, onSelectedPoints, selectedFeatures } = props;
  if (selectedFeatures.length === 0) {
    return (
      <div className="no-feature">
        <div className="card-container">
          <div className="no-feature-selected card">
            <p>Click on one or several features to analyze them</p>
          </div>
        </div>
      </div>
    );
  }
  if (selectedFeatures.length === 1) {
    const singleFeatureName = selectedFeatures[0];
    const singleFeatureData = featureData.features[singleFeatureName];
    return (
      <SingleFeatureAnalyzer
        {...{
          singleFeatureData,
          singleFeatureName,
          valuesInfos: featureData.valuesInfos,
        }}
      />
    );
  }
  return (
    <div className="projection-graph-container card no-margin">
      <div className="clearfix">
        <ProjectionGraph
          featureNames={selectedFeatures}
          onSelectedPoints={onSelectedPoints}
        />
      </div>
    </div>
  );
}

FeatureAnalyzerViz.propTypes = {
  featureData: objectOf(object).isRequired,
  selectedFeatures: arrayOf(string),
  onSelectedPoints: func.isRequired,
};

FeatureAnalyzerViz.defaultProps = {
  selectedFeatures: [],
};
