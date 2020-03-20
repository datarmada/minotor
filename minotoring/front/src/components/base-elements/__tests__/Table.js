/* eslint-disable no-undef */
import React from 'react';
import { renderToStaticMarkup as rsm } from 'react-dom/server';

import { buildThs, buildTrs } from '../Table';

// Constants

const onTrClicked = () => 1;
const orderedKeys = ['featureName', 'mean', 'std', 'nb_nan'];
const verboseKeyNames = {
  featureName: 'Name of the features',
  mean: 'Mean',
  std: 'Standard Deviation',
  nb_nan: 'Number of NaN',
};
const data = [
  {
    featureName: 'size',
    mean: 0.56,
    std: 0.56,
    nb_nan: 0.56,
  },
  {
    featureName: 'weight',
    mean: 0.56,
    std: 0.56,
    nb_nan: 0.56,
  },
  {
    featureName: 'age',
    mean: 0.56,
    std: 0.56,
    nb_nan: 0.56,
  },
];

//
// buildTds
//
it('buildTds returns a <tr> of <th> elements filled with a verbose names when given \
  keys and names', () => {
  expect(rsm(buildThs(orderedKeys, verboseKeyNames))).toBe(
    rsm(
      <tr>
        <th>Name of the features</th>
        <th>Mean</th>
        <th>Standard Deviation</th>
        <th>Number of NaN</th>
      </tr>
    )
  );
});

it('buildTds returns a <tr> of <th> elements filled with keys when keys are passed \
  without their verbose names', () => {
  expect(rsm(buildThs(orderedKeys))).toBe(
    rsm(
      <tr>
        <th>featureName</th>
        <th>mean</th>
        <th>std</th>
        <th>nb_nan</th>
      </tr>
    )
  );
});

//
// buildTrs
//
it('buildTrs returns multiple <tr> elements each filled with <td> elements containing \
  row[key] when given rows, keys and a function', () => {
  expect(rsm(buildTrs(data, orderedKeys, onTrClicked))).toBe(
    rsm(
      <>
        <tr>
          <td>size</td>
          <td>0.56</td>
          <td>0.56</td>
          <td>0.56</td>
        </tr>
        <tr>
          <td>weight</td>
          <td>0.56</td>
          <td>0.56</td>
          <td>0.56</td>
        </tr>
        <tr>
          <td>age</td>
          <td>0.56</td>
          <td>0.56</td>
          <td>0.56</td>
        </tr>
      </>
    )
  );
});

it('<tr> elements rendered by buildTrs each have a callable onClick prop', () => {
  const trs = buildTrs(data, orderedKeys, onTrClicked);
  trs.map(tr => {
    expect(tr.props.onClick()).toBe(1);
  });
});
