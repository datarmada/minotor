import React from 'react';
import PropTypes from 'prop-types';

export default function Table(props) {
  const { data, onTrClicked, orderedKeys, verboseKeyNames } = props;
  const FIRST_KEY = orderedKeys[0];

  // Building rows
  const ths = buildThs(orderedKeys, verboseKeyNames);
  const trs = buildTrs(data, orderedKeys, onTrClicked);

  return (
    <table className="table">
      <thead>{ths}</thead>
      <tbody>{trs}</tbody>
    </table>
  );
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  onTrClicked: PropTypes.func,
  orderedKeys: PropTypes.array.isRequired,
  verboseKeyNames: PropTypes.object,
};

// Utils
export const buildTds = (row, keys) => keys.map((key, idx) => <td key={idx}>{row[key]}</td>);
export const buildThs = (keys, names) => (
  <tr>
    {keys.map((key) => (
      <th key={key}>{names ? names[key] : key}</th>
    ))}
  </tr>
);
export const buildTrs = (rows, keys, onClick = null) =>
  rows.map((row) => (
    <tr key={row[keys[0]]} onClick={onClick}>
      {buildTds(row, keys)}
    </tr>
  ));
