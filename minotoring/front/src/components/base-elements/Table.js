import PropTypes, { string } from 'prop-types';
import React, { useState } from 'react';

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
const buildTds = (row, keys) =>
  keys.map((key, idx) => <td key={idx}>{row[key]}</td>);
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

export default function Table(props) {
  const {
    data,
    onTrClicked,
    orderedKeys,
    verboseKeyNames,
    colFiltrable,
    nbColDisplayed,
  } = props;

  const [selected, setSelected] = useState(
    orderedKeys.slice(0, nbColDisplayed)
  );

  const columns = colFiltrable ? selected : orderedKeys;

  const toggleSelected = key =>
    selected.includes(key)
      ? setSelected(selected.filter(elt => elt !== key))
      : setSelected([...selected, key]);

  // Building rows
  const ths = buildThs(columns, verboseKeyNames);
  const trs = buildTrs(data, columns, onTrClicked);

  return (
    <div>
      {colFiltrable ? (
        <div className="table-controls">
          {colFiltrable
            ? buildColFilter(orderedKeys, selected, toggleSelected)
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
  verboseKeyNames: PropTypes.objectOf(string),
};

Table.defaultProps = {
  colFiltrable: false,
  nbColDisplayed: 6,
  verboseKeyNames: {},
};
