import PropTypes, { string } from 'prop-types';
import React, { useState } from 'react';

export default function Dropdown(props) {
  const [active, setActive] = useState(false);
  const { name, keys } = props;

  // Event functions
  const toggleActive = () => setActive(!active);

  // className builders
  const buildDropdownClasses = () => (active ? 'dropdown active' : 'dropdown');

  return (
    <div className={buildDropdownClasses()}>
      <p className="dropdown-name" onClick={toggleActive}>
        {name}
      </p>
      <ul className="dropdown-elt-container">
        {keys.map(key => (
          <li className="dropdown-elt">{key}</li>
        ))}
      </ul>
    </div>
  );
}

Dropdown.propTypes = {
  keys: PropTypes.arrayOf(string).isRequired,
  name: PropTypes.string.isRequired,
};
