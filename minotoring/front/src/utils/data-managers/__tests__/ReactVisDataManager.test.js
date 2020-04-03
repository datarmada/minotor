import {
  buildHistProps,
  getHighlightedValuesPerPhase,
} from '../ReactVisDataManager';

it('should take the highlighted ids and return the corresponding values', () => {
  const singleFeatureStatistics = {
    prediction: {
      values: { pid1: 1, pid2: 2, pid3: 3 },
    },
    training: {
      values: { tid1: 100, tid2: 200, tid3: 300 },
    },
  };

  const valuesInfos = {
    training: { ids: ['tid1', 'tid2', 'tid3'] },
    prediction: { ids: ['pid1', 'pid2', 'pid3'] },
    id2phase: {
      tid1: 'training',
      tid2: 'training',
      tid3: 'training',
      pid1: 'prediction',
      pid2: 'prediction',
      pid3: 'prediction',
    },
  };
  expect(
    getHighlightedValuesPerPhase(
      singleFeatureStatistics,
      valuesInfos,
      new Set(['tid1', 'tid2']),
      true
    )
  ).toEqual([
    { x: 100, id: 'tid1' },
    { x: 200, id: 'tid2' },
  ]);
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
      color: 'grey',
    },
  ]);
});
