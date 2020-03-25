import PropTypes, { string } from 'prop-types';
import React from 'react';

export default function Ths(props) {
  const { columns, verboseColNames } = props;
  return (
    <tr>
      {columns.map(col => (
        <th key={col}>
          {verboseColNames && verboseColNames[col] ? verboseColNames[col] : col}
        </th>
      ))}
    </tr>
  );
}

Ths.propTypes = {
  columns: PropTypes.arrayOf(string).isRequired,
  verboseColNames: PropTypes.objectOf(string),
};

Ths.defaultProps = {
  verboseColNames: null,
};
