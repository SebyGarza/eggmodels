import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import egglogo from '../logosnfl/egg.png';
import '../css/Navbar.css';

function NavBar() {
  const { pathname } = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="navbar-container">
      <div className="navbar-logo-wrapper">
        <img src={egglogo} alt="eggModels logo" className="navbar-logo" />
      </div>
      <nav className="navbar">
        <Link to="/" className={pathname === '/' ? 'active' : ''}>Home</Link>

        <div
          className="dropdown"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <Link to="/nfl" className={`dropdown-toggle ${pathname.startsWith('/nfl') ? 'active' : ''}`}>
            NFL
          </Link>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/nfl/parlay" className={pathname === '/nfl/parlay' ? 'active' : ''}>Parlay</Link>
              <Link to="/nfl/rankings" className={pathname === '/nfl/rankings' ? 'active' : ''}>Rankings</Link>
            </div>
          )}
        </div>
        
        <Link to="/tennis" className={pathname === '/tennis' ? 'active' : ''}>Tennis</Link>
        <Link to="/blog" className={pathname === '/blog' ? 'active' : ''}>Blog</Link>
      </nav>
    </div>
  );
}

export default NavBar;
