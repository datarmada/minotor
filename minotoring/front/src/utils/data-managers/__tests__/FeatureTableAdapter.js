import buildTableProps, {
  transformData,
  transformSingleFeature,
  mapObjectItems
} from '../FeatureTableAdapter';

it('mapObjectItems applies a function to each (key, value) of the object', () => {
  expect(
    mapObjectItems({ test1: 'test1', test2: 'test2' }, (key, val) => key)
  ).toEqual(['test1', 'test2']);
});

const featureData = {
  predict: {
    mean: 'mean1'
  }
};

it('transformSingleFeature should take a feature data and return containing this data along with the feature name', () => {
  expect(transformSingleFeature('feature_test', featureData)).toEqual({
    featureName: 'feature_test',
    mean: 'mean1'
  });
});

const rawData = {
  feature1: {
    predict: {
      1: 1
    }
  },
  feature2: {
    predict: {
      2: 2
    }
  }
};

it('transformData should take the raw data and return a data usable by the Table', () => {
  expect(transformData(rawData)).toEqual([
    { featureName: 'feature1', 1: 1 },
    { featureName: 'feature2', 2: 2 }
  ]);
});
