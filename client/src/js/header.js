import React from 'react';
import '../css/header.css';
import logo from '../img/ut-libraries-logo_1.png';

function Header() {
  return (
    <div className="Header">
      <img src={logo} alt="UT Libraries Logo" />
      <ul>
        <li><a href="blah">Collections</a></li>
        <li><a href="blah">Browse Objects</a></li>
        <li><a href="blah">About</a></li>
        <li><a href="blah">Header Item Four</a></li>
      </ul>
    </div>
  );
}

export default Header;
