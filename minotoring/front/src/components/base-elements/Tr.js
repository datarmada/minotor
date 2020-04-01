import PropTypes, { string, number, oneOfType, any } from 'prop-types';
import React, { useState, Component } from 'react';
import { isEmpty } from 'lodash';
import PopUpTable from '../inputs-table/PopUpTable';

// Utils
const isCellClickable = (col, onCellClicked, notClickableCols, mainCol) =>
  col !== mainCol && onCellClicked && !notClickableCols.has(col);

const isRowClickable = (col, onRowClicked, mainCol) =>
  col === mainCol && onRowClicked;

export default function Tr(props) {
  const {
    columns,
    mainCol,
    onRowClicked,
    onCellClicked,
    notClickableCols,
    row,
    additionalRow,
  } = props;
  const [isAdditionalRowDisplayed, setIsAdditionalRowDisplayed] = useState(
    false
  );
  const ref = React.createRef();

  const isCellClickableWrapped = col =>
    isCellClickable(col, onCellClicked, notClickableCols, mainCol);

  const isRowClickableWrapped = col =>
    isRowClickable(col, onRowClicked, mainCol);

  return (
    <>
      <tr
        // eslint-disable-next-line react/no-array-index-key
        key={row[mainCol]}
        ref={ref}
      >
        {columns.map(col => (
          <td
            key={col}
            idcol={col}
            idrow={row.id}
            onClick={e => {
              isCellClickableWrapped(col) && onCellClicked(e);
              isRowClickableWrapped(col) && onRowClicked(e);
              !onRowClicked &&
                !isEmpty(additionalRow) &&
                setIsAdditionalRowDisplayed(!isAdditionalRowDisplayed);
            }}
            onMouseEnter={e => {
              isCellClickableWrapped(col) &&
                e.currentTarget.classList.add('hovered');
              (isRowClickableWrapped(col) || additionalRow) &&
                ref.current.classList.add('hovered');
            }}
            onMouseLeave={e => {
              e.currentTarget.classList.remove('hovered');
              ref.current.classList.remove('hovered');
            }}
            role="presentation"
          >
            {typeof row[col] === 'number' ? row[col].toFixed(2) : row[col]}
          </td>
        ))}
      </tr>
      {additionalRow && isAdditionalRowDisplayed ? (
        <additionalRow.type {...additionalRow.props} />
      ) : null}
    </>
  );
}

Tr.propTypes = {
  additionalRow: PropTypes.element,
  notClickableCols: PropTypes.instanceOf(Set),
  columns: PropTypes.arrayOf(string).isRequired,
  mainCol: PropTypes.string.isRequired,
  onRowClicked: PropTypes.func,
  onCellClicked: PropTypes.func,
  row: PropTypes.objectOf(any).isRequired,
};

Tr.defaultProps = {
  additionalRow: null,
  notClickableCols: new Set(),
  onRowClicked: null,
  onCellClicked: null,
};
