import { arrayOf, func, shape, string } from 'prop-types';
import React from 'react';

// Components
import Dropdown from './Dropdown';

// Utils
const hasControl = ({ colDropdown, rowDropdown }) => colDropdown || rowDropdown;

export default function TableControl(props) {
  const { colDropdown, rowDropdown } = props;

  if (!hasControl(props)) return null;

  return (
    <div className="table-control">
      {colDropdown && <Dropdown {...colDropdown} />}
      {rowDropdown && <Dropdown {...rowDropdown} />}
    </div>
  );
}

const DROPDOWN_SHAPE = {
  name: string,
  onOptionSelected: func,
  options: arrayOf(string),
  selected: arrayOf(string),
};

TableControl.propTypes = {
  colDropdown: shape(DROPDOWN_SHAPE),
  rowDropdown: shape(DROPDOWN_SHAPE),
};

TableControl.defaultProps = {
  colDropdown: null,
  rowDropdown: null,
};
