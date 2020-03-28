import PropTypes, { string } from 'prop-types';
import React from 'react';

export default function Trs(props) {
  const { columns, mainCol, onRowClicked, onCellClicked, rows } = props;
  const trsRef = rows.map(React.createRef);
  return rows.map((row, idxRow) => (
    <tr
      // eslint-disable-next-line react/no-array-index-key
      key={`${row[mainCol]}-${idxRow}`}
      onClick={onRowClicked}
      ref={trsRef[idxRow]}
    >
      {columns.map((col, idxCol) => (
        <td
          key={col}
          onClick={e => {
            onCellClicked && e.stopPropagation && e.stopPropagation();
            onCellClicked && onCellClicked(e);
          }}
          onMouseEnter={e => {
            idxCol > 0 &&
              onCellClicked &&
              e.currentTarget.classList.add('hovered');
            idxCol === 0 &&
              onRowClicked &&
              trsRef[idxRow].current.classList.add('hovered');
          }}
          onMouseLeave={e => {
            e.currentTarget.classList.remove('hovered');
            trsRef[idxRow].current.classList.remove('hovered');
          }}
          role="presentation"
        >
          {row[col]}
        </td>
      ))}
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
