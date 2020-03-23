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
  } = props;

  const [selected, setSelected] = useState([]);

  const toggleSelected = key =>
    selected.includes(key)
      ? setSelected(selected.filter(elt => elt !== key))
      : setSelected([...selected, key]);

  // Building rows
  const ths = buildThs(selected, verboseKeyNames);
  const trs = buildTrs(data, selected, onTrClicked);

  return (
    <div>
      {colFiltrable
        ? buildColFilter(orderedKeys, selected, toggleSelected)
        : null}
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
  onTrClicked: PropTypes.func.isRequired,
  orderedKeys: PropTypes.arrayOf(string).isRequired,
  verboseKeyNames: PropTypes.objectOf(string),
};

Table.defaultProps = {
  colFiltrable: false,
  verboseKeyNames: {},
};
