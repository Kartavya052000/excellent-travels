import React, { useEffect, useState } from "react";
import { Form } from "rsuite";
import './assets/css/login.css';
import googleSvg from './assets/images/google.svg';
import AOS from "aos"; // Import AOS library
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Navigate, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

const Login = () => {
    const navigate=useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const token = cookies['token'];
    useEffect(() => {
        AOS.init({ once: true }); // Initialize AOS on component mount
    }, []);
    const [isLogSignup, setLogSignup] = useState(false);
    const [email, SetEmail] = useState("")
    const [username, SetUsername] = useState("")
    const [password, SetPassword] = useState("")
    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUserNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const logSignupClick = event => {
        setLogSignup(current => !current);
        setEmailError(false)
        setPasswordError(false)
        SetEmail("")
        SetPassword("")
        setUserNameError(false)
    };
    const googleAuth = () => {
        // alert(process.env.REACT_APP_BACKEND_URL);

        window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/google/callback`, "_self")
    }
    const handleError = (err) =>
    toast.error(err, {
      position: "top-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });

    const handleLogin = async () => {
        if (email === "") {
            setEmailError(true);
        }
        if (password === "") {
            setPasswordError(true);
        }
      
        if (email === "" || password === "" ) {
            return;
        }
        let formData = {
            email: email,
            password: password,
            provider:"local"
        }
        try {
            // Make your API call here using Axios or any other library
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/auth/login', formData);
            // Handle response or perform actions after successful login
            // console.log('SignUp successful!', response.data);
            const { success, message,token } = response.data;
            if (success) {
              setCookie("token", token, { path: "/" });
        
              handleSuccess(message);
              setTimeout(() => {
                navigate("/");
              }, 1000);
            } else {
              handleError(message);
            }

        } catch (error) {
            handleError(error.message);

            // Handle error or display error message to the user
            // console.error('Signup failed!', error);
        }
    };
    const handleSignin = async () => {
        if (email === "") {
            setEmailError(true);
        }
        if (password === "") {
            setPasswordError(true);
        }
        if (username == "") {
            setUserNameError(true)
        }
        if (email === "" || password === "" || username === "") {
            return;
        }
        let formData = {
            username: username,
            email: email,
            password: password,
            provider:"local"

        }
        try {
            // Make your API call here using Axios or any other library
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/auth/signup', formData);
            // Handle response or perform actions after successful login
            // console.log('Login successful!', response.data);
            setCookie('token', response.data.token, { path: '/', secure: true });
            setCookie('username', response.data.user.username   , { path: '/', secure: true });

            const { success, message,token } = response.data;
            if (success) {
              setCookie("token", token, { path: "/" });
        
              handleSuccess(message);
              setTimeout(() => {
                navigate("/");
              }, 1000);
            } else {
              handleError(message);
            }
        } catch (error) {
            // Handle error or display error message to the user
            // console.error('Login failed!', error);
            handleError(error.message)

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
                                <Form.Control
                                    name='name'
                                    placeholder='Name'
                                    value={username}
                                    onChange={(value) => {
                                        SetUsername(value);
                                        if (value == '') {
                                            setUserNameError(true)
                                            return;
                                        }
                                        setUserNameError(false);

                                    }}
                                    className={usernameError ? 'error' : ''}

                                />
                                {usernameError && <span className='errorTxt' style={{ color: "red" }}>Username is invalid</span>}                            

                            </div>
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
                                {emailError && <span className='errorTxt' style={{ color: "red" }}>Email is invalid</span>}                            </div>
                            <div className='formGrp'>
                                <Input.Password
                                    name='password'
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                        SetPassword(e.target.value);
                                        if (e.target.value == '') {
                                            setPasswordError(true)
                                            return;
                                        }
                                        setPasswordError(false)
                                    }}
                                    className={passwordError ? 'error' : ''}
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />

                                {passwordError && <span className='errorTxt' style={{ color: "red" }}>Password is invalid</span>}
                            </div>
                            <button type="button" className='butn butn_success butn_sm' onClick={handleSignin}>Sign Up</button>
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
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                        SetPassword(e.target.value);
                                        if (e.target.value == '') {
                                            setPasswordError(true)
                                            return;
                                        }
                                        setPasswordError(false)
                                    }}
                                    className={passwordError ? 'error' : ''}
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />

                                {passwordError && <span className='errorTxt' style={{ color: "red" }}>Password is invalid</span>}
                            </div>
                            <a href="/forgot-password">Forgot your password?</a>
                            <button
                                type='button'
                                className='butn butn_success butn_sm'
                                onClick={handleLogin} // Corrected onClick event
                            >Log In</button>
                            <span>OR</span>
                            <div className="social-container">
                                <button type="button" className="social" onClick={googleAuth}><img src={googleSvg} /> Sign in with Google</button>
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