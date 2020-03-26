import PropTypes, { string } from 'prop-types';
import React, { useState, useEffect } from 'react';

// Components
import TableControl from './TableControl';
import Ths from './Ths';
import Trs from './Trs';

// Utils
const onOptionSelected = (setter, selected) => key =>
  selected.includes(key)
    ? setter(selected.filter(elt => elt !== key))
    : setter([...selected, key]);

export default function Table(props) {
  // Props
  const {
    data,
    isColFiltrable,
    isRowFiltrable,
    mainCol,
    nbColDisplayed,
    nbRowDisplayed,
    onRowClicked,
    orderedColumns,
    verboseColNames,
  } = props;

  // Init States
  const [selectedCols, setSelectedCols] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = isColFiltrable ? selectedCols : orderedColumns;
  const rows = isRowFiltrable
    ? data.filter(d => selectedRows.includes(d[mainCol]))
    : data;

  useEffect(() => {
    setSelectedCols(orderedColumns.slice(0, nbColDisplayed));
    setSelectedRows(data.map(d => d[mainCol]).slice(0, nbRowDisplayed));
  }, [orderedColumns, data]);

  // Dropdown Definitions
  const toggleSelectedCol = onOptionSelected(setSelectedCols, selectedCols);
  const toggleSelectedRow = onOptionSelected(setSelectedRows, selectedRows);
  const COL_DROPDOWN = {
    name: 'Select Features',
    onOptionSelected: toggleSelectedCol,
    options: orderedColumns.filter(col => col !== mainCol),
    selected: selectedCols,
  };
  const ROW_DROPDOWN = {
    name: 'Select Rows',
    onOptionSelected: toggleSelectedRow,
    options: data.map(d => d[mainCol]),
    selected: selectedRows,
  };

  return (
    <div>
      <TableControl
        colDropdown={isColFiltrable ? COL_DROPDOWN : null}
        rowDropdown={isRowFiltrable ? ROW_DROPDOWN : null}
      />
      <table className="table">
        <thead>
          <Ths {...{ columns, verboseColNames }} />
        </thead>
        <tbody>
          <Trs {...{ columns, mainCol, onRowClicked, rows }} />
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
  isColFiltrable: PropTypes.bool,
  isRowFiltrable: PropTypes.bool,
  mainCol: PropTypes.string.isRequired,
  nbColDisplayed: PropTypes.number,
  nbRowDisplayed: PropTypes.number,
  onRowClicked: PropTypes.func.isRequired,
  orderedColumns: PropTypes.arrayOf(string).isRequired,
  verboseColNames: PropTypes.objectOf(string),
};

Table.defaultProps = {
  isColFiltrable: false,
  isRowFiltrable: false,
  nbColDisplayed: 6,
  nbRowDisplayed: 10,
  verboseColNames: {},
};
