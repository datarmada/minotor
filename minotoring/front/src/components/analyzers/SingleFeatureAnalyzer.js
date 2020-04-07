import { arrayOf, exact, instanceOf, number, shape, string } from 'prop-types';
import React from 'react';

// Components
import AreaPlot from '../react-vis/AreaPlot';
import ScatterPlot from '../react-vis/ScatterPlot';
import Table from '../base-elements/Table';

// Constants
import { FULL_ORDERED_COLUMNS } from '../../utils/constants';

// Data Managers
import {
  buildHistProps,
  buildScatterWithOutliersProps,
} from '../../utils/data-managers/ReactVisDataManager';
import { buildFeatureTableProps } from '../../utils/data-managers/TableDataManagers';

export default function SingleFeatureAnalyzer(props) {
  const {
    singleFeatureData,
    singleFeatureName,
    highlightedIds,
    valuesInfos,
  } = props;
  const areaPlotData = buildHistProps(
    singleFeatureData,
    valuesInfos,
    highlightedIds
  );
  const scatterPlotData = buildScatterWithOutliersProps(
    singleFeatureData,
    valuesInfos,
    highlightedIds
  );
  return (
    <div className="single-feature-analyzer">
      <div className="card no-margin">
        <AreaPlot
          key="Title of area plot"
          xTitle={singleFeatureName}
          yTitle="Occurence"
          data={areaPlotData}
          title="Distribution of the data for this feature"
        />
      </div>
      <div className="card no-margin">
        <ScatterPlot
          key="Title of scatter plot"
          xTitle="Order of appearance"
          yTitle={singleFeatureName}
          data={scatterPlotData}
          isCrosshair
          title="Data points for this feature"
        />
      </div>
      <div className="table-container card no-margin custom-scrollbar">
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
