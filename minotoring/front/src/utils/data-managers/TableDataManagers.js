import { mapValues } from 'lodash';
import { mapObjectItems, getPhaseKey } from '../utils';
//
// Functions to create a FeatureTable : Table with features as rows and statistics as columns
//

// Transform statistics of a feature into a table row
export const singleFeature2TableRow = (featureName, featureStatistics) => ({
  featureName,
  ...featureStatistics.prediction,
});

// Build Table Data from the feature statistics
export const buildFeatureTableData = featureStatistics =>
  mapObjectItems(featureStatistics, singleFeature2TableRow);

// Build Table props
export const buildFeatureTableProps = (
  featureStatistics,
  orderedColumns,
  mainCol = 'featureName'
) => ({
  data: buildFeatureTableData(featureStatistics),
  mainCol,
  orderedColumns,
});

//
// Functions to create an InputTable : Table with inputs as rows and features in column
//

// Transform values of an input into a table row
export const singleInput2TableRow = (idx, featureStatistics, isTraining) =>
  Object.entries(featureStatistics).reduce(
    (newObj, [featureName, singleFeatureStatistics]) => ({
      [featureName]:
        singleFeatureStatistics[getPhaseKey(isTraining)].values[idx],
      ...newObj,
    }),
    {}
  );

export const buildPhaseData = (featureData, selectedIds, isTraining) =>
  Object.values(featureData.features)[0][getPhaseKey(isTraining)].values.reduce(
    (arr, _, idx) => {
      const id = featureData.valuesInfos[getPhaseKey(isTraining)].ids[idx];
      return selectedIds.has(id)
        ? [
            {
              id,
              phase: getPhaseKey(isTraining),
              ...singleInput2TableRow(idx, featureData.features, isTraining),
            },
            ...arr,
          ]
        : arr;
    },
    []
  );

export const buildTableData = (featureData, selectedInputs) =>
  mapObjectItems(selectedInputs, (phaseName, selectedIds) =>
    buildPhaseData(featureData, selectedIds, phaseName === 'Training')
  ).flat();

export const buildInputTableProps = (featureData, selectedInputs) => ({
  data: buildTableData(featureData, selectedInputs),
  mainCol: 'id',
  orderedColumns: ['id', 'phase', ...Object.keys(featureData.features)],
  verboseColNames: {
    phase: 'Phase of collection',
  },
  notClickableCols: new Set(['phase']),
});

//
// Functions to create a Statistics table : statistic as rows and feature in columns
//

export const statisticToRow = (featureStatistics, statisticName, isTraining) =>
  mapValues(
    featureStatistics,
    singleFeatureStatistics =>
      singleFeatureStatistics[getPhaseKey(isTraining)][statisticName]
  );

export const buildStatisticsTableData = (featureStatistics, params) =>
  params.map(({ statisticName, isTraining }) => ({
    id: statisticName,
    phase: getPhaseKey(isTraining),
    ...statisticToRow(featureStatistics, statisticName, isTraining),
  }));

export const buildStatisticsTableProps = featureData => {
  const relevantStatistics = ['mean', 'std'];

  const params = relevantStatistics.reduce(
    (arr, val) => [
      { statisticName: val, isTraining: true },
      { statisticName: val, isTraining: false },
      ...arr,
    ],
    []
  );
  return {
    rows: buildStatisticsTableData(featureData.features, params),
    columns: ['id', 'phase', ...Object.keys(featureData.features)],
    mainCol: 'id',
  };
};
