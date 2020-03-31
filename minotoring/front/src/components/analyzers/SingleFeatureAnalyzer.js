import { arrayOf, exact, instanceOf, number, shape, string } from 'prop-types';
import React from 'react';
// Data managers
import { buildFeatureTableProps } from '../../utils/data-managers/TableDataManagers';

import {
  buildScatterWithOutliersProps,
  buildHistProps,
} from '../../utils/data-managers/ReactVisDataManager';
// Components
import AreaPlot from '../react-vis/AreaPlot';
import ScatterPlot from '../react-vis/ScatterPlot';
import Table from '../base-elements/Table';
import { FULL_ORDERED_COLUMNS } from '../../utils/constants';

export default function SingleFeatureAnalyzer(props) {
  const {
    singleFeatureData,
    singleFeatureName,
    highlightedIds,
    valuesInfos,
  } = props;
  const areaPlotData = buildHistProps(singleFeatureData);
  const scatterPlotData = buildScatterWithOutliersProps(
    singleFeatureData,
    valuesInfos,
    highlightedIds
  );
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
          isCrosshair
        />
      </div>
      <div className="table-container">
        <Table
          {...buildFeatureTableProps(
            { [singleFeatureName]: singleFeatureData },
            FULL_ORDERED_COLUMNS
          )}
        />
      </div>
    </div>
  );
}

const BASE_FEATURE_PROPTYPES = {
  values: arrayOf(number),
  mean: number,
  std: number,
  hist: arrayOf(arrayOf(number), arrayOf(number)),
  nan_percentage: number,
  percentile_95: number,
  percentile_05: number,
  kl_divergence: number,
};

SingleFeatureAnalyzer.propTypes = {
  singleFeatureData: shape({
    train: exact(BASE_FEATURE_PROPTYPES),
    predict: exact(BASE_FEATURE_PROPTYPES),
  }).isRequired,
  singleFeatureName: string,
  highlightedIds: instanceOf(Set),
  valuesInfos: shape({
    training: shape({
      ids: arrayOf(string),
      dates: arrayOf(string),
    }),
    prediction: shape({
      ids: arrayOf(string),
      dates: arrayOf(string),
    }),
  }).isRequired,
};

SingleFeatureAnalyzer.defaultProps = {
  singleFeatureName: 'Feature',
  highlightedIds: new Set(),
};
