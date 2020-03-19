import {
  buildTableProps,
  mapObjectItems,
  buildTableData,
  singleFeature2TableRow,
} from '../FeatureDataManager';

it('mapObjectItems applies a function to each (key, value) of the object', () => {
  expect(mapObjectItems({ test1: 'test1', test2: 'test2' }, (key, val) => key)).toEqual([
    'test1',
    'test2',
  ]);
});

it('singleFeature2TableRow should take a feature data and return containing this \
  data along with the feature name', () => {
  const featureData = {
    predict: {
      mean: 'mean1',
    },
  };
  expect(singleFeature2TableRow('feature_test', featureData)).toEqual({
    featureName: 'feature_test',
    mean: 'mean1',
  });
});

it('buildTableData should take the raw data and return a data usable by the Table', () => {
  const featureData = {
    feature1: {
      predict: {
        1: 1,
      },
    },
    feature2: {
      predict: {
        2: 2,
      },
    },
  };
  expect(buildTableData(featureData)).toEqual([
    { featureName: 'feature1', 1: 1 },
    { featureName: 'feature2', 2: 2 },
  ]);
});
