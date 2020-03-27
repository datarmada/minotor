import PropTypes, { string } from 'prop-types';
import React from 'react';

// Data managers
import {
  buildAreaPlotProps,
  buildScatterPlotProps,
  buildTableProps,
} from '../../utils/data-managers/FeatureDataManager';

// Components
import AreaPlot from '../react-vis/AreaPlot';
import ProjectionGraph from '../projection-graph/ProjectionGraph';
import ScatterPlot from '../react-vis/ScatterPlot';
import Table from '../base-elements/Table';

export default function FeatureAnalyzerViz(props) {
  const { featureData, selectedFeatures } = props;
  if (selectedFeatures.length === 0) {
    return (
      <div className="no-feature-selected">
        <p>Select one or several features to analyze them</p>
      </div>
    );
  }
  if (selectedFeatures.length === 1) {
    const singleFeatureName = selectedFeatures[0];
    const singleFeatureData = featureData[singleFeatureName];
    const areaPlotData = buildAreaPlotProps(singleFeatureData);
    const scatterPlotData = buildScatterPlotProps(singleFeatureData);
    return (
      <div className="feature-multi-graph-container">
        <div className="area-plot">
          <AreaPlot
            key="Title of area plot"
            xTitle={singleFeatureName}
            yTitle="Occurence"
            data={areaPlotData}
          />
        </div>
        <div className="scatter-plot">
          <ScatterPlot
            key="Title of scatter plot"
            xTitle="Order of appearance"
            yTitle={singleFeatureName}
            data={scatterPlotData}
          />
        </div>
        <div className="table-container">
          <Table {...buildTableProps([singleFeatureData])} />
        </div>
      </div>
    );
  }
  return <ProjectionGraph featureNames={selectedFeatures} />;
}

FeatureAnalyzerViz.propTypes = {
  featureData: PropTypes.arrayOf(Object).isRequired,
  selectedFeatures: PropTypes.arrayOf(string),
};

FeatureAnalyzerViz.defaultProps = {
  selectedFeatures: [],
};
