import PropTypes, { string } from 'prop-types';
import React from 'react';

// PropTypes
import VERBOSE_COL_NAMES_PROPTYPE from './PropTypes/Table';

export default function Ths({ columns, verboseColNames }) {
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
  verboseColNames: VERBOSE_COL_NAMES_PROPTYPE,
};

Ths.defaultProps = {
  verboseColNames: null,
};
