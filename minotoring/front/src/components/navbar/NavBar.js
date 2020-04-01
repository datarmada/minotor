import React from 'react';

import { Link } from 'react-router-dom';

// SVGs
import { ReactComponent as Features } from '../../img/logos/features.svg';
import { ReactComponent as Logo } from '../../img/logos/minotaur.svg';
import { ReactComponent as Predictions } from '../../img/logos/prediction.svg';

export default function NavBar() {
  return (
    <ul id="nav">
      <li>
        <Link to="/">
          <Logo className="icon logo" />
          <h2>Minotor AI</h2>
        </Link>
      </li>
      <li>
        <Link to="/features">
          <Features className="icon" />
          <p>Features</p>
        </Link>
      </li>
      <li>
        <Link to="/predictions">
          <Predictions className="icon" />
          <p>Predictions</p>
        </Link>
      </li>
    </ul>
  );
}
