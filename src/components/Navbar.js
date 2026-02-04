import React, { useState, useEffect } from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import '../App.css';
import logo from '../images/Navbar_Logo.jpg'; 

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 1020) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className = 'navbar'>
        <div className = 'navbar-container'>
          <Link to = '/' className = 'navbar-logo' onClick = {closeMobileMenu}>
            <img className = "navbar-logo-img" src = {logo} alt = "Logo"/>
          </Link>
          
          {click ? <FaTimes  onClick = {handleClick} className = 'menu-icon'/> : <FaBars  onClick = {handleClick} className = 'menu-icon'/>}
          
          <ul className = {click ? 'nav-menu active' : 'nav-menu'}>
            <li className = 'nav-item'>
              <Link to = '/' className = 'nav-links' onClick = {closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className = 'nav-item'>
              <Link
                to = '/research'
                className = 'nav-links'
                onClick = {closeMobileMenu}
              >
                Research
              </Link>
            </li>
            <li className = 'nav-item'>
              <Link
                to = '/team'
                className = 'nav-links'
                onClick = {closeMobileMenu}
              >
                Team
              </Link>
            </li>

            <li className = 'nav-item'>
              <Link
                to = '/achievements'
                className = 'nav-links'
                onClick = {closeMobileMenu}
              >
                Achievements
              </Link>
            </li>

            <li className = 'nav-item'>
              <Link
                to = '/sponsors'
                className = 'nav-links'
                onClick = {closeMobileMenu}
              >
                Sponsors
              </Link>
            </li>

            <li>
              <Link
                to = '/contact-us'
                className = 'nav-links-mobile'
                onClick = {closeMobileMenu}
              >
                Contact Us
              </Link>
            </li>
          </ul>
          {button && <Button to = '/contact-us' buttonStyle = 'btn--outline'>Contact Us</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
