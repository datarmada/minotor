import { bool, func } from 'prop-types';
import React from 'react';

import { Link } from 'react-router-dom';

// SVGs
import { ReactComponent as Features } from '../../img/features.svg';
import { ReactComponent as Logo } from '../../img/logos/minotaur.svg';
import { ReactComponent as Menu } from '../../img/menu.svg';
import { ReactComponent as Predictions } from '../../img/prediction.svg';

export default function NavBar(props) {
  const { isOpen, onToggleNav } = props;

  return (
    <ul
      id="nav"
      className={isOpen ? 'open' : null}
      onTransitionEnd={() => window.dispatchEvent(new Event('resize'))}
    >
      {onToggleNav && (
        <li className="menu">
          <span className="icon-container">
            <Menu className="icon menu" onClick={() => onToggleNav(!isOpen)} />
          </span>
        </li>
      )}
      <li className="logo">
        <Link to="/features">
          <Logo className="icon logo" />
          <h2 className="fade">Minotor</h2>
        </Link>
      </li>
      <li>
        <Link to="/features">
          <span className="icon-container">
            <Features className="icon" />
          </span>
          <p className="fade">Features</p>
        </Link>
      </li>
      <li>
        <Link to="/predictions">
          <span className="icon-container">
            <Predictions className="icon" />
          </span>
          <p className="fade">Predictions</p>
        </Link>
      </li>
    </ul>
  );
}

NavBar.propTypes = {
  isOpen: bool,
  onToggleNav: func,
};

NavBar.defaultProps = {
  isOpen: true,
  onToggleNav: null,
};
