import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

// Components
import Trs from '../Trs';

// Globals
let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  const thead = document.createElement('table');
  container = document.createElement('tbody');
  document.body.appendChild(thead).appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('Rendering non clickable rows', () => {
  act(() => {
    render(
      <Trs
        columns={['col1', 'col2']}
        mainCol="col1"
        rows={[{ col1: 1, col2: 2 }]}
      />,
      container
    );
  });
  const tds = document.querySelectorAll('td');
  expect(tds[0].textContent).toBe('1.00');
  expect(tds[1].textContent).toBe('2.00');
});

it('Rendering clickable rows', () => {
  let counter = 0;
  act(() => {
    render(
      <Trs
        columns={['col1', 'col2']}
        mainCol="col1"
        rows={[{ col1: 1, col2: 2 }]}
        onRowClicked={() => {
          counter += 1;
        }}
      />,
      container
    );
  });
  const tds = document.querySelectorAll('td');
  act(() => {
    tds[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(counter).toEqual(1);
  act(() => {
    tds[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(counter).toEqual(1);
});

it('Rendering clickable cells', () => {
  let counter = 0;
  act(() => {
    render(
      <Trs
        columns={['col1', 'col2']}
        mainCol="col1"
        rows={[{ col1: 1, col2: 2 }]}
        onCellClicked={() => {
          counter += 1;
        }}
      />,
      container
    );
  });
  const tds = document.querySelectorAll('td');
  act(() => {
    tds[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(counter).toEqual(0);
  act(() => {
    tds[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(counter).toEqual(1);
});

it('Rendering clickable cells and rows', () => {
  let counter = 0;
  act(() => {
    render(
      <Trs
        columns={['col1', 'col2']}
        mainCol="col1"
        rows={[{ col1: 1, col2: 2 }]}
        onCellClicked={() => {
          counter += 2;
        }}
        onRowClicked={() => {
          counter += 1;
        }}
      />,
      container
    );
  });
  const tds = document.querySelectorAll('td');
  act(() => {
    tds[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(counter).toEqual(1);
  act(() => {
    tds[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(counter).toEqual(3);
});

it('Rendering non clickable cols', () => {
  let counter = 0;
  act(() => {
    render(
      <Trs
        columns={['col1', 'col2']}
        mainCol="col1"
        rows={[{ col1: 1, col2: 2 }]}
        onCellClicked={() => {
          counter += 1;
        }}
        notClickableCols={new Set(['col2'])}
      />,
      container
    );
  });
  const tds = document.querySelectorAll('td');
  act(() => {
    tds[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(counter).toEqual(0);
});
