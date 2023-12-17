import React, { useState } from "react";
import { Form } from "rsuite";
import InnerHeader from "./components/innerHeader/innerHeader";
import './assets/css/myprofile.css';

const MyProfile = () => {

    return(
        <>
        <InnerHeader value='My Profile' />
        
        <section className='myprofile_sec'>
            <div className='custom-container'>
                <Form>
                    <div className='formGrp'>
                        <Form.ControlLabel>Name</Form.ControlLabel>
                        <Form.Control name='name' placeholder='Name' />
                    </div>
                    <div className='formGrp'>
                        <Form.ControlLabel>Email</Form.ControlLabel>
                        <Form.Control name='email' placeholder='Email' />
                    </div>
                    <div className='formGrp'>
                        <Form.ControlLabel>Phone</Form.ControlLabel>
                        <Form.Control name='phone' placeholder='Phone' />
                    </div>
                    <div className='formGrp'>
                        <Form.ControlLabel>Message</Form.ControlLabel>
                        <textarea name='msg' className="rs-input" placeholder='Message'></textarea>
                    </div>

                    <div className='formBtn'>
                        <button type='submit' className='butn butn_success'>Update</button>
                    </div>
                </Form>
            </div>
        </section> 
        </>
    )
}

export default MyProfile;