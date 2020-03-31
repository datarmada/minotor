import {
  buildFeatureTableData,
  buildPhaseData,
  singleFeature2TableRow,
  singleInput2TableRow,
} from '../TableDataManagers';

it('singleFeature2TableRow should take a feature data and return an Object containing this data along with the feature name', () => {
  const featureStatistics = {
    prediction: {
      mean: 'mean1',
    },
  };
  expect(singleFeature2TableRow('feature_test', featureStatistics)).toEqual({
    featureName: 'feature_test',
    mean: 'mean1',
  });
});

it('buildFeatureTableData should take the raw data and return a data usable by the Table', () => {
  const featureStatistics = {
    feature1: {
      prediction: {
        1: 1,
      },
    },
    feature2: {
      prediction: {
        2: 2,
      },
    },
  };
  expect(buildFeatureTableData(featureStatistics)).toEqual([
    { featureName: 'feature1', 1: 1 },
    { featureName: 'feature2', 2: 2 },
  ]);
});

it('singleInput2Row should take raw data, the idx of the input and its collection phase and return a row for the table', () => {
  const featureStatistics = {
    feature1: {
      prediction: {
        values: [1, 2],
      },
    },
    feature2: {
      prediction: {
        values: [1, 2],
      },
    },
  };
  expect(singleInput2TableRow(1, featureStatistics, false)).toEqual({
    feature1: 2,
    feature2: 2,
  });
});

it('buildPhaseData should take raw data, the collection phase and the input Id we want and return the rows for the table', () => {
  const featureData = {
    features: {
      feature1: {
        prediction: {
          values: [1, 2],
        },
        training: {
          values: [3, 4],
        },
      },
      feature2: {
        prediction: {
          values: [1, 2],
        },
        training: {
          values: [3, 4],
        },
      },
    },
    valuesInfos: {
      prediction: {
        ids: ['id1', 'id2'],
      },
      training: {
        ids: ['tid1', 'tid2'],
      },
    },
  };
  expect(buildPhaseData(featureData, new Set(['id1']), false)).toEqual([
    { id: 'id1', phase: 'prediction', feature1: 1, feature2: 1 },
  ]);
  expect(buildPhaseData(featureData, new Set(['tid1']), true)).toEqual([
    { id: 'tid1', phase: 'training', feature1: 3, feature2: 3 },
  ]);
});
