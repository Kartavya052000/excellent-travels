import React, { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import './assets/css/contact.css';
import InnerHeader from "./components/innerHeader/innerHeader";
import { Form } from "rsuite";
import { motion } from "framer-motion";

const Contact = () => {

    useEffect(() => {
        AOS.init({once: true});
    }, [])

    return (
        <>
            <InnerHeader value='Contact' />

            <motion.div
                animate={{ x: 100 }}
                transition={{ type: "spring", bounce: 0.25 }}
            />

            <section className='map_sec'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43071690.85219364!2d-135.785643961446!3d48.784040243040344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b0d03d337cc6ad9%3A0x9968b72aa2438fa5!2sCanada!5e0!3m2!1sen!2sin!4v1701174135388!5m2!1sen!2sin" width="500" height="250" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </section>
            
            <section className='contact_sec'>
                <div className='custom-container'>
                    <div className='custom_row'>
                        <div className='card_col'>
                            <div className='contact_card'>
                                <a href='tel:6046796293'>
                                    <i className='fa fa-phone'></i>
                                    <span>604 679 6293</span>
                                </a>
                                <a href='tel:6045917778'>
                                    <i className='fa fa-fax'></i>
                                    <span>604 591 7778</span>
                                </a>
                                <a href='mailto:xcellenttourstravels@gmail.com'>
                                    <i className='fa fa-envelope'></i>
                                    <span>xcellenttourstravels@gmail.com</span>
                                </a>
                            </div>
                        </div>
                        <div className='form_Col'>
                            <div className='contact_inner'>
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

                                    <div className='formBtn'>
                                        <button type='submit' className='butn butn_success'>Get Quotes</button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact;