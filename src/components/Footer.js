import React from 'react';
import '../App.css';
import { FaFacebookF, FaLinkedin, FaInstagram, FaUserLock } from 'react-icons/fa';
import { Button } from './Button';

function Footer() {
  return (
    <div className = 'footer-container'>
      <section className = 'footer-subscription'>
      <h1 className = 'footer-subscription-heading'>
        Subscribe
      </h1>
        <p className = 'footer-subscription-text'>
        Enter your Email ID to subscribe to our Magazine and get updates right to your inbox! (No Spams, we promise :))
        </p>
        <div className = 'input-areas'>
          <form>
            <input
              className = 'footer-input'
              name = 'email'
              type = 'email'
              placeholder = 'Your Email'
              required = "required"
            />
            <Button buttonStyle = 'btn--outline'>Subscribe</Button>
          </form>
        </div>
      </section>
      
      <a 
        className = "dev-contact" 
        href = 'https://in.linkedin.com/in/dhruvalpb'
        target = '_blank' rel = "noreferrer"
      >
        Developed by Dhruval PB
      </a>
      
      <section className = 'social-media'>
        <div className = 'social-media-wrap'>
          
          <div className = "footer-col">
            <a 
              className = 'social-icon-link' 
              href = 'https://vega-racing.web.app/'
            >
              <p>
                <FaUserLock className = "fa-symbol" />
                Member Login
              </p>
            </a>
          </div>

          <small className = 'footer-col website-rights'>VRE © 2017</small>
          
          <div className = 'footer-col social-icons'>
            <a
              className = 'social-icon-link'
              href = 'https://www.facebook.com/vegaracingelectric'
              target = '_blank' rel = "noreferrer"
              aria-label = 'Facebook'
            >
              <FaFacebookF/>
            </a>
            <a
              className = 'social-icon-link'
              href = 'https://www.instagram.com/vegaracingelectric'
              target = '_blank' rel = "noreferrer"
              aria-label = 'Instagram'
            >
              <FaInstagram/>
            </a>
            <a
              className = 'social-icon-link'
              href = 'https://in.linkedin.com/company/vega-racing-electric'
              target = '_blank' rel = "noreferrer"
              aria-label = 'LinkedIn'
            >
              <FaLinkedin/>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;