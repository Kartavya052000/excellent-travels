import React, { useEffect, useState } from "react";
import { Form } from "rsuite";
import InnerHeader from "./components/innerHeader/innerHeader";
import './assets/css/myprofile.css';
import { useCookies } from 'react-cookie';
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { formatPhoneNumberIntl } from 'react-phone-number-input'
const MyProfile = () => {

    const [cookies] = useCookies(['token']);
    const token = cookies['token'];

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")

    const handleError = (err) =>
        toast.error(err, {
            position: "top-left",
        });
    const handleSuccess = (msg) =>
        toast.success(msg, {
            position: "top-right",
        });
    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            const url = `${process.env.REACT_APP_BACKEND_URL}/auth/my-profile`;
            const { data } = await axios.get(url, {
                headers: {
                    'Authorization': `${token}`, // Correct the token format
                },
            });
            setEmail(data.user.email);
            setUsername(data.user.username)

        } catch (error) {
            console.error(error);
        }
    }

    const handleUsernameChange = (value) => {
        setUsername(value)
    };
    const handleEmailChange = (value) => {
        setEmail(value)
    }
    const handleSubmit = async (e) => {
        // e.preventDefault();
        if (email || username) {
            handleError("fields can not be empty")
            return
        }
        let profile = {
            email: email,
            username: username
        }
        const url = `${process.env.REACT_APP_BACKEND_URL}/auth/update-profile`;
        const response = await axios.put(url, profile, {
            headers: {
                Authorization: token
            },
        });

        try {
            const { success, message, token } = response.data;

            if (success) {

                handleSuccess(message);

            } else {
                handleError(message);
            }
            // getProfile()
            // Optional: Display success message or handle success case
        } catch (error) {
            console.error(error);
            // Optional: Display error message or handle error case
        }
    }

    return (
        <>
            <InnerHeader value='My Profile' />
            <section className='myprofile_sec'>
                <div className='custom-container'>
                    <Form onSubmit={handleSubmit}>
                        <div className='formGrp'>
                            <Form.ControlLabel>Name</Form.ControlLabel>
                            <Form.Control
                                name='username'
                                placeholder='Name'
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </div>
                        <div className='formGrp'>
                            <Form.ControlLabel>Email</Form.ControlLabel>
                            <Form.Control
                                name='email'
                                placeholder='Email'
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        {/* <div className="formGrp">
                        <PhoneInput
                                    placeholder="Enter phone number"
                                    // value={phonevalue}
                                    // onChange={setPhoneValue}
                                    // onChange={(value) => {
                                    //     setPhoneValue(value);
                                    //     if (value == '') {
                                    //         setPhoneError(true)
                                    //         return;
                                    //     }
                                    //     setPhoneError(false);
                                    // }}
                                    // defaultCountry={countryCode} // Set the country code dynamically here
                                    // className={phoneerror ? 'error' : ''}

                                />
                        </div> */}
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
