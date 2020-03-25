import PropTypes, { string } from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

// Components
import DropdownList from './DropdownList';

// Utils
const orderOptions = (options, query = '') => {
  if (query === '') {
    return options.sort();
  }
  const [matched, others] = options.reduce(
    ([passed, fails], option) =>
      option.startsWith(query)
        ? [[...passed, option], fails]
        : [passed, [...fails, option]],
    [[], []]
  );
  return [...matched.sort(), ...others.sort()];
};
// className builders
const buildDropdownClasses = active =>
  active ? 'dropdown active' : 'dropdown';

export default function Dropdown(props) {
  // props
  const { name, onOptionSelected, options: propOptions, selected } = props;
  // refs
  const mainDiv = useRef(null);
  // states
  const [active, setActive] = useState(false);
  const [options, setOptions] = useState([]);

  // Event functions
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      onOptionSelected(options[0]);
    }
  };
  const handlePageClick = e => {
    // click outside of the node wraps the dropdown
    if (mainDiv.current && !mainDiv.current.contains(e.target)) {
      setActive(false);
    }
  };
  const handleQueryChange = e => {
    const newOptions = orderOptions(options, e.currentTarget.value);
    setOptions(newOptions);
  };
  const unwrap = e => {
    setActive(true);
    e.stopPropagation();
  };

  useEffect(() => {
    setOptions(orderOptions(propOptions));
    // Event Listeners
    document.addEventListener('click', handlePageClick);
    return () => {
      document.removeEventListener('click', handlePageClick);
    };
  }, [propOptions]);

  return (
    <div ref={mainDiv} className={buildDropdownClasses(active)}>
      <input
        className="dropdown-name"
        onClick={unwrap}
        onKeyPress={handleKeyPress}
        onChange={handleQueryChange}
        placeholder={name}
      />
      <DropdownList {...{ onOptionSelected, options, selected }} />
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
