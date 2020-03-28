import PropTypes, { string } from 'prop-types';
import React from 'react';

export default function Ths(props) {
  const { columns, verboseColNames, onColClicked, colRefs } = props;
  return (
    <tr>
      {columns.map((col, idx) => (
        <th
          key={col}
          onClick={onColClicked}
          onMouseEnter={e => {
            onColClicked && colRefs[idx].current.classList.add('hovered');
            onColClicked && e.currentTarget.classList.add('hovered');
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
};

Ths.defaultProps = {
  verboseColNames: null,
  onColClicked: null,
};
