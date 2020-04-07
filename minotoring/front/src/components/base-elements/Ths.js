import {
  arrayOf,
  exact,
  func,
  instanceOf,
  object,
  objectOf,
  string,
} from 'prop-types';
import React from 'react';
import HelpPopUp from './HelpPopUp';

// Utils
const isColClickable = (col, onColClicked, notClickableCols, mainCol) =>
  col !== mainCol && onColClicked && !notClickableCols.has(col);

export default function Ths(props) {
  const {
    columns,
    verboseColNames,
    onColClicked,
    colRefs,
    notClickableCols,
    mainCol,
    colHints,
  } = props;

  const isColClickableWrapped = col =>
    isColClickable(col, onColClicked, notClickableCols, mainCol);

  return (
    <tr>
      {columns.map((col, idx) => (
        <th
          key={col}
          onClick={isColClickableWrapped(col) ? onColClicked : null}
          onMouseEnter={e => {
            isColClickableWrapped(col) &&
              colRefs[idx].current.classList.add('hovered');
            isColClickableWrapped(col, idx) &&
              e.currentTarget.classList.add('hovered');
          }}
          onMouseLeave={e => {
            colRefs[idx].current.classList.remove('hovered');
            e.currentTarget.classList.remove('hovered');
          }}
        >
          <div className="th-content">
            {verboseColNames && verboseColNames[col]
              ? verboseColNames[col]
              : col}
            {colHints && colHints[col] ? (
              <HelpPopUp hint={colHints[col]} />
            ) : null}
          </div>
        </th>
      ))}
    </tr>
  );
}

Ths.propTypes = {
  colHints: objectOf(string),
  columns: arrayOf(string).isRequired,
  verboseColNames: objectOf(string),
  onColClicked: func,
  colRefs: arrayOf(
    exact({
      current: object,
    })
  ).isRequired,
  notClickableCols: instanceOf(Set),
  mainCol: string.isRequired,
};

Ths.defaultProps = {
  colHints: null,
  verboseColNames: null,
  onColClicked: null,
  notClickableCols: new Set(),
};
