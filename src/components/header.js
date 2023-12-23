import React, { useState, useEffect } from 'react';
import { Drawer, ButtonToolbar, Button, Placeholder, Nav } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import phone from '../assets/images/phone.svg';
import mail from '../assets/images/mail.svg';
import user from '../assets/images/user.svg';
import googleSvg from '../assets/images/google.svg';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const token = cookies['token'];
    const username = cookies['username'];
    const [firstName, setFirstName] = useState('');
    const [firstletter, Setfirstletter] = useState('');

    useEffect(() => {
        if (username) {
            // Assuming the username is in the format: "firstname lastname"
            const firstName = username.split(' ')[0];
            const firstLetter = firstName.charAt(0); // Extracts the first letter of the first name
            Setfirstletter(firstLetter);
            setFirstName(firstName);
        }
    }, [username]);
    const handleRoute = () => {
        if (token) {
            navigate("/myprofile")
        } else {
            navigate("/login")
        }
    }
    // Create a function to handle user logout
    const handleLogout = async () => {
        try {
            // Send a request to the logout endpoint
            const url = `${process.env.REACT_APP_BACKEND_URL}/auth/logout `;

            const response = await axios.post(url);

            if (response.status === 200) {
                // Clear the token from cookies and any other cleanup
                removeCookie('token');
                removeCookie('username');

                // Redirect or perform any other action after successful logout
                // For example, you can redirect the user to the home page
                navigate("/")
                setOpen(false)
            } else {
                console.error('Logout failed', response);
            }
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const googleAuth = () => {
        window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/google/callback`, "_self")
    }

    const [openModal, setOpenModal] = React.useState(false);
    const [overflow, setOverflow] = React.useState(true);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

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
                            <li className='login' onClick={handleRoute} >
                                <Link title='Login/Signup'>
                                    {token ? (
                                        <>
                                            <div className="circle">
                                                <div className="letter">{firstletter}</div>
                                            </div>
                                            <span>Hi, {firstName}</span>
                                        </>
                                    ) : (
                                        <>
                                            <img src={user} />
                                            <span>Login/Signup</span>
                                        </>
                                    )}
                                </Link>
                            </li>
                            {/* <li>
                                <Button onClick={handleOpen} className='butn butn_success butn_rounded'>Login</Button>
                            </li> */}
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
                                        <li className='menu_item linkEffect' onClick={() => setOpen(false)}>
                                            <Link to="/"><span data-hover="Home"><i className='fa fa-home'></i> Home</span></Link>
                                        </li>
                                        <li className='menu_item linkEffect' onClick={() => setOpen(false)}>
                                            <Link to="/about"><span data-hover="About">About</span></Link>
                                        </li>
                                        <li className='menu_item linkEffect' onClick={() => setOpen(false)}>
                                            <Link to="/founderprofile"><span data-hover="Founder Profile">Founder Profile</span></Link>
                                        </li>
                                        <li className='menu_item linkEffect' onClick={() => setOpen(false)}>
                                            <Link to="/myprofile"><span data-hover="My Profile">My Profile</span></Link>
                                        </li>
                                        <li className='menu_item linkEffect' onClick={() => setOpen(false)}>
                                            <Link to="/mysubmissions"><span data-hover="My Submissions">My Submissions</span></Link>
                                        </li>
                                        <li className='menu_item linkEffect' onClick={() => setOpen(false)}>
                                            <Link to="/contact"><span data-hover="Contact">Contact</span></Link>
                                        </li>
                                        {token ? (
                                            <li className='menu_item linkEffect' onClick={handleLogout}>
                                                <Link><span data-hover="LogOut"><i className='fa fa-sign-out'></i> LogOut</span></Link>
                                            </li>
                                        ) : null}
                                    </ul>
                                </Nav>
                            </Drawer.Body>
                        </Drawer>
                    </div>
                </div>
            </header>

        </>
    )
}

export default Header;