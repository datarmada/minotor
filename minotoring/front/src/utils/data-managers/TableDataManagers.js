import { mapValues } from 'lodash';

import { getPhaseKey, mapObjectItems } from '../utils';
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
export const singleInput2TableRow = (id, featureStatistics, isTraining) =>
  Object.entries(featureStatistics).reduce(
    (newObj, [featureName, singleFeatureStatistics]) => ({
      [featureName]:
        singleFeatureStatistics[getPhaseKey(isTraining)].values[id],
      ...newObj,
    }),
    {}
  );

export const buildInputTableData = (featureData, selectedInputs) =>
  [...selectedInputs].map(id => ({
    id,
    phase: featureData.valuesInfos.id2phase[id],
    ...singleInput2TableRow(
      id,
      featureData.features,
      featureData.valuesInfos.id2phase[id]
    ),
  }));

export const buildInputTableProps = (featureData, selectedInputs) => {
  return {
    data: buildInputTableData(featureData, selectedInputs),
    mainCol: 'id',
    orderedColumns: ['id', 'phase', ...Object.keys(featureData.features)],
    verboseColNames: {
      phase: 'Phase of collection',
    },
    notClickableCols: new Set(['phase']),
  };
};

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
    statistic: statisticName,
    phase: getPhaseKey(isTraining),
    ...statisticToRow(featureStatistics, statisticName, isTraining),
  }));

export const buildStatisticsTableProps = (featureData, selectedId) => {
  const relevantStatistics = ['mean', 'std'];
  const isTraining =
    featureData.valuesInfos.id2phase[selectedId] === 'training';
  const params = relevantStatistics.reduce(
    (arr, val) => [...arr, { statisticName: val, isTraining }],
    []
  );
  const inputRow = singleInput2TableRow(
    selectedId,
    featureData.features,
    isTraining
  );
  inputRow.statistic = selectedId;
  return {
    data: [inputRow, ...buildStatisticsTableData(featureData.features, params)],
    orderedColumns: ['statistic', ...Object.keys(featureData.features)],
    mainCol: 'statistic',
  };
};
