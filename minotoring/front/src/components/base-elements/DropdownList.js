import { arrayOf, func, string } from 'prop-types';
import React from 'react';

// Utils
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
    <ul className="dropdown-elt-container custom-scrollbar">
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
  onOptionSelected: func,
  options: arrayOf(string).isRequired,
  selected: arrayOf(string).isRequired,
};

DropdownList.defaultProps = {
  onOptionSelected: null,
};
