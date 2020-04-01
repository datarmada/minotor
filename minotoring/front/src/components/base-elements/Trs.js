import PropTypes, { string } from 'prop-types';
import React from 'react';
import Tr from './Tr';

export default function Trs(props) {
  const { rows, additionalRow, mainCol } = props;
  return rows.map(row => (
    <Tr key={row[mainCol]} {...props} row={row} additionalRow={additionalRow} />
  ));
}

Trs.propTypes = {
  additionalRow: PropTypes.element,
  notClickableCols: PropTypes.instanceOf(Set),
  columns: PropTypes.arrayOf(string).isRequired,
  mainCol: PropTypes.string.isRequired,
  onRowClicked: PropTypes.func,
  rows: PropTypes.arrayOf(Object).isRequired,
  onCellClicked: PropTypes.func,
};

Trs.defaultProps = {
  additionalRow: null,
  notClickableCols: new Set(),
  onRowClicked: null,
  onCellClicked: null,
};
