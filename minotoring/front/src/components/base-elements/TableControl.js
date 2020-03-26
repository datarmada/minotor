import PropTypes, { string } from 'prop-types';
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
  name: PropTypes.string,
  onOptionSelected: PropTypes.func,
  options: PropTypes.arrayOf(string),
  selected: PropTypes.arrayOf(string),
};

TableControl.propTypes = {
  colDropdown: PropTypes.shape(DROPDOWN_SHAPE),
  rowDropdown: PropTypes.shape(DROPDOWN_SHAPE),
};

TableControl.defaultProps = {
  colDropdown: null,
  rowDropdown: null,
};
