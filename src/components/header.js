import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import phone from '../assets/images/phone.svg';
import mail from '../assets/images/mail.svg';
import user from '../assets/images/user.svg';

const Header = () => {

    const [active, setActive] = useState(false);
    return (
        <>
            <header className={`mainHeader ${active ? 'showMenu' : ''}`}>
                <div className='innerHeader'>
                    <div className='custom-container'>
                        <div className='innerHeaderWrap'>
                            <span>Welcome to xcellent tour & travel</span>
                        </div>
                    </div>
                </div>
                <div className='custom-container'>
                    <div className='header_wrap'>
                        <div className='logo'>
                            <a href='/' title='Xcellent Travels'>
                            <img src={logo} alt='Xcellent Travels' title='Xcellent Travels' />
                            </a>
                        </div>
                        <ul className='social_wrap'>
                            <li>
                                <a href='tel:+10505005050' title='+1-05050-05050'>
                                    <img src={phone} />
                                    <div>
                                        <span>Call Us</span>
                                        +1-05050-05050
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href='mailto:xcellenttravels@gmail.com' title='xcellenttravels@gmail.com'>
                                    <img src={mail} />
                                    <div>
                                        <span>Email</span>
                                        xcellenttravels@gmail.com
                                    </div>
                                </a>
                            </li>
                            <li className='login'>
                                <a href='#' title='Login/Signup'>
                                    <img src={user} />
                                    Login/Signup
                                </a>
                            </li>
                        </ul>
                        <div className='hamburger' onClick={() => setActive(!active)}>
                            <span className='bar'></span>
                        </div>
                        <div className='navigationWrapper'>
                            <nav>
                                <ul className='nav_menu header_menu'>
                                    <li className='menu_item linkEffect'>
                                        <Link to="/"><span data-hover="Home">Home</span></Link>
                                    </li>
                                    <li className='menu_item linkEffect'>
                                        <Link to="/"><span data-hover="About">About</span></Link>
                                    </li>
                                    <li className='menu_item linkEffect'>
                                        <Link to="/"><span data-hover="Booking">Booking</span></Link>
                                    </li>
                                    <li className='menu_item linkEffect'>
                                        <Link to="/"><span data-hover="Contact">Contact</span></Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;