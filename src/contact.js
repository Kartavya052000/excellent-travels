import React, { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import './assets/css/contact.css';
import InnerHeader from "./components/innerHeader/innerHeader";
import { Form, Input } from "rsuite";
import { useRef } from "react";
import { motion } from "framer-motion";
// import { useFollowPointer } from "./use-follow-pointer";

const Contact = () => {

    useEffect(() => {
        AOS.init({once: true});
    }, [])

    // const ref = useRef(null);
    // const { x, y } = useFollowPointer(ref);

    return (
        <>
            <InnerHeader value='Contact' />

            {/* <motion.div
                ref={ref}
                className="box"
                animate={{ x, y }}
                transition={{
                    type: "spring",
                    damping: 3,
                    stiffness: 50,
                    restDelta: 0.001
                }}
            /> */}

<motion.div
  animate={{ x: 100 }}
  transition={{ type: "spring", bounce: 0.25 }}
/>

            <section className='contact_sec'>
                <div className='custom-container'>
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
                        <div className='map_sec'>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43071690.85219364!2d-135.785643961446!3d48.784040243040344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b0d03d337cc6ad9%3A0x9968b72aa2438fa5!2sCanada!5e0!3m2!1sen!2sin!4v1701174135388!5m2!1sen!2sin" width="400" height="250" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact;