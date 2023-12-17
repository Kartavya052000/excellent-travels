import React, { useEffect, useState } from "react";
import { Form } from "rsuite";
import './assets/css/login.css';
import googleSvg from './assets/images/google.svg';
import AOS from "aos"; // Import AOS library
import axios from "axios";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
const Login = () => {
    useEffect(() => {
        AOS.init({ once: true }); // Initialize AOS on component mount
    }, []);
    const [isLogSignup, setLogSignup] = useState(false);
    const [email, SetEmail] = useState("")
    const [password, SetPassword] = useState("")
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const logSignupClick = event => {
        setLogSignup(current => !current);
    };
    const googleAuth = () => {
        // alert(process.env.REACT_APP_BACKEND_URL);

        window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/google/callback`, "_self")
    }


    const handleLogin = async () => {
        if (email === "") {
            setEmailError(true);
        }
        if (password === "") {
            setPasswordError(true);
        }
        if (email === "" || password === "") {
            return;
        }
        let formData = {
            email: email,
            password: password
        }
        try {
            // Make your API call here using Axios or any other library
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/auth/login', formData);
            // Handle response or perform actions after successful login
            console.log('Login successful!', response.data);
        } catch (error) {
            // Handle error or display error message to the user
            console.error('Login failed!', error);
        }
    };
    return (
        <>
            <section className='login_sec'>
                <div className={isLogSignup ? 'container right-panel-active' : 'container'}>
                    <div className="form-container sign-up-container">
                        <Form>
                            <h1>Create Account</h1>
                            <div className='formGrp'>
                                <Form.Control name='name' placeholder='Name' />
                            </div>
                            <div className='formGrp'>
                                <Form.Control name='email' placeholder='Email' />
                            </div>
                            <div className='formGrp'>
                                <Input.Password
                                    name='password'
                                    placeholder="Password"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </div>
                            <button type="button" className='butn butn_success butn_sm'>Sign Up</button>
                        </Form>
                    </div>
                    <div className="form-container sign-in-container">
                        <Form>
                            <h1>Log In</h1>
                            <div className='formGrp'>
                                <Form.Control
                                    name='email'
                                    type="email"
                                    placeholder='Email'
                                    value={email}
                                    onChange={(value) => {
                                        SetEmail(value);
                                        if (value == '') {
                                            setEmailError(true)
                                            return;
                                        }
                                        setEmailError(false);
                                    }}
                                    className={emailError ? 'error' : ''}
                                />
                                {emailError && <span className='errorTxt' style={{ color: "red" }}>Email is invalid</span>}
                            </div>
                            <div className='formGrp'>
                                <Input.Password
                                    name='password'
                                    placeholder="Password"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                                {/* <Form.Control
                                    name='password'
                                    type="password"
                                    placeholder='Password'
                                    value={password}
                                    onChange={(value) => {
                                        SetPassword(value);
                                        if (value == '') {
                                            setPasswordError(true)
                                            return;
                                        }
                                        setPasswordError(false)
                                    }}
                                    className={passwordError ? 'error' : ''} /> */}
                                {passwordError && <span className='errorTxt' style={{ color: "red" }}>Password is invalid</span>}
                            </div>
                            <a href="#">Forgot your password?</a>
                            <button
                                type='button'
                                className='butn butn_success butn_sm'
                                onClick={handleLogin} // Corrected onClick event
                            >Log In</button>
                            <span>OR</span>
                            <div className="social-container">
                                {/* <a href="#" className="social fb"><i className="fab fa-facebook-f"></i></a> */}
                                <button type="button" className="social" onClick={googleAuth}><img src={googleSvg} /> Sign in with Google</button>
                                {/* <a className="social google" onClick={googleAuth}><i className="fab fa-google-plus-g"></i></a> */}
                                {/* <a href="#" className="social linkedin"><i className="fab fa-linkedin-in"></i></a> */}
                            </div>
                        </Form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button className='butn ghost' id='signIn' onClick={logSignupClick}>Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <button className='butn ghost' id='signUp' onClick={logSignupClick}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login;