const createSingleInputData = (featureData, idx) =>
  Object.entries(featureData).reduce(
    (newObj, [featureName, singleFeatureData]) => ({
      [featureName]: singleFeatureData.predict.values[idx],
      ...newObj,
    }),
    {}
  );

const buildPredictionData = featureData =>
  Object.values(featureData.features)[0].predict.values.map((_, idx) => ({
    id: featureData.valuesInfos.prediction.ids[idx],
    phase: 'Prediction',
    ...createSingleInputData(featureData.features, idx),
  }));

const buildTrainingData = featureData =>
  Object.values(featureData.features)[0].train.values.map((_, idx) => ({
    id: featureData.valuesInfos.training.ids[idx],
    phase: 'Training',
    ...createSingleInputData(featureData.features, idx),
  }));

const buildTableData = featureData => [
  ...buildTrainingData(featureData),
  ...buildPredictionData(featureData),
];
const buildInputTableProps = featureData => {
  return {
    data: buildTableData(featureData),
    mainCol: 'id',
    orderedColumns: ['id', 'phase', ...Object.keys(featureData.features)],
    verboseColNames: {
      phase: 'Phase of collection',
    },
    colNotClickable: new Set(['phase']),
  };
};

export default buildInputTableProps;
