import { shape, object, string } from 'prop-types';
import React from 'react';

import { isEmpty } from 'lodash';

// Components
import AreaPlot from '../react-vis/AreaPlot';
import Table from '../base-elements/Table';

// Data Managers
import { buildHistProps } from '../../utils/data-managers/ReactVisDataManager';
import { buildStatisticsTableProps } from '../../utils/data-managers/TableDataManagers';

export default function SingleInputAnalyzer(props) {
  const { featureData, selectedId } = props;
  if (isEmpty(featureData) || !selectedId) {
    return null;
  }
  return (
    <div className="single-input-analyzer">
      <div className="no-margin card table-container">
        <Table {...buildStatisticsTableProps(featureData, selectedId)} />
      </div>
      <div className="graphs-grid">
        {Object.keys(featureData.features).map(singleFeatureName => {
          return featureData.features[singleFeatureName].type === 'other' ? (
            <div className="other-feature area-plot card no-margin">
              <div className="other-feature-selected">
                <p>
                  Coming soon! Minotor does not have any graph for the kind of
                  data of <b>{singleFeatureName}</b> for now. If you have any
                  special request, do not hesitate to contact us at
                  contact@datarmada.com
                </p>
              </div>
            </div>
          ) : (
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
