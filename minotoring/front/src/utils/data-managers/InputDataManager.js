const createSingleInputData = (featureData, idx) =>
  Object.entries(featureData).reduce(
    (newObj, [featureName, singleFeatureData]) => ({
      [featureName]: singleFeatureData.predict.values[idx],
      ...newObj,
    }),
    {}
  );

// TODO: To be refactored because these functions are duplicated
// (Train vs training must be uniformized at the API level)
const buildPredictionData = (featureData, selectedIds) =>
  Object.values(featureData.features)[0].predict.values.reduce(
    (arr, _, idx) => {
      const id = featureData.valuesInfos.prediction.ids[idx];
      return selectedIds.has(id)
        ? [
            {
              id,
              phase: 'Prediction',
              ...createSingleInputData(featureData.features, idx),
            },
            ...arr,
          ]
        : arr;
    },
    []
  );

const buildTrainingData = (featureData, selectedIds) =>
  Object.values(featureData.features)[0].train.values.reduce((arr, _, idx) => {
    const id = featureData.valuesInfos.training.ids[idx];
    return selectedIds.has(id)
      ? [
          {
            id,
            phase: 'Training',
            ...createSingleInputData(featureData.features, idx),
          },
          ...arr,
        ]
      : arr;
  }, []);

const buildTableData = (featureData, selectedInputs) => [
  ...buildTrainingData(featureData, selectedInputs.Training),
  ...buildPredictionData(featureData, selectedInputs.Prediction),
];
const buildInputTableProps = (featureData, selectedInputs) => {
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

export default buildInputTableProps;
