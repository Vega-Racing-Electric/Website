import React from 'react';
import '../App.css';
import { FaFacebookF, FaLinkedin, FaInstagram, FaUserLock } from 'react-icons/fa';
import { Button } from './Button';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <h1 className='footer-subscription-heading'>
          Stay in the Loop
        </h1>
        <p className='footer-subscription-text'>
          Subscribe to our newsletter for the latest updates on our builds, events, and achievements.
        </p>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
              required="required"
            />
            <Button buttonStyle='btn--outline'>Subscribe</Button>
          </form>
        </div>
      </section>

      <a
        className="dev-contact"
        href='https://www.linkedin.com/company/vega-racing-electric/'
        target='_blank' rel="noreferrer"
      >
        Developed by Web Dev team @VRE
      </a>

      <section className='social-media'>
        <div className='social-media-wrap'>

          <div className="footer-col">
            <a
              className='social-icon-link'
              href='https://vega-racing.web.app/'
            >
              <p>
                <FaUserLock className="fa-symbol" />
                &nbsp;Member Login
              </p>
            </a>
          </div>

          <small className='footer-col website-rights'>VRE © 2026</small>

          <div className='footer-col social-icons'>
            <a
              className='social-icon-link'
              href='https://www.facebook.com/vegaracingelectric'
              target='_blank' rel="noreferrer"
              aria-label='Facebook'
            >
              <FaFacebookF />
            </a>
            <a
              className='social-icon-link'
              href='https://www.instagram.com/vegaracingelectric'
              target='_blank' rel="noreferrer"
              aria-label='Instagram'
            >
              <FaInstagram />
            </a>
            <a
              className='social-icon-link'
              href='https://in.linkedin.com/company/vega-racing-electric'
              target='_blank' rel="noreferrer"
              aria-label='LinkedIn'
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;