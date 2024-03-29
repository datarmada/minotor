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
  if (singleFeatureData.type === 'other') {
    return (
      <div className="other-feature">
        <div className="card-container">
          <div className="card other-feature-selected">
            <p>
              Coming soon! Minotor does not have any graph for this kind of data
              for now. If you have any special request, do not hesitate to
              contact us at contact@datarmada.com
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="single-feature-analyzer">
      <div className="card no-margin area-plot">
        <AreaPlot
          key="Title of area plot"
          xTitle={singleFeatureName}
          yTitle="Occurence"
          data={areaPlotData}
          title={`Distribution of values for ${singleFeatureName}`}
        />
      </div>
      <div className="card no-margin scatter-plot">
        <ScatterPlot
          key="Title of scatter plot"
          xTitle="Order of appearance"
          yTitle={singleFeatureName}
          data={scatterPlotData}
          isCrosshair
          title="Data points"
        />
      </div>
      <div className="table-container card no-margin">
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
