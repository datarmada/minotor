import React from 'react';
import { Link } from 'react-router-dom';
import '../../sass/navbar/navbar.scss';

export default function NavBar(props) {
  return (
    <div>
      <h1>
        <Link to="/">Minotor.ai</Link>
      </h1>
      <h2>
        <Link to="/predictions">Predictions analytics</Link>
      </h2>
      <h2>
        <Link to="/features">Features analytics</Link>
      </h2>
    </div>
  );
}
