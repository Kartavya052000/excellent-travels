import React, { useState } from "react";
import { Form } from "rsuite";

const Login = () => {

    const [isLogSignup, setLogSignup] = useState(false);

    const logSignupClick = event => {
    setLogSignup(current => !current);
    };

    return(
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
                            <Form.Control name='password' placeholder='Password' />
                        </div>
                        <button type="button" className='butn butn_success butn_sm'>Sign Up</button>

                        <span>or use your email for registration</span>
                        <div className="social-container">
                            <a href="#" className="social fb"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social google"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social linkedin"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </Form>
                </div>
                <div className="form-container sign-in-container">
                    <Form>
                        <h1>Sign in</h1>
                        <div className='formGrp'>
                            <Form.Control name='email' placeholder='Email' />
                        </div>
                        <div className='formGrp'>
                            <Form.Control name='password' placeholder='Password' />
                        </div>
                        <a href="#">Forgot your password?</a>
                        <button type='submit' className='butn butn_success butn_sm'>Sign In</button>
                        
                        <span>or use your account</span>
                        <div className="social-container">
                            <a href="#" className="social fb"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social google"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social linkedin"><i className="fab fa-linkedin-in"></i></a>
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