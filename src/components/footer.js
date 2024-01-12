import React from 'react';
import logoWhite from '../assets/images/logowhite.png';
import licence from '../assets/images/licence.png';

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
                <ul className='cont_info'>
                  <li><a href='tel:6046796293' title='6046796293'><i className='fa fa-phone'></i> 604 679 6293</a></li>
                  <li><a href='mailto:info@xcellenttoursandtravels.com' title='info@xcellenttoursandtravels.com'><i className='fa fa-envelope'></i> info@xcellenttoursandtravels.com</a></li>
                </ul>
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
                <div className='licence'>
                  <img src={licence} />
                </div>
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