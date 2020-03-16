import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { compose } from '../../utils/lodash/flowRight';

export default function Table(props) {
  const { data, onTrClicked, orderedKeys, verboseKeyNames } = props;

  // Utils
  // Note: the name are based on HTML tags => td <td> or trs for multiple <tr>
  const getRowData = (row) => orderedKeys.map((key) => row[key]);
  const getVbKeyName = (key) => (verboseKeyNames ? verboseKeyNames[key] : key);

  const tdWrapper = (elt) => <td>{elt}</td>;
  const thWrapper = (elt) => <th>{elt}</th>;
  const trWrapper = (elt, isHeader) => (
    <tr data-header={isHeader ? 'true' : 'false'} onClick={onTrClicked}>
      {elt}
    </tr>
  );
  const multiWrapper = (func) => (data) => data.map(func);

  const createTrsFromRow = compose(trWrapper, multiWrapper(tdWrapper), getRowData);
  const createThsFromKeys = compose(thWrapper, getVbKeyName);

  // Building rows
  const ths = trWrapper(orderedKeys.map(createThsFromKeys), true);
  const trs = data.map(createTrsFromRow);

  // NOTE: warnings are thrown here because not key prop set
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
