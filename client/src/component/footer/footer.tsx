import React from 'react';
//import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id='footer' className='footer'>
      <div className='container'>
        <div className='row gy-4'>
          <div className='col-lg-5 col-md-12 footer-info'>
            <a href='index.html' className='logo d-flex align-items-center'>
              <span>Rapid Repairs</span>
            </a>
            <p>
              Rapid Repairs, your one-stop Center for plumbing, carpentry,
              cleaning, Roofing, electrical and home painting needs.
            </p>
            <div className='social-links d-flex mt-4'>
              <a href='#' className='twitter'>
                <i className='bi bi-twitter'></i>
              </a>
              <a href='#' className='facebook'>
                <i className='bi bi-facebook'></i>
              </a>
              <a href='#' className='instagram'>
                <i className='bi bi-instagram'></i>
              </a>
              <a href='#' className='linkedin'>
                <i className='bi bi-linkedin'></i>
              </a>
            </div>
          </div>

      

          <div className='col-lg-2 col-6 footer-links'>
            <h4>Our Services</h4>
            <ul>
              <li>
                <a href='#'>Plumbing</a>
              </li>
              <li>
                <a href='#'>Carpentry</a>
              </li>
              <li>
                <a href='#'>Cleaning</a>
              </li>
              <li>
                <a href='#'>Home Painting</a>
              </li>
              <li>
                <a href='#'>Electrical works</a>
              </li>
              <li>
                <a href='#'>Roofing Repairs</a>
              </li>
            </ul>
          </div>

          <div className='col-lg-3 col-md-12 footer-contact text-center text-md-start'>
            <h4>We are</h4>
            <p>
              Team 10 <br />
              S6,CSE-B
              <br />
              SJCET,Palai <br />
             
              <strong>Email:</strong> rapidrepairs@example.com
              <br />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
