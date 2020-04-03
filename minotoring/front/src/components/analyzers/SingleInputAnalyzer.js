import React from 'react';
import { shape, object, instanceOf, string } from 'prop-types';
import { isEmpty } from 'lodash';
import Table from '../base-elements/Table';
import { buildStatisticsTableProps } from '../../utils/data-managers/TableDataManagers';
import AreaPlot from '../react-vis/AreaPlot';
import { buildHistProps } from '../../utils/data-managers/ReactVisDataManager';

export default function SingleInputAnalyzer(props) {
  const { featureData, selectedId } = props;
  if (isEmpty(featureData) || !selectedId) {
    return null;
  }
  return (
    <div className="single-input-analyzer">
      <div className="no-margin custom-scrollbar card table-container">
        <Table {...buildStatisticsTableProps(featureData, selectedId)} />
      </div>
      <div className="graphs-grid">
        {Object.keys(featureData.features).map(singleFeatureName => {
          return (
            <div key={singleFeatureName} className="area-plot card no-margin">
              <AreaPlot
                xTitle={singleFeatureName}
                yTitle="Occurence"
                data={buildHistProps(
                  featureData.features[singleFeatureName],
                  featureData.valuesInfos,
                  new Set([selectedId])
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

SingleInputAnalyzer.propTypes = {
  featureData: shape({
    features: object,
    valuesInfos: object,
  }).isRequired,
  selectedId: string,
};

SingleInputAnalyzer.defaultProps = {
  selectedId: null,
};
