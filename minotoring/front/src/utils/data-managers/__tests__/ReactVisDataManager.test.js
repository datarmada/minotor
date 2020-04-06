import {
  buildHistProps,
  getHighlightedValuesPerPhase,
} from '../ReactVisDataManager';

it('should take the highlighted ids and return the corresponding values', () => {
  const singleFeatureStatistics = {
    prediction: {
      values: [1, 2, 3],
    },
    training: {
      values: [100, 200, 300],
    },
  };

  const valuesInfos = {
    training: { ids: ['tid1', 'tid2', 'tid3'] },
    prediction: { ids: ['pid1', 'pid2', 'pid3'] },
  };
  expect(
    getHighlightedValuesPerPhase(
      singleFeatureStatistics,
      valuesInfos,
      new Set(['tid1', 'tid2']),
      true
    )
  ).toEqual([
    { x: 100, isTraining: true, id: 'tid1' },
    { x: 200, isTraining: true, id: 'tid2' },
  ]);
  expect(
    getHighlightedValuesPerPhase(
      singleFeatureStatistics,
      valuesInfos,
      new Set(['tid1', 'tid2']),
      false
    )
  ).toEqual([]);
});

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
      color: 'var(--charts-flat-color)',
      style: {
        stroke: 'var(--charts-flat-color)',
        strokeWidth: 2,
        fillOpacity: 0.2,
      },
    },
  ]);
});
