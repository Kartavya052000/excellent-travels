import React, { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import './assets/css/about.css';
import InnerHeader from "./components/innerHeader/innerHeader";
import aboutImg from './assets/images/aboutus.png';

const About = () => {

    useEffect(() => {
        AOS.init({once: true});
    }, [])

    return (
        <>
            <InnerHeader value='About' />
            
            <section className='aboutus_sec' data-aos='fade-up' data-aos-duration='1200'>
                <div className='custom-container'>
                    <div className='custom_row'>
                        <div className='imgCol'>
                            <img src={aboutImg} alt='About Us' />
                        </div>
                        <div className='cont_Col'>
                            <div className='about_cont'>
                                <p>At Xcellent Travels, we redefine your journey with seamless travel experiences. 
                                    As your premier travel partner, we specialize in offering a range of services to elevate your travel adventure.
                                    <br/>
                                    From hassle-free flight bookings to luxurious hotel accommodations, invigorating cruise control packages, 
                                    and convenient car hires, we provide comprehensive solutions tailored to your unique preferences. 
                                    Discover the world with confidence, knowing that Xcellent Travels is dedicated to 
                                    turning your travel dreams into reality. Your journey begins 
                                    with us – where excellence meets exploration.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default About;