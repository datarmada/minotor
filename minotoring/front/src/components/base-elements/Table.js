import PropTypes, { string } from 'prop-types';
import React, { useState, useEffect } from 'react';

// Components
import Dropdown from './Dropdown';

// Utils
export const buildThs = (keys, names = null) => (
  <tr>
    {keys.map(key => (
      <th key={key}>{names ? names[key] : key}</th>
    ))}
  </tr>
);
const buildTds = (row, keys) => keys.map(key => <td key={key}>{row[key]}</td>);
export const buildTrs = (rows, keys, onClick = null) =>
  rows.map(row => (
    <tr key={row[keys[0]]} onClick={onClick}>
      {buildTds(row, keys)}
    </tr>
  ));
const buildColFilter = (keys, selected, toggleSelected) => (
  <Dropdown
    name="Select Features"
    options={keys}
    selected={selected}
    toggleSelected={toggleSelected}
  />
);
const buildRowFilter = (keys, selected, toggleSelected) => (
  <Dropdown
    name="Select Rows"
    options={keys}
    selected={selected}
    toggleSelected={toggleSelected}
  />
);

export default function Table(props) {
  const {
    data,
    onTrClicked,
    orderedKeys,
    verboseKeyNames,
    colFiltrable,
    rowFiltrable,
    nbColDisplayed,
  } = props;

  const [selectedCols, setSelectedCols] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = colFiltrable ? selectedCols : orderedKeys;

  const toggleSelectedCols = key =>
    selectedCols.includes(key)
      ? setSelectedCols(selectedCols.filter(elt => elt !== key))
      : setSelectedCols([...selectedCols, key]);

  const toggleSelectedRows = key =>
    selectedRows.includes(key)
      ? setSelectedRows(selectedRows.filter(elt => elt !== key))
      : setSelectedRows([...selectedRows, key]);

  // Building rows
  const ths = buildThs(columns, verboseKeyNames);
  const trs = buildTrs(
    data.filter(d => selectedRows.includes(d[orderedKeys[0]])),
    columns,
    onTrClicked
  );

  useEffect(() => {
    setSelectedCols(orderedKeys.slice(0, nbColDisplayed));
    setSelectedRows(data.map(d => d[orderedKeys[0]]));
  }, [orderedKeys, data]);

  return (
    <div>
      {colFiltrable || rowFiltrable ? (
        <div className="table-controls">
          {colFiltrable
            ? buildColFilter(
                orderedKeys.slice(1, orderedKeys.length),
                selectedCols,
                toggleSelectedCols
              )
            : null}
          {rowFiltrable
            ? buildRowFilter(
                data.map(d => d[orderedKeys[0]]),
                selectedRows,
                toggleSelectedRows
              )
            : null}
        </div>
      ) : null}
      <table className="table">
        <thead>{ths}</thead>
        <tbody>{trs}</tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  colFiltrable: PropTypes.bool,
  data: PropTypes.arrayOf(Object).isRequired,
  nbColDisplayed: PropTypes.number,
  onTrClicked: PropTypes.func.isRequired,
  orderedKeys: PropTypes.arrayOf(string).isRequired,
  rowFiltrable: PropTypes.bool,
  verboseKeyNames: PropTypes.objectOf(string),
};

Table.defaultProps = {
  colFiltrable: false,
  nbColDisplayed: 6,
  rowFiltrable: false,
  verboseKeyNames: {},
};
