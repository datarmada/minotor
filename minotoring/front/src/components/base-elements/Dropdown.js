import PropTypes, { string } from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

// Utils
const orderOptions = (keys, query = '') => {
  if (query === '') {
    return keys.sort();
  }
  const [selected, others] = keys.reduce(
    ([passed, fails], key) =>
      key.startsWith(query)
        ? [[...passed, key], fails]
        : [passed, [...fails, key]],
    [[], []]
  );
  return [...selected.sort(), ...others.sort()];
};

// Event functions
const keyPressWrapper = (options, onOptionSelected) => e => {
  if (e.key === 'Enter') {
    onOptionSelected(options[0]);
  }
};
const optionClicked = onOptionSelected => key => () => onOptionSelected(key);
const pageClickWrapper = (ref, setter) => e => {
  // click outside of the node wraps the dropdown
  if (ref.current && !ref.current.contains(e.target)) {
    setter(false);
  }
};
const queryChangeWrapper = (options, setter) => e => {
  const newOptions = orderOptions(options, e.currentTarget.value);
  setter(newOptions);
};
const unwrapWrapper = setter => e => {
  setter(true);
  e.stopPropagation();
};

// className builders
const buildDropdownEltClasses = (key, selected) => {
  return selected.includes(key) ? 'dropdown-elt selected' : 'dropdown-elt';
};

export default function Dropdown(props) {
  // props
  const { name, onOptionSelected, options: propOptions, selected } = props;
  // refs
  const mainDiv = useRef(null);
  // states
  const [active, setActive] = useState(false);
  const [options, setOptions] = useState([]);

  // className builders
  const buildDropdownClasses = () => (active ? 'dropdown active' : 'dropdown');

  // Event functions
  const handleKeyPress = keyPressWrapper(options, onOptionSelected);
  const handleOptionClicked = optionClicked(onOptionSelected);
  const handlePageClick = pageClickWrapper(mainDiv, setActive);
  const handleQueryChange = queryChangeWrapper(options, setOptions);
  const unwrap = unwrapWrapper(setActive);

  useEffect(() => {
    setOptions(orderOptions(propOptions));
    // Event Listeners
    document.addEventListener('click', handlePageClick);
    return () => {
      document.removeEventListener('click', handlePageClick);
    };
  }, [propOptions]);

  return (
    <div ref={mainDiv} className={buildDropdownClasses()}>
      <input
        className="dropdown-name"
        onClick={unwrap}
        onKeyPress={handleKeyPress}
        onChange={handleQueryChange}
        placeholder={name}
      />
      <ul className="dropdown-elt-container">
        {options.map(key => {
          return (
            <li
              key={key}
              className={buildDropdownEltClasses(key, selected)}
              onClick={handleOptionClicked(key)}
              role="presentation"
            >
              <span>
                {key} {selected.includes(key) ? <b>x</b> : null}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(string).isRequired,
  onOptionSelected: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(string),
};

Dropdown.defaultProps = {
  selected: [],
};
