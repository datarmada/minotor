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
const keyPressWrapper = options => e => {
  if (e.key === 'Enter') {
    console.log(`Selected option is: ${options[0]}`);
  }
};
const pageClickWrapper = (node, setter) => e => {
  // click outside of the node wraps the dropdown
  if (node && !node.contains(e.target)) {
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

export default function Dropdown(props) {
  // props
  const { name, options: propOptions } = props;
  // refs
  const mainDiv = useRef(null);
  // states
  const [active, setActive] = useState(false);
  const [options, setOptions] = useState([]);

  // className builders
  const buildDropdownClasses = () => (active ? 'dropdown active' : 'dropdown');

  // Event functions
  const handleKeyPress = keyPressWrapper(options);
  const handlePageClick = pageClickWrapper(mainDiv.currentTarget, setActive);
  const handleQueryChange = queryChangeWrapper(options, setOptions);
  const unwrap = unwrapWrapper(setActive);

  useEffect(() => {
    setOptions(orderOptions(propOptions));
    // Event Listeners
    document.addEventListener('click', handlePageClick);
    return () => {
      document.removeEventListener('click', handlePageClick);
    };
  }, []);

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
            <li key={key} className="dropdown-elt">
              {key}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

Dropdown.propTypes = {
  options: PropTypes.arrayOf(string).isRequired,
  name: PropTypes.string.isRequired,
};
