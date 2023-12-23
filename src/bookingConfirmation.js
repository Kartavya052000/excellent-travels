import React from "react";
import './assets/css/mysubmissions.css';
import InnerHeader from "./components/innerHeader/innerHeader";
import { Link } from "react-router-dom";

const BookingConfirmation = () => {
    return(
        <>
        <InnerHeader value='Booking-Submission' />
        <section className='mybookings'>
            <div className='custom-container'>
                

                <div className='submissionCard'>
                    <svg class="success-svg" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
                        <g fill="none" fill-rule="evenodd" stroke="#177EE6">
                            <circle class="success-circle" cx="40" cy="40" r="39" stroke-width="2"/>
                            <polyline class="success-checkmark" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" points="24.5 41.5 34.5 51.5 55.5 30.5"/>
                        </g>
                    </svg>
                    <p>Your submission is confirmed. You’ll get more update from Xcellent Travels.</p>
                    <Link to='/' className='butn butn_success butn_sm butn_rounded'>Back to home</Link>
                </div>
            </div>
        </section> 
        </>
    )
}

export default BookingConfirmation;