import PropTypes, { string } from 'prop-types';
import React from 'react';

// Utils
const isCellClickable = (col, onCellClicked, notClickableCols, mainCol) =>
  col !== mainCol && onCellClicked && !notClickableCols.has(col);

const isRowClickable = (idx, onRowClicked) => idx === 0 && onRowClicked;


export default function Trs(props) {
  const {
    columns,
    mainCol,
    onRowClicked,
    onCellClicked,
    rows,
    notClickableCols,
  } = props;
  const trsRef = rows.map(React.createRef);

  const isCellClickableWrapped = col =>
    isCellClickable(col, onCellClicked, notClickableCols, mainCol);

  const isRowClickableWrapped = idx => isRowClickable(idx, onRowClicked);

  return rows.map((row, idxRow) => (
    <tr
      // eslint-disable-next-line react/no-array-index-key
      key={`${row[mainCol]}-${idxRow}`}
      ref={trsRef[idxRow]}
    >
      {columns.map((col, idxCol) => (
        <td
          key={col}
          idcol={col}
          idrow={row.id}
          onClick={e => {
            isCellClickableWrapped(col) && onCellClicked(e);
            isRowClickableWrapped(idxCol) && onRowClicked(e);
          }}
          onMouseEnter={e => {
            isCellClickableWrapped(col) &&
              e.currentTarget.classList.add('hovered');
            isRowClickableWrapped(idxCol) &&
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
  notClickableCols: PropTypes.instanceOf(Set),
  columns: PropTypes.arrayOf(string).isRequired,
  mainCol: PropTypes.string.isRequired,
  onRowClicked: PropTypes.func,
  rows: PropTypes.arrayOf(Object).isRequired,
  onCellClicked: PropTypes.func,
};

Trs.defaultProps = {
  notClickableCols: new Set(),
  onRowClicked: null,
  onCellClicked: null,
};
