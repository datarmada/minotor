import { buildHistProps } from '../ReactVisDataManager';

it('buildHistProps should take statistics of a feature and return props for an area plot', () => {
  const singleFeatureStatistics = {
    training: {
      hist: [
        [0, 1],
        [0, 1],
      ],
    },
    prediction: {},
  };
  expect(buildHistProps(singleFeatureStatistics)).toEqual([
    {
      data: [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
      ],
      name: 'Training Data',
      color: 'grey',
    },
  ]);
});
