import React from 'react';
import egglogo from '../logosnfl/egglogo.png'; // Import your JPG logo image

const NavBar = ({ activeTab, setActiveTab }) => {
  return (
    <nav className='navigation'>
      <img src={egglogo} alt="Your Logo" className="navbar-logo" />
      <ul>
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

        <li
          className={activeTab === 'Parlay' ? 'active' : 'inactive'}
          onClick={() => setActiveTab('Parlay')}
        >
          Parlay
        </li>
        <li
          className={activeTab === 'Rankings' ? 'active' : 'inactive'}
          onClick={() => setActiveTab('Rankings')}
        >
          Rankings
        </li>
        <li
          className={activeTab === 'Playoffs' ? 'active' : 'inactive'}
          onClick={() => setActiveTab('Playoffs')}
        >
          Playoffs
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
