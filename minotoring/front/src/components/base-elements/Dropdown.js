import { arrayOf, func, string } from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

// Components
import DropdownList from './DropdownList';

// SVGs
import { ReactComponent as Search } from '../../img/search.svg';

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
      <div className="input-container">
        <input
          className="dropdown-name"
          onClick={unwrap}
          onKeyPress={handleKeyPress}
          onChange={handleQueryChange}
          placeholder={name}
        />
        <Search className="icon-search" />
      </div>
      <DropdownList {...{ onOptionSelected, options, selected }} />
    </div>
  );
}

Dropdown.propTypes = {
  name: string.isRequired,
  options: arrayOf(string).isRequired,
  onOptionSelected: func.isRequired,
  selected: arrayOf(string),
};

Dropdown.defaultProps = {
  selected: [],
};
