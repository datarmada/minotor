import PropTypes, { string } from 'prop-types';
import React from 'react';

export default function Trs(props) {
  const { columns, mainCol, onRowClicked, onCellClicked, rows } = props;
  return rows.map(row => (
    <tr key={row[mainCol]}>
      {columns.map((col, idx) =>
        idx === 0 ? (
          <th scope="row" key={col} onClick={onRowClicked}>
            {row[col]}
          </th>
        ) : (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <td
            key={col}
            onClick={e => {
              if (e.stopPropagation) e.stopPropagation();
              onCellClicked(e);
            }}
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
  onRowClicked: () => {},
  onCellClicked: () => {},
};
