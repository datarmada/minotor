import PropTypes, { string } from 'prop-types';
import React from 'react';

const buildDropdownEltClasses = (key, selected) => {
  return selected.includes(key) ? 'dropdown-elt selected' : 'dropdown-elt';
};

export default function DropdownList(props) {
  const { onOptionSelected, options, selected } = props;

  // Event functions
  const handleOptionClicked = key => () => {
    onOptionSelected(key);
  };

  return (
    <ul className="dropdown-elt-container">
      {options.map(option => {
        return (
          <li
            key={option}
            className={buildDropdownEltClasses(option, selected)}
            onClick={handleOptionClicked(option)}
            role="presentation"
          >
            <span>
              {option} {selected.includes(option) ? <b>x</b> : null}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

DropdownList.propTypes = {
  onOptionSelected: PropTypes.func,
  options: PropTypes.arrayOf(string).isRequired,
  selected: PropTypes.arrayOf(string).isRequired,
};

DropdownList.defaultProps = {
  onOptionSelected: null,
};
