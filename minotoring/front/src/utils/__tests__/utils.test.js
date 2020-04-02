import {
  hist2reactVisData,
  mapObjectItems,
  partitionWithThresholds,
  values2reactVisData,
  getClosestIndex,
} from '../utils';

it('mapObjectItems takes an object and map (key,val) to a function', () => {
  expect(
    mapObjectItems({ test1: 'test1', test2: 'test2' }, (key, val) => [key, val])
  ).toEqual([
    ['test1', 'test1'],
    ['test2', 'test2'],
  ]);
});

it('partitionWithThresholds splits the data between regular points and outliers (points above or below the thresholds', () => {
  expect(
    partitionWithThresholds(
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 0, y: 3 },
        { x: 0, y: 4 },
      ],
      3,
      1
    )
  ).toEqual([
    [
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 },
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 4 },
    ],
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
