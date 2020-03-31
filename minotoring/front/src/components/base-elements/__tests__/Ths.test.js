import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Ths from '../Ths';

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  const thead = document.createElement('table');
  container = document.createElement('thead');
  document.body.appendChild(thead).appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('Rendering clickable Ths', () => {
  let counter = 0;
  act(() => {
    render(
      <Ths
        columns={['col1', 'col2']}
        onColClicked={() => {
          counter += 1;
        }}
        colRefs={[]}
        mainCol="col1"
      />,
      container
    );
  });
  const cols = document.querySelectorAll('th');
  act(() => {
    cols[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(counter).toEqual(0);
  expect(cols[0].textContent).toBe('col1');
  act(() => {
    cols[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(counter).toEqual(1);
  expect(cols[1].textContent).toBe('col2');
});

it('Rendering some clickable cols', () => {
  let counter = 0;
  act(() => {
    render(
      <Ths
        columns={['col1', 'col2']}
        onColClicked={() => {
          counter += 1;
        }}
        colRefs={[]}
        notClickableCols={new Set(['col2'])}
        mainCol="col1"
      />,
      container
    );
  });
  const cols = document.querySelectorAll('th');
  act(() => {
    cols[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(counter).toEqual(0);
  act(() => {
    cols[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(counter).toEqual(0);
});
