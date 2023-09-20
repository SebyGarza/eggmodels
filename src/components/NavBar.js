// src/components/NavBar.js
import React from 'react';
import egglogo from '../logosnfl/egglogo.png'; // Import your JPG logo image

const NavBar = ({ activeTab, setActiveTab }) => {
  return (
    <nav className='navigation'>
      <img src={egglogo} alt="Your Logo" className="navbar-logo" />
      <ul className='tabs'>
        <li
          className={activeTab === 'NFL' ? 'active' : 'inactive'}
          onClick={() => setActiveTab('NFL')}
        >
          NFL
        </li>
        <li
          className={activeTab === 'Blog' ? 'active' : 'inactive'}
          onClick={() => setActiveTab('Blog')}
        >
          Blog
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
