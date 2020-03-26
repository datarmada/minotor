import { mapObjectItems } from './FeatureDataManager';

const buildTableData = featureData => {
  const result = [];
  const buildData = (featureName, singlefeatureData) => {
    singlefeatureData.predict.values.map((val, idx) => {
      if (!result[idx]) {
        result[idx] = { inputIdx: idx };
      }
      result[idx][featureName] = val;
    });
  };
  mapObjectItems(featureData, buildData);
  return result;
};

const buildInputTableProps = featureData => {
  return {
    data: buildTableData(featureData),
    mainCol: 'inputIdx',
    orderedColumns: ['inputIdx', ...Object.keys(featureData)],
    verboseColNames: {
      inputIdx: 'Inputs',
    },
  };
};

export default buildInputTableProps;
