import React from 'react';
import logoWhite from '../assets/images/logowhite.png';

const Footer = () => {

  return (
    <footer>
      <section className='footer-sec'>
        <div className='custom-container'>
            <div className='footerCol_inner'>
                <div className='logoWrap'>
                    <a href='/' title='Xcellent Travels'>
                      <img src={logoWhite} alt='Xcellent Travels' />
                    </a>
                </div>
                <p>Discover excellence with Xcellent Travels – your one-stop destination for seamless travel experiences. Elevate your journey with our expert services, including hassle-free flight and hotel bookings, luxurious cruise control.</p>
                <ul className='social_info'>
                    <li>
                        <a href='#'><i className='fa fa-twitter'></i></a>
                    </li>
                    <li>
                        <a href='#'><i className='fa fa-facebook'></i></a>
                    </li>
                    <li>
                        <a href='#'><i className='fa fa-instagram'></i></a>
                    </li>
                </ul>
            </div>
        </div>
      </section>
      <div className='copyright'>
        <div className='custom-container'>
          <span>&copy; {new Date().getFullYear()} Xcellent Travels</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;