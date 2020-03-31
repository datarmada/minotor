import PropTypes, { string } from 'prop-types';
import React from 'react';

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
          {verboseColNames && verboseColNames[col] ? verboseColNames[col] : col}
        </th>
      ))}
    </tr>
  );
}

Ths.propTypes = {
  columns: PropTypes.arrayOf(string).isRequired,
  verboseColNames: PropTypes.objectOf(string),
  onColClicked: PropTypes.func,
  colRefs: PropTypes.arrayOf(
    PropTypes.exact({
      current: PropTypes.object,
    })
  ).isRequired,
  notClickableCols: PropTypes.instanceOf(Set),
  mainCol: string.isRequired,
};

Ths.defaultProps = {
  verboseColNames: null,
  onColClicked: null,
  notClickableCols: new Set(),
};
