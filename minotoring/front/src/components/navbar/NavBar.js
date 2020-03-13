import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import '../../sass/navbar/navbar.scss';

// SVGs
import { ReactComponent as Logo } from '../../img/logos/minotaur.svg';
import { ReactComponent as Features } from '../../img/logos/features.svg';
import { ReactComponent as Predictions } from '../../img/logos/prediction.svg';

export default function NavBar(props) {
  return (
    <ul className="nav">
      <li>
        <h1>
          <Link to="/">
            <Logo className="logo" />
          </Link>
        </h1>
      </li>
      <li>
        <Link to="/predictions">
          <Predictions className="logo" />
        </Link>
      </li>
      <li>
        <Link to="/features">
          <Features className="logo" />
        </Link>
      </li>
    </ul>
  );
}
