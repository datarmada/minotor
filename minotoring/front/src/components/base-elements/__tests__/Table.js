import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import { buildTds, buildThs, buildTrs } from '../Table.js';

// Constants
// const onTrClicked = jest.fn();
const TABLE_PROPS = {
  // onTrClicked,
  orderedKeys: ['featureName', 'mean', 'std', 'nb_nan'],
  verboseKeyNames: {
    featureName: 'Name of the features',
    mean: 'Mean',
    std: 'Standard Deviation',
    nb_nan: 'Number of NaN',
  },
  data: [
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
  ],
};

// let container = null;
// let table = null;
// beforeEach(() => {
//   // setup a DOM element as a render target
//   container = document.createElement('div');
//   // container *must* be attached to document so events work correctly.
//   document.body.appendChild(container);
//   table = <Table {...TABLE_PROPS} />;
//   render(table, container);
// });
//
// afterEach(() => {
//   // cleanup on exiting
//   unmountComponentAtNode(container);
//   container.remove();
//   container = null;
// });

// buildTds
it('returns a list of <td> elements based on an object and a list of keys', () => {
  expect(buildThs(TABLE_PROPS.orderedKeys, TABLE_PROPS.verboseKeyNames)).toBe(
    <tr>
      <th>Name of the features</th>
      <th>Mean</th>
      <th>Standard Deviation</th>
      <th>Number of NaN</th>
    </tr>,
  );
});
