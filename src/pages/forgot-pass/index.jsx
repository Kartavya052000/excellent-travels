import React from 'react'
import InnerHeader from '../../components/innerHeader/innerHeader'
import { Form } from "rsuite";
import '../../assets/css/login.css';

const ForgotPass = () => {
    return (
        <>

            <InnerHeader value='Forgot-Password' />
            <section className='forget_sec'>

                <div className='formGrp'>
                    <Form>
                        <label>Email</label>
                        < Form.Control
                            name='email'
                            type="email"
                            placeholder='Email'
                            className='forinput'

                        />
                        <button
                            type='button'
                            className='butn butn_success butn_sm'
                        >Submit</button>
                    </Form>
                </div>
            </section>


        </>
    )
}

export default ForgotPass
