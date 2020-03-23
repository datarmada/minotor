import PropTypes, { string } from 'prop-types';
import React from 'react';

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
const buildColFilter = keys => (
  <Dropdown name="Select Features" options={keys} />
);

export default function Table(props) {
  const {
    data,
    onTrClicked,
    orderedKeys,
    verboseKeyNames,
    colFiltrable,
  } = props;

  // Building rows
  const ths = buildThs(orderedKeys, verboseKeyNames);
  const trs = buildTrs(data, orderedKeys, onTrClicked);

  return (
    <div>
      {colFiltrable ? buildColFilter(orderedKeys) : null}
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
