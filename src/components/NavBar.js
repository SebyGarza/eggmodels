// src/components/NavBar.js
import React from 'react';

const NavBar = ({ activeTab, setActiveTab }) => {
  return (
    <nav>
      <ul>
        <li
          className={activeTab === 'NFL' ? 'active' : ''}
          onClick={() => setActiveTab('NFL')}
        >
          NFL
        </li>
        <li
          className={activeTab === 'Blog' ? 'active' : ''}
          onClick={() => setActiveTab('Blog')}
        >
          Blog
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
