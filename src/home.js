import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Slider from "react-slick";
import heroBanner from './assets/images/hero_banner.png';
import aboutUs from './assets/images/aboutus.png';
import explore from './assets/images/explore.png';
import client1 from './assets/images/client1.png';
import client2 from './assets/images/client2.png';
import client3 from './assets/images/client3.png';
import quesIc from './assets/images/quesIc.jpg';
import AccordionItem from "./components/ui/accordion";

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
            <section className='tab_form_sec'>
                <div className='custom-container'>
                    <div className='tabs_inner'>
                        <Tabs>
                            <TabList>
                                <Tab><i className='fas fa-hotel'></i> Hotels</Tab>
                                <Tab><i className='fa fa-car'></i> Car Hire</Tab>
                                <Tab><i className='fa fa-plane'></i> Flights</Tab>
                                <Tab><i className='fa fa-calendar-xmark'></i> Event</Tab>
                            </TabList>
                            <TabPanel>
                                <div className='tabForm'>
                                    <form className='inline_Form'>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='fromLoc'>From</label>
                                            <input type='text' id='fromLoc' placeholder='Enter Location' />
                                        </div>
                                        <div className='formGrp'>
                                            <button type='button' className='interchnge'><i className='fa fa-arrow-right-arrow-left'></i></button>
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='toLoc'>To</label>
                                            <input type='text' id='toLoc' placeholder='Enter Location' />
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='departure'>Departure</label>
                                            <input type='date' id='departure' />
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='return'>Return</label>
                                            <input type='date' id='return' />
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='traveller'>Travellers</label>
                                            <select id='traveller'>
                                                <option>1 Traveller</option>
                                                <option>2 Traveller</option>
                                                <option>3 Traveller</option>
                                                <option>4 Traveller</option>
                                                <option>5 Traveller</option>
                                                <option>6 Traveller</option>
                                                <option>7 Traveller</option>
                                                <option>8 Traveller</option>
                                            </select>
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
                                            <label htmlFor='fromLoc'>From</label>
                                            <input type='text' id='fromLoc' placeholder='Enter Location' />
                                        </div>
                                        <div className='formGrp'>
                                            <button type='button' className='interchnge'><i className='fa fa-arrow-right-arrow-left'></i></button>
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='toLoc'>To</label>
                                            <input type='text' id='toLoc' placeholder='Enter Location' />
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='departure'>Departure</label>
                                            <input type='date' id='departure' />
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='return'>Return</label>
                                            <input type='date' id='return' />
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='traveller'>Travellers</label>
                                            <select id='traveller'>
                                                <option>1 Traveller</option>
                                                <option>2 Traveller</option>
                                                <option>3 Traveller</option>
                                                <option>4 Traveller</option>
                                                <option>5 Traveller</option>
                                                <option>6 Traveller</option>
                                                <option>7 Traveller</option>
                                                <option>8 Traveller</option>
                                            </select>
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
                                            <label htmlFor='fromLoc'>From</label>
                                            <input type='text' id='fromLoc' placeholder='Enter Location' />
                                        </div>
                                        <div className='formGrp'>
                                            <button type='button' className='interchnge'><i className='fa fa-arrow-right-arrow-left'></i></button>
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='toLoc'>To</label>
                                            <input type='text' id='toLoc' placeholder='Enter Location' />
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='departure'>Departure</label>
                                            <input type='date' id='departure' />
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='return'>Return</label>
                                            <input type='date' id='return' />
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='traveller'>Travellers</label>
                                            <select id='traveller'>
                                                <option>1 Traveller</option>
                                                <option>2 Traveller</option>
                                                <option>3 Traveller</option>
                                                <option>4 Traveller</option>
                                                <option>5 Traveller</option>
                                                <option>6 Traveller</option>
                                                <option>7 Traveller</option>
                                                <option>8 Traveller</option>
                                            </select>
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
                                            <label htmlFor='fromLoc'>From</label>
                                            <input type='text' id='fromLoc' placeholder='Enter Location' />
                                        </div>
                                        <div className='formGrp'>
                                            <button type='button' className='interchnge'><i className='fa fa-arrow-right-arrow-left'></i></button>
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='toLoc'>To</label>
                                            <input type='text' id='toLoc' placeholder='Enter Location' />
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='departure'>Departure</label>
                                            <input type='date' id='departure' />
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='return'>Return</label>
                                            <input type='date' id='return' />
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='traveller'>Travellers</label>
                                            <select id='traveller'>
                                                <option>1 Traveller</option>
                                                <option>2 Traveller</option>
                                                <option>3 Traveller</option>
                                                <option>4 Traveller</option>
                                                <option>5 Traveller</option>
                                                <option>6 Traveller</option>
                                                <option>7 Traveller</option>
                                                <option>8 Traveller</option>
                                            </select>
                                        </div>
                                        <div className='formBtn'>
                                            <button type='submit' className='butn butn_success'>Submit</button>
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
                        <div className='imgCol'>
                            <img src={aboutUs} alt='Who We Are' />
                        </div>
                        <div className='cont_Col'>
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
                        <div className='cont_Col'>
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
                        <div className='imgCol'>
                            <img src={explore} alt='Explore' />
                        </div>
                    </div>
                </div>
            </section>

            <section className='testimonial_sec'>
                <div className='custom-container'>
                    <div className='testimonial_inner'>
                        <div className='sec_ttl'>
                            <h6>Review <span></span></h6>
                            <h2>Testimonials</h2>
                        </div>
                        <div className='testi_slider'>
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
                    <div className='accordion_main'>
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