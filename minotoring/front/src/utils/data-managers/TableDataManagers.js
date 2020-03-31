import { mapObjectItems } from '../utils';
import { VERBOSE_COLUMN_NAMES } from '../constants';
//
// Functions to create a FeatureTable : Table with features as rows and statistics as columns
//

// Transform statistics of a feature into a table row
const singleFeature2TableRow = (featureName, featureStatistics) => ({
  featureName,
  ...featureStatistics.prediction,
});

// Build Table Data from the feature statistics
const buildFeatureTableData = featureStatistics =>
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
  verboseColNames: VERBOSE_COLUMN_NAMES,
});

//
// Functions to create an InputTable : Table with inputs as rows and features in column

// Transform values of an input into a table row
const singleInput2TableRow = (idx, featureStatistics) =>
  Object.entries(featureStatistics).reduce(
    (newObj, [featureName, singleFeatureStatistics]) => ({
      // TODO: Change parametrize this prediction
      [featureName]: singleFeatureStatistics.prediction.values[idx],
      ...newObj,
    }),
    {}
  );

const buildPhaseData = (featureData, selectedIds, phaseName) =>
  Object.values(featureData.features)[0][phaseName.toLowerCase()].values.reduce(
    (arr, _, idx) => {
      const id = featureData.valuesInfos[phaseName.toLowerCase()].ids[idx];
      return selectedIds.has(id)
        ? [
            {
              id,
              phase: phaseName,
              ...singleInput2TableRow(idx, featureData.features),
            },
            ...arr,
          ]
        : arr;
    },
    []
  );

const buildTableData = (featureData, selectedInputs) =>
  mapObjectItems(selectedInputs, (key, val) =>
    buildPhaseData(featureData, val, key)
  ).flat();

export const buildInputTableProps = (featureData, selectedInputs) => {
  return {
    data: buildTableData(featureData, selectedInputs),
    mainCol: 'id',
    orderedColumns: ['id', 'phase', ...Object.keys(featureData.features)],
    verboseColNames: {
      phase: 'Phase of collection',
    },
    notClickableCols: new Set(['phase']),
  };
};
