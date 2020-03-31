import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Table from '../Table';

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('Basic rendering of a Table', () => {
  const data = [{ feature1: 1, feature2: 2 }];
  const orderedColumns = ['feature1', 'feature2'];
  act(() => {
    render(<Table data={data} orderedColumns={orderedColumns} />, container);
  });

  const ths = document.querySelectorAll('th');
  expect(ths[0].textContent).toBe('feature1');
  expect(ths[1].textContent).toBe('feature2');

  const tds = document.querySelectorAll('td');
  expect(tds[0].textContent).toBe('1');
  expect(tds[1].textContent).toBe('2');
});
