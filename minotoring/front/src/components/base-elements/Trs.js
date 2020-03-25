import PropTypes, { string } from 'prop-types';
import React from 'react';

export default function Trs(props) {
  const { columns, mainCol, onRowClicked, rows } = props;
  return rows.map(row => (
    <tr key={row[mainCol]} onClick={onRowClicked}>
      {columns.map(col => (
        <td key={col}>{row[col]}</td>
      ))}
    </tr>
  ));
}

Trs.propTypes = {
  columns: PropTypes.arrayOf(string).isRequired,
  mainCol: PropTypes.string.isRequired,
  onRowClicked: PropTypes.func,
  rows: PropTypes.arrayOf(Object).isRequired,
};

Trs.defaultProps = {
  onRowClicked: null,
};
