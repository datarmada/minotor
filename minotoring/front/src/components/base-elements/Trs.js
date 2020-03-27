import PropTypes, { string } from 'prop-types';
import React from 'react';

export default function Trs(props) {
  const { columns, mainCol, onRowClicked, onCellClicked, rows } = props;
  return rows.map((row, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <tr key={`${row[mainCol]}-${index}`} onClick={onRowClicked}>
      {columns.map((col, idx) =>
        idx === 0 ? (
          <th scope="row" key={col}>
            {row[col]}
          </th>
        ) : (
          <td
            key={col}
            onClick={e => {
              onCellClicked && e.stopPropagation && e.stopPropagation();
              onCellClicked && onCellClicked(e);
            }}
            role="presentation"
          >
            {row[col]}
          </td>
        )
      )}
    </tr>
  ));
}

Trs.propTypes = {
  columns: PropTypes.arrayOf(string).isRequired,
  mainCol: PropTypes.string.isRequired,
  onRowClicked: PropTypes.func,
  rows: PropTypes.arrayOf(Object).isRequired,
  onCellClicked: PropTypes.func,
};

Trs.defaultProps = {
  onRowClicked: null,
  onCellClicked: null,
};
