import React from 'react';
import logoWhite from '../assets/images/logowhite.png';

const Footer = () => {

  return (
    <footer>
      <section className='footer-sec'>
        <div className='custom-container'>
            <div className='footerCol_inner'>
                <div className='logoWrap'>
                    <img src={logoWhite} alt='Xcellent Travels' />
                </div>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
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