import React from 'react';

import '../App.css';
import './header.css';

function Header() {
  return (
    <div className="header">
      <div className="header-wrapper">
        <div className='logo'>
            Strava Companion
        </div>
        <nav className='nav'>
            <a href="#" className="nav-link">Home</a>
            <a href="#" className="nav-link">My Map</a>
            <a href="#" className="nav-link">My Activities</a>
            <a href="#" className="nav-link">Profile</a>
        </nav>
      </div>
    </div>
  );
}

export default Header;