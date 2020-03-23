import PropTypes, { string } from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

export default function Dropdown(props) {
  // props
  const { name, options } = props;
  // refs
  const mainDiv = useRef(null);
  const nameDiv = useRef(null);
  const eltContainerUl = useRef(null);
  // states
  const [active, setActive] = useState(false);
  const [searchValue, setSearchValue] = useState(null);

  // Utils
  const orderOptions = keys => {
    if (!nameDiv.current) {
      return keys.sort();
    }
    const [selected, others] = keys.reduce(
      ([passed, fails], key) =>
        key.startsWith(searchValue)
          ? [[...passed, key], fails]
          : [passed, [...fails, key]],
      [[], []]
    );
    return [...selected.sort(), ...others.sort()];
  };

  // Event functions
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      console.log(`selected option is: ${orderOptions(options)[0]}`);
    }
  };
  const handlePageClick = e => {
    // click outside of the elements wraps the dropdown
    if (mainDiv.current && !mainDiv.current.contains(e.target)) {
      setActive(false);
    }
  };
  const handleSearchChange = e => {
    setSearchValue(e.currentTarget.value);
  };
  const unwrap = e => {
    setActive(true);
    e.stopPropagation();
  };
  // className builders
  const buildDropdownClasses = () => (active ? 'dropdown active' : 'dropdown');

  useEffect(() => {
    // Event Listeners
    document.addEventListener('click', handlePageClick);
    return () => {
      document.removeEventListener('click', handlePageClick);
    };
  }, []);

  return (
    <div ref={mainDiv} className={buildDropdownClasses()}>
      <input
        ref={nameDiv}
        className="dropdown-name"
        onClick={unwrap}
        onKeyPress={handleKeyPress}
        onChange={handleSearchChange}
        placeholder={name}
      />
      <ul ref={eltContainerUl} className="dropdown-elt-container">
        {orderOptions(options).map(key => (
          <li key={key} className="dropdown-elt">
            {key}
          </li>
        ))}
      </ul>
    </div>
  );
}

Dropdown.propTypes = {
  options: PropTypes.arrayOf(string).isRequired,
  name: PropTypes.string.isRequired,
};
