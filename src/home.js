import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Slider from "react-slick";
import AOS from 'aos';
import 'aos/dist/aos.css';
import heroBanner from './assets/images/hero_banner.png';
import aboutUs from './assets/images/aboutus.png';
import explore from './assets/images/explore.png';
import client1 from './assets/images/client1.png';
import client2 from './assets/images/client2.png';
import client3 from './assets/images/client3.png';
import quesIc from './assets/images/quesIc.jpg';
import AccordionItem from "./components/ui/accordion";
import { DatePicker, Input, InputPicker, SelectPicker } from "rsuite";
import { motion, useScroll, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();

    var sliderSetts = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 575,
              settings: {
                slidesToShow: 1
              }
            }
          ]
    };

    const faqs = [
        {
            id: 1,
            icon: `${quesIc}`,
            header: "What are the advantages of online hotel booking?",
            text: "You can easily book a hotel by visiting our website or contacting our dedicated travel advisors. Enter your details and proceed to secure your booking.",
            image_src: `${heroBanner}`
        },
        {
            id: 2,
            icon: `${quesIc}`,
            header: "What types of accommodations do you offer?",
            text: "Xcellent Travels provides a wide range of accommodation options, from budget-friendly to luxury hotels. Explore our platform to find the perfect stay that suits your preferences and budget.",
            image_src: `${heroBanner}`
        },
        {
            id: 3,
            icon: `${quesIc}`,
            header: "Are there any hidden fees when booking a hotel through Xcellent Travels?",
            text: "No hidden fees. The price you see is the price you pay. Our transparent booking process ensures clarity, and we strive to provide the best value for your stay.",
            image_src: `${heroBanner}`
        },
        {
            id: 4,
            icon: `${quesIc}`,
            header: "Can Xcellent Travels help plan both personal and corporate events?",
            text: "Absolutely! Xcellent Travels specializes in both personal and corporate event planning. Whether it's a wedding, anniversary, conference, or team-building event, we have you covered.",
            image_src: `${heroBanner}`
        },
        {
            id: 5,
            icon: `${quesIc}`,
            header: "How do I get started with planning an event with Xcellent Travels?",
            text: "Begin by contacting our events team. We'll discuss your vision, requirements, and preferences to create a customized plan. Our goal is to make your event stress-free and memorable.",
            image_src: `${heroBanner}`
        }
    ]

    const [active, setActive] = useState(null);

    const handleToggle = (index) => {
        if (active === index) {
            setActive(null);
        } else {
            setActive(index);
        }
    }

    useEffect(() => {
        AOS.init({once: true});
    }, [])

    const rooms = ['1', '2', '3', '4', '5'].map(
        item => ({ label: item, value: item })
    );

    const destination = ['Alaska', 'Antarctica', 'Bermuda', 'Hawaii', 'North America', 'South America', 'South Pacific', 'World Cruise'].map(
        item => ({ label: item, value: item })
    );

    const departure = ['November 2023', 'December 2023', 'January 2024', 'February 2024', 'March 2024', 'April 2024', 'May 2024', 'June 2024'].map(
        item => ({ label: item, value: item })
    );

    const cruiseLine = ['Azamara', 'Carnival Cruise Line', 'Celebrity Cruises', 'Cunard', 'Disney Cruise Line'].map(
        item => ({ label: item, value: item })
    );

    const duration = ['1-2 Nights', '3-6 Nights', '7-10 Nights', '11-14 Nights', '15 Nights or More'].map(
        item => ({ label: item, value: item })
    );

    const { scrollYProgress } = useScroll();

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 30,
        restDelta: 0.001
    });
