import React, { useState } from 'react';
import { Drawer, ButtonToolbar, Button, Placeholder, Nav } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import phone from '../assets/images/phone.svg';
import mail from '../assets/images/mail.svg';
import user from '../assets/images/user.svg';

const Header = () => {

    const [open, setOpen] = React.useState(false);
    return (
        <>
            <header className='mainHeader'>
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
                                <a href='tel:6046796293' title='604 679 6293'>
                                    <img src={phone} />
                                    <div>
                                        <span>Call Us</span>
                                        604 679 6293
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href='mailto:xcellenttourstravels@gmail.com' title='xcellenttourstravels@gmail.com'>
                                    <img src={mail} />
                                    <div>
                                        <span>Email</span>
                                        xcellenttourstravels@gmail.com
                                    </div>
                                </a>
                            </li>
                            <li className='login'>
                                <Link to='/login' title='Login/Signup'>
                                    <img src={user} />
                                    Login/Signup
                                </Link>
                            </li>
                        </ul>
                        <ButtonToolbar>
                            <Button className='hamburger' onClick={() => setOpen(true)}>
                                <span className='bar'></span>
                            </Button>
                        </ButtonToolbar>

                        <Drawer size='xs' placement='right' backdrop='true' open={open} onClose={() => setOpen(false)}>
                            <Drawer.Body>
                            <Nav className='navigationWrapper'>
                            <ul className='nav_menu header_menu'>
                                <li className='menu_item linkEffect' onClick={()=> setOpen(false)}>
                                    <Link to="/"><span data-hover="Home">Home</span></Link>
                                </li>
                                <li className='menu_item linkEffect' onClick={()=> setOpen(false)}>
                                    <Link to="/about"><span data-hover="About">About</span></Link>
                                </li>
                                <li className='menu_item linkEffect' onClick={()=> setOpen(false)}>
                                    <Link to="/founderprofile"><span data-hover="Founder Profile">Founder Profile</span></Link>
                                </li>
                                <li className='menu_item linkEffect' onClick={()=> setOpen(false)}>
                                    <Link to="/myprofile"><span data-hover="My Profile">My Profile</span></Link>
                                </li>
                                <li className='menu_item linkEffect' onClick={()=> setOpen(false)}>
                                    <Link to="/mysubmissions"><span data-hover="My Submissions">My Submissions</span></Link>
                                </li>
                                <li className='menu_item linkEffect' onClick={()=> setOpen(false)}>
                                    <Link to="/contact"><span data-hover="Contact">Contact</span></Link>
                                </li>
                            </ul>
                            </Nav>
                            </Drawer.Body>
                        </Drawer>
                        <div className='navigationWrapper'>
                            <nav>
                                
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;