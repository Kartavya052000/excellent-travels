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

const Home = () => {

    var sliderSetts = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    const faqs = [
        {
            id: 1,
            icon: `${quesIc}`,
            header: "What are the advantages of online hotel booking?",
            text: "We have multiple trucks available, each with 7-9 separate ad spaces available.",
            image_src: `${heroBanner}`
        },
        {
            id: 2,
            icon: `${quesIc}`,
            header: "What are the advantages of online hotel booking?",
            text: "We have multiple trucks available, each with 7-9 separate ad spaces available. The Tri-Vision panels on the truck rotate on a timer allowing up to 3 separate billboards, on each side of the truck. Availabiltiy will vary depending on the contracts in place, feel free to check in with us for current availabilities.",
            image_src: `${heroBanner}`
        },
        {
            id: 3,
            icon: `${quesIc}`,
            header: "What are the advantages of online hotel booking?",
            text: " Availabiltiy will vary depending on the contracts in place, feel free to check in with us for current availabilities.",
            image_src: `${heroBanner}`
        },
        {
            id: 4,
            icon: `${quesIc}`,
            header: "What are the advantages of online hotel booking?",
            text: " Availabiltiy will vary depending on the contracts in place, feel free to check in with us for current availabilities.",
            image_src: `${heroBanner}`
        },
        {
            id: 5,
            icon: `${quesIc}`,
            header: "What are the advantages of online hotel booking?",
            text: " Availabiltiy will vary depending on the contracts in place, feel free to check in with us for current availabilities.",
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

    return (
        <>
            <section className='hero_sec' style={{backgroundImage: `url(${heroBanner})`}}>
                <div className='hero_overlay'></div>
                <div className='custom-container'>
                    <div className='hero_inner'>
                        <div className='hero_info'>
                            <span>Book With Us</span>
                            <h2>Find  Next place to visit</h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className='tab_form_sec' data-aos='fade-up' data-aos-duration='1500'>
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
                                            <button type='submit' className='butn butn_success'>Submit</button>
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
                                            <label htmlFor='traveller'>Travellers</label>
                                            <InputPicker id='traveller' data={rooms} appearance='subtle' />
                                        </div>
                                        <div className='formBtn'>
                                            <button type='submit' className='butn butn_success'>Submit</button>
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
                                            <InputPicker id='departure' data={departure} appearance='subtle' />
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='cruiseLine'>Cruise Line</label>
                                            <SelectPicker id='cruiseLine' data={cruiseLine} appearance='subtle' />
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='duration'>Duration</label>
                                            <InputPicker id='duration' data={duration} appearance='subtle' />
                                        </div>
                                        <div className='formBtn'>
                                            <button type='submit' className='butn butn_success'>Search</button>
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
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                    Aliquam felis magna, tincidunt at sodales ac, rutrum non neque. 
                                    Ut eu pulvinar purus. Integer ut elit vestibulum, lacinia arcu vel, 
                                    mollis diam. Maecenas finibus porttitor dui, eu viverra augue tincidunt quis. 
                                    Morbi eget tellus nec eros posuere ultricies id vel velit. 
                                    Suspendisse ut blandit urna, sed porttitor velit. Donec pellentesque scelerisque justo, 
                                    eget placerat sapien aliquet vitae. Pellentesque quis nulla accumsan velit fringilla 
                                    iaculis et sed sem. Quisque ultrices enim nulla, ut vulputate erat ullamcorper non. 
                                    Duis volutpat porttitor risus, eu viverra nisl laoreet ac.
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
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Aliquam felis magna, tincidunt at sodales ac, rutrum 
                                non neque. Ut eu pulvinar purus. Integer ut elit 
                                vestibulum, lacinia arcu vel, mollis diam.
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
                                        <img src={client1} alt='Client 1' />
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                        <h3>Flights</h3>
                                    </div>
                                </div>
                                <div>
                                    <div className='testiCont'>
                                        <img src={client2} alt='Client 2' />
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                        <h3>Flights</h3>
                                    </div>
                                </div>
                                <div>
                                    <div className='testiCont'>
                                        <img src={client3} alt='Client 3' />
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                        <h3>Flights</h3>
                                    </div>
                                </div>
                                <div>
                                    <div className='testiCont'>
                                        <img src={client1} alt='Client 1' />
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                        <h3>Flights</h3>
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