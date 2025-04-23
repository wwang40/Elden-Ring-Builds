import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">Elden Ring Build Creator</Link>
        <div className="navbar-links">
          <Link to="/">Builds</Link>
          <Link to="/create">Create New Build</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;