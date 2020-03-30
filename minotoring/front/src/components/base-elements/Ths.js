import PropTypes, { string } from 'prop-types';
import React from 'react';

const isColClickable = (col, idx, onColClicked, colNotClickable) =>
  idx > 0 && onColClicked && !colNotClickable.has(col);
export default function Ths(props) {
  const {
    columns,
    verboseColNames,
    onColClicked,
    colRefs,
    colNotClickable,
  } = props;

  const isColClickableWrapped = (col, idx) =>
    isColClickable(col, idx, onColClicked, colNotClickable);
  console.log(colNotClickable);
  return (
    <tr>
      {columns.map((col, idx) => (
        <th
          key={col}
          onClick={isColClickableWrapped(col, idx) ? onColClicked : null}
          onMouseEnter={e => {
            isColClickableWrapped(col, idx) &&
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
  colNotClickable: PropTypes.instanceOf(Set),
};

Ths.defaultProps = {
  verboseColNames: null,
  onColClicked: null,
  colNotClickable: new Set(),
};