const onSearch = () =>{
    navigate('/mysubmissions')
}
    return (
        <>
            <motion.div className='progressBar' style={{ scaleX }} />

            <section className='hero_sec' style={{backgroundImage: `url(${heroBanner})`}}>
                <div className='hero_overlay'></div>
                <div className='custom-container'>
                    <div className='hero_inner'>
                        <div className='hero_info'>
                            <span data-aos='fade-up' data-aos-duration='1500'>Book With Us</span>
                            <h2 data-aos='fade-up' data-aos-duration='1500'>Find  Next place to visit</h2>
                        </div>
                    </div>
                </div>
            </section>
            <section className='tab_form_sec'>
                <div className='custom-container'>
                    <div className='tabs_inner'>
                        <Tabs>
                            <TabList>
                                <Tab><i className='fas fa-hotel'></i> Hotels</Tab>
                                <Tab><i className='fa fa-car'></i> Car Hire</Tab>
                                <Tab><i className='fa fa-plane'></i> Flights</Tab>
                                <Tab><i className='fa fa-ship'></i> Cruise</Tab>
                            </TabList>
                            <TabPanel>
                                <div className='tabForm'>
                                    <form className='inline_Form'>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='destination'>Destination</label>
                                            <Input appearance='subtle' id='destination' placeholder='Airport/City/Postal Code' />
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='checkIn'>Check In</label>
                                            <DatePicker id='checkIn' format='MM/dd/yyyy' />
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='checkOut'>Check Out</label>
                                            <DatePicker id='checkOut' format='MM/dd/yyyy' />
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='room'>Room</label>
                                            <InputPicker id='room' data={rooms} appearance="subtle" />
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='adults'>Adults(19+)</label>
                                            <InputPicker id='adults' data={rooms} appearance="subtle" />
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='children'>Children(0-18)</label>
                                            <InputPicker id='children' data={rooms} appearance="subtle" />
                                        </div>
                                        <div className='formBtn'>
                                            <button type='submit' className='butn butn_success' onClick={onSearch} >Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className='tabForm'>
                                    Tab Coming Soon
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className='tabForm'>
                                    <form className='inline_Form'>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='fromLoc'>From</label>
                                            <Input id='fromLoc' placeholder="Enter Location" />
                                        </div>
                                        <div className='formGrp'>
                                            <button type='button' className='interchnge'><i className='fa fa-arrow-right-arrow-left'></i></button>
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='toLoc'>To</label>
                                            <Input id='toLoc' placeholder="Enter Location" />
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='departure'>Departure</label>
                                            <DatePicker id='departure' format='MM/dd/yyyy' appearance='subtle' />
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='return'>Return</label>
                                            <DatePicker id='return' format='MM/dd/yyyy' appearance='subtle' />
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='travellers'>Travellers</label>
                                            <Input id='travellers' placeholder="Travellers" />
                                        </div>
                                        <div className='formBtn'>
                                            <button type='submit' className='butn butn_success' onClick={onSearch}>Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className='tabForm'>
                                    <form className='inline_Form'>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='destination'>Destination</label>
                                            <SelectPicker id='destination' data={destination} appearance='subtle' />
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='departure'>Departure</label>
                                            <Input id='departure' placeholder='Departure Month' />
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='cruiseLine'>Cruise Line</label>
                                            <SelectPicker id='cruiseLine' data={cruiseLine} appearance='subtle' />
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='duration'>Duration</label>
                                            <Input id='duration' placeholder='Duration' />
                                        </div>
                                        <div className='formBtn'>
                                            <button type='submit' className='butn butn_success' onClick={onSearch} >Search</button>
                                        </div>
                                    </form>
                                </div>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </section>

            <section className='about_sec'>
                <div className='custom-container'>
                    <div className='custom_row'>
                        <div className='imgCol' data-aos='fade-right' data-aos-duration='1500'>
                            <img src={aboutUs} alt='Who We Are' />
                        </div>
                        <div className='cont_Col' data-aos='fade-left' data-aos-duration='1500'>
                            <div className='sec_ttl'>
                                <h6><span></span> About Us</h6>
                                <h2>Who We Are</h2>
                                <p>At Xcellent Travels, we redefine your journey with seamless travel experiences. 
                                    As your premier travel partner, we specialize in offering a range of services 
                                    to elevate your travel adventure. From hassle-free flight bookings to luxurious 
                                    hotel accommodations, invigorating cruise control packages, and convenient car 
                                    hires, we provide comprehensive solutions tailored to your unique preferences. 
                                    Discover the world with confidence, knowing that Xcellent Travels is dedicated 
                                    to turning your travel dreams into reality. Your journey begins with us – 
                                    where excellence meets exploration.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='explore_sec'>
                <div className='custom-container'>
                    <div className='custom_row'>
                        <div className='cont_Col' data-aos='fade-right' data-aos-duration='1500'>
                            <div className='sec_ttl'>
                                <h6><span></span> Explore</h6>
                                <h2>Explore all corners of the world with us</h2>
                            </div>
                            <p>Welcome to Xcellent Travels, your gateway to extraordinary adventures. 
                                Elevate your travel experience with seamless flight, hotel, and car 
                                bookings tailored to your preferences. But our journey doesn't end there
                                 – we're also your go-to for crafting unforgettable events.
                            </p>
                            <div className='serv_wrap'>
                                <div className='serv_card'>
                                    <i className='fa fa-plane'></i>
                                    <span>Flight</span>
                                </div>
                                <div className='serv_card'>
                                    <i className='fas fa-hotel'></i>
                                    <span>Hotel</span>
                                </div>
                                <div className='serv_card'>
                                    <i className='fas fa-car'></i>
                                    <span>Cars</span>
                                </div>
                                <div className='serv_card'>
                                    <i className='fa fa-calendar-xmark'></i>
                                    <span>Events</span>
                                </div>
                            </div>
                        </div>
                        <div className='imgCol' data-aos='fade-left' data-aos-duration='1500'>
                            <img src={explore} alt='Explore' />
                        </div>
                    </div>
                </div>
            </section>

            <section className='testimonial_sec bordSec'>
                <div className='custom-container'>
                    <div className='testimonial_inner'>
                        <div className='sec_ttl' data-aos='fade-up' data-aos-duration='1500'>
                            <h6>Review <span></span></h6>
                            <h2>Testimonials</h2>
                        </div>
                        <div className='testi_slider' data-aos='zoom-in' data-aos-duration='1500'>
                            <Slider {...sliderSetts}>
                                <div>
                                    <div className='testiCont'>
                                        <img src={client1} alt='Sarah M.' />
                                        <p>Xcellent Travels transformed my travel experiences! From seamless flight bookings to exquisite hotel stays, they curated my dream itinerary.</p>
                                        <h3>Sarah M.</h3>
                                    </div>
                                </div>
                                <div>
                                    <div className='testiCont'>
                                        <img src={client2} alt='Emily P.' />
                                        <p>Xcellent Travels made my event unforgettable! The team's creativity and precision turned my vision into reality. They truly know how to make every moment special.</p>
                                        <h3>Emily P.</h3>
                                    </div>
                                </div>
                                <div>
                                    <div className='testiCont'>
                                        <img src={client3} alt='Mike H.' />
                                        <p>Xcellent Travels made our road trip epic! The car booking process was a breeze. They truly understand the art of crafting unforgettable experiences.</p>
                                        <h3>Mike H.</h3>
                                    </div>
                                </div>
                                <div>
                                    <div className='testiCont'>
                                        <img src={client2} alt='Emily P.' />
                                        <p>Xcellent Travels made my event unforgettable! The team's creativity and precision turned my vision into reality. They truly know how to make every moment special.</p>
                                        <h3>Emily P.</h3>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </section>

            <section className='faq_sec'>
                <div className='custom-container'>
                    <div className='sec_ttl textCenter'>
                        <h6><span></span> FAQ <span></span></h6>
                        <h2>Frequently Asked Questions</h2>
                    </div>
                    <div className='accordion_main' data-aos='fade-up' data-aos-duration='1500'>
                        {faqs.map((item, index) => {
                            return (
                                <AccordionItem key={index} active={active} handleToggle={handleToggle} faq={item} />
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home;