import React, { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import './assets/css/contact.css';
import InnerHeader from "./components/innerHeader/innerHeader";
import { Form } from "rsuite";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { Navigate, useNavigate } from "react-router-dom";

const Contact = () => {
    const navigate = useNavigate()
    const [formErrors, setFormErrors] = useState({
        name: false,
        email: false,
        phone: false,
        subject: false,
        message: false
    });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const handleInputChange = (fieldName, value) => {
        const fieldValue = typeof value === 'object' ? value.target.value : value;
    
        setFormData({ ...formData, [fieldName]: fieldValue });
        setFormErrors({ ...formErrors, [fieldName]: fieldValue.trim() === '' });
    };
    
    const handleError = (err) =>
        toast.error(err, {
            position: "top-left",
        });
    const handleSuccess = (msg) =>
        toast.success(msg, {
            position: "top-right",
        });
    useEffect(() => {
        AOS.init({ once: true });
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedFormErrors = {
            name: formData.name.trim() === '',
            email: formData.email.trim() === '',
            phone: formData.phone.trim() === '',
            subject: formData.subject.trim() === '',
            message: formData.message.trim() === ''
        };
    
        setFormErrors(updatedFormErrors);
        // Check if there are any errors before making the API call
        const hasErrors = Object.values(formErrors).some((error) => error);
        if (hasErrors) {
            // Handle form errors before making the API call
            console.log('Form has errors. Cannot submit.');
            return;
        }

        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL +"/save-contact", {
                method: 'POST', // or 'GET', 'PUT', 'DELETE', etc.
                headers: {
                    'Content-Type': 'application/json'
                    // Add any other headers as needed
                },
                body: JSON.stringify(formData) // Convert form data to JSON
            });

            // if (!response.ok) {
            //     // Handle the error if the API call fails
            //     throw new Error('Network response was not ok');
            // }
           handleSuccess("Form Submitted Successfully")
           setTimeout(()=>{
            navigate("/")

           },2000)
            // Handle the successful API call response here
            console.log('API call successful!');
            // Reset form fields or perform any other action on success
        } catch (error) {
           handleSuccess("Form not submitted")

            // Handle any errors that occurred during the API call
            console.error('There was a problem with the API call:', error.message);
        }
    };
    return (
        <>
            <InnerHeader value='Contact' />

            <motion.div
                animate={{ x: 100 }}
                transition={{ type: "spring", bounce: 0.25 }}
            />

            {/* <section className='map_sec'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43071690.85219364!2d-135.785643961446!3d48.784040243040344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b0d03d337cc6ad9%3A0x9968b72aa2438fa5!2sCanada!5e0!3m2!1sen!2sin!4v1701174135388!5m2!1sen!2sin" width="500" height="250" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </section> */}

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
                                <a href='mailto:info@xcellenttoursandtravels.com'>
                                    <i className='fa fa-envelope'></i>
                                    <span>info@xcellenttoursandtravels.com</span>
                                </a>
                            </div>
                        </div>
                        <div className='form_Col'>
                            <div className='contact_inner'>
                                <Form>
                                    <div className='formGrp'>
                                        <Form.ControlLabel>Name</Form.ControlLabel>
                                        <Form.Control
                                         name='name'
                                          placeholder='Name'
                                          value={formData.name}
                                          onChange={(value) => handleInputChange('name', value)}
                                          className={formErrors.name ? 'error' : ''}
                                           required />
                                    </div>
                                    <div className='formGrp'>
                                        <Form.ControlLabel>Email</Form.ControlLabel>
                                        <Form.Control
                                         name='email' 
                                         placeholder='Email'
                                         onChange={(value) => handleInputChange('email', value)}
                                         value={formData.email}
                                         className={formErrors.email ? 'error' : ''}
                                         required />
                                    </div>
                                    <div className='formGrp'>
                                        <Form.ControlLabel>Phone</Form.ControlLabel>
                                        <Form.Control
                                         name='phone'
                                          placeholder='Phone'
                                          value={formData.phone}
                                          onChange={(value) => handleInputChange('phone', value)}
                                          className={formErrors.phone ? 'error' : ''}
                                          required />
                                    </div>

                                    <div className='formGrp'>
                                        <Form.ControlLabel>Subject</Form.ControlLabel>
                                        <Form.Control
                                         name='subject'
                                          placeholder='Subject'
                                          onChange={(value) => handleInputChange('subject', value)}
                                          value={formData.subject}
                                          className={formErrors.subject ? 'error' : ''}
                                           required />
                                    </div>

                                    <div className='formGrp'>
                                        <Form.ControlLabel>Message</Form.ControlLabel>
                                        <textarea 
                                        name='msg' 
                                        placeholder='Message'
                                        onChange={(value) => handleInputChange('message', value)}
                                        value={formData.message}
                                         className={formErrors.message ? 'error' : ''}
                                         required

                                         ></textarea>
                                    </div>

                                    <div className='formBtn'>
                                        <button type='submit' className='butn butn_success' onClick={handleSubmit}>Get Quotes</button>
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