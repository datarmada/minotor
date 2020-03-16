import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { compose } from '../../utils/lodash/flowRight';

export default function Table(props) {
  const { keys, data } = props;

  // Utils
  // Note: the name are based on HTML tags => td <td> or trs for multiple <tr>
  const getRowData = (keys) => (row) => keys.map((key) => row[key]);
  const tdWrapper = (data) => data.map((elt) => <td>{elt}</td>);
  const thWrapper = (keys) => keys.map((elt) => <th>{elt}</th>);
  const trWrapper = (tds) => <tr>{tds}</tr>;
  const createTrsFromRows = compose(trWrapper, tdWrapper, getRowData(keys));
  const createThsFromKeys = compose(trWrapper, thWrapper);

  // Building rows
  // const ths = keys.map(createThsFromKeys);
  const trs = data.map(createTrsFromRows);

  return (
    <table className="table">
      <tbody>{trs}</tbody>
    </table>
  );
}

Table.propTypes = {
  keys: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};
