import PropTypes, { string } from 'prop-types';
import React, { useState, useEffect } from 'react';

// Components
import TableControl from './TableControl';
import Ths from './Ths';
import Trs from './Trs';
import {
  FULL_ORDERED_COLUMNS,
  VERBOSE_COLUMN_NAMES,
} from '../../utils/constants';

// Utils
const onOptionSelected = (setter, selected) => key =>
  selected.includes(key)
    ? setter(selected.filter(elt => elt !== key))
    : setter([...selected, key]);

export default function Table(props) {
  // Props
  const {
    notClickableCols,
    data,
    isColFiltrable,
    isRowFiltrable,
    mainCol,
    nbColDisplayed,
    nbRowDisplayed,
    onRowClicked,
    onColClicked,
    onCellClicked,
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

  const colRefs = columns.map(React.createRef);

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
        <colgroup>
          {columns.map((col, idx) => (
            <col key={col} ref={colRefs[idx]} />
          ))}
        </colgroup>
        <thead>
          <Ths
            {...{
              columns,
              verboseColNames,
              onColClicked,
              colRefs,
              notClickableCols,
            }}
          />
        </thead>
        <tbody>
          <Trs
            {...{
              columns,
              mainCol,
              onRowClicked,
              onCellClicked,
              rows,
              notClickableCols,
            }}
          />
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  notClickableCols: PropTypes.instanceOf(Set),
  data: PropTypes.arrayOf(Object).isRequired,
  isColFiltrable: PropTypes.bool,
  isRowFiltrable: PropTypes.bool,
  mainCol: PropTypes.string.isRequired,
  nbColDisplayed: PropTypes.number,
  nbRowDisplayed: PropTypes.number,
  onRowClicked: PropTypes.func,
  onColClicked: PropTypes.func,
  onCellClicked: PropTypes.func,
  orderedColumns: PropTypes.arrayOf(string).isRequired,
  verboseColNames: PropTypes.objectOf(string),
};

Table.defaultProps = {
  notClickableCols: new Set(),
  isColFiltrable: false,
  isRowFiltrable: false,
  nbColDisplayed: 6,
  nbRowDisplayed: 10,
  verboseColNames: VERBOSE_COLUMN_NAMES,
  onRowClicked: null,
  onCellClicked: null,
  onColClicked: null,
};
