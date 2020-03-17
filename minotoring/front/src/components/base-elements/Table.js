import React from 'react';
import PropTypes from 'prop-types';

export default function Table(props) {
  const { data, onTrClicked, orderedKeys, verboseKeyNames } = props;
  const FIRST_KEY = orderedKeys[0];

  // Utils
  const buildTds = (row, keys) => keys.map((key, idx) => <td key={idx}>{row[key]}</td>);

  // Building rows
  const ths = (
    <tr>
      {orderedKeys.map((key) => (
        <td key={key}>{verboseKeyNames[key]}</td>
      ))}
    </tr>
  );
  const trs = data.map((row) => (
    <tr key={row[FIRST_KEY]} onClick={onTrClicked}>
      {buildTds(row, orderedKeys)}
    </tr>
  ));

  return (
    <table className="table">
      <thead>{ths}</thead>
      <tbody>{trs}</tbody>
    </table>
  );
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  orderedKeys: PropTypes.array.isRequired,
  verboseKeyNames: PropTypes.object,
};
