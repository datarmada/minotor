const createSingleInputData = (featureData, idx) =>
  Object.entries(featureData).reduce(
    (newObj, [featureName, singleFeatureData]) => ({
      [featureName]: singleFeatureData.predict.values[idx],
      ...newObj,
    }),
    {}
  );

const buildPredictionData = featureData =>
  Object.values(featureData)[0].predict.values.map((_, idx) => ({
    phase: 'Prediction',
    ...createSingleInputData(featureData, idx),
  }));

const buildTrainingData = featureData =>
  Object.values(featureData)[0].train.values.map((_, idx) => ({
    phase: 'Training',
    ...createSingleInputData(featureData, idx),
  }));

const buildTableData = featureData => [
  ...buildTrainingData(featureData),
  ...buildPredictionData(featureData),
];
const buildInputTableProps = featureData => {
  return {
    data: buildTableData(featureData),
    mainCol: 'phase',
    orderedColumns: ['phase', ...Object.keys(featureData)],
    verboseColNames: {
      phase: 'Phase of collection',
    },
  };
};

export default buildInputTableProps;
