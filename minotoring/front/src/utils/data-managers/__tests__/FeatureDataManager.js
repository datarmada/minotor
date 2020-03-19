import {
  buildTableData,
  buildTableProps,
  hist2reactVisData,
  mapObjectItems,
  singleFeature2TableRow,
  values2reactVisData,
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

it('hist2reactVisData takes feature hist attribute and returns legit react-vis data', () => {
  const hist = [
    [1, 2, 3],
    [0.1, 0.2, 0.3],
  ];
  expect(hist2reactVisData(hist)).toEqual([
    { x: 0.1, y: 1 },
    { x: 0.2, y: 2 },
    { x: 0.3, y: 3 },
  ]);
});

it('values2reactVisData takes feature values attribute and returns legit react-vis data', () => {
  const values = [42, 43, 44];
  expect(values2reactVisData(values)).toEqual([
    { x: 0, y: 42 },
    { x: 1, y: 43 },
    { x: 2, y: 44 },
  ]);
});
