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
          <ul className='dropdown'>
            <li
              className={activeTab === 'Parlay' ? 'active' : 'inactive'}
              onClick={(event) => {
                event.stopPropagation();
                setActiveTab('Parlay');
              }}
            >
              Parlay
            </li>
            <li
              className={activeTab === 'Rankings' ? 'active' : 'inactive'}
              onClick={(event) => {
                event.stopPropagation();
                setActiveTab('Rankings');
              }}
            >
              Rankings
            </li>
          </ul>
        </li>
        <li
          className={activeTab === 'MLB' ? 'active' : 'inactive'}
          onClick={() => setActiveTab('MLB')}
        >
          MLB
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