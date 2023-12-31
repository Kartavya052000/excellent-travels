import React, { useEffect, useState, useRef } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Slider from "react-slick";
import AOS from 'aos';
import 'aos/dist/aos.css';
import './assets/css/home.css';
import heroBanner from './assets/images/hero_banner.png';
import aboutUs from './assets/images/aboutus.png';
import explore from './assets/images/explore.png';
import client1 from './assets/images/client1.png';
import client2 from './assets/images/client2.png';
import client3 from './assets/images/client3.png';
import quesIc from './assets/images/quesIc.jpg';
import AccordionItem from "./components/ui/accordion";
import { Form, Modal } from "rsuite";
import { motion, useScroll, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import _debounce from 'lodash/debounce';
import Hotel from "./pages/Hotel";
import CarHire from "./pages/Car";
import Flight from "./pages/Flight";
import Cruise from "./pages/cruise";
import googleSvg from './assets/images/google.svg';
import { useCookies } from 'react-cookie';
import logo from './assets/images/logowhite.png';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from "antd";
import { FloatingWhatsApp } from "react-floating-whatsapp";

const Home = () => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = React.useState(false);
    const [overflow, setOverflow] = React.useState(true);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const [open, setOpen] = React.useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const token = cookies['token'];
    const [email, SetEmail] = useState("")
    const [password, SetPassword] = useState("")
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const handleError = (err) =>
    toast.error(err, {
      position: "top-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });
    // const getUser = async () => {
    //     try {
    //         const url = `${process.env.REACT_APP_BACKEND_URL}/auth/login/success`;
    //         const { data } = await axios.get(url, { withCredentials: true });
    //         console.log(data, "RES")
    //         // setUser(data.user._json);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    useEffect(() => {
        // getUser();
    }, []);
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

    const [active, setActive] = useState(0);

    const handleToggle = (index) => {
        if (active === index) {
            setActive(null);
        } else {
            setActive(index);
        }
    }
    const googleAuth = () => {
        window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/google/callback`, "_self")
    }
    useEffect(() => {
        AOS.init({ once: true });
    }, [])

    const { scrollYProgress } = useScroll();

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 30,
        restDelta: 0.001
    });
    const handleOpenModal = async (value) => {
        if (!token) {
            setOpenModal(true);
        } else {
            try {
                const url = `${process.env.REACT_APP_BACKEND_URL}/booking`;
                const { data } = await axios.post(url, value, {
                    headers: {
                        'Authorization': ` ${token}`, // Correct the token format
                    },
                });
                // console.log(data, "RES")
                // setUser(data.user._json);
                navigate("/booking-confirmation")
            } catch (err) {
                console.log(err);
            }
        }
    };

    const tabRefs = {
        hotels: useRef(null),
        carHire: useRef(null),
        flights: useRef(null),
        cruise: useRef(null)
    };

    const tabsSectionRef = useRef(null);

    const scrollToRef = (ref) => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    const handleServiceCardClick = (index) => {
        scrollToRef(tabsSectionRef);
        setActive(index);
        setText(texts[index])
        switch (index) {
            case 0:
                scrollToRef(tabRefs.hotels);
                setActive(0)
                break;
            case 1:
                scrollToRef(tabRefs.carHire);
                setActive(1)

                break;
            case 2:
                scrollToRef(tabRefs.flights);
                setActive(2)

                break;
            case 3:
                scrollToRef(tabRefs.cruise);
                setActive(3)

                break;
            default:
                break;
        }
    };
    const handleTabSelection = (index) => {
        setActive(index);
        setText(texts[index])

    };


    const texts = ['a hotel with us', 'a car with us', 'flight with us', 'a cruise with us'];
    const [text, setText] = useState(texts[0])

    const handleLogin = async () => {
        if (email === "") {
            setEmailError(true);
        }
        if (password === "") {
            setPasswordError(true);
        }
      
        if (email === "" || password === "" ) {
            return;
        }
        let formData = {
            email: email,
            password: password,
            provider:"local"
        }
        try {
            // Make your API call here using Axios or any other library
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/auth/login', formData);
            // Handle response or perform actions after successful login
            // console.log('SignUp successful!', response.data);
            const { success, message,token } = response.data;
            if (success) {
              setCookie("token", token, { path: "/" });
              setCookie('username', response.data.user.username   , { path: '/', secure: true });
        
              handleSuccess(message);
              setTimeout(() => {
                handleClose()
                // navigate("/");
              }, 1000);
            } else {
              handleError(message);
            }

        } catch (error) {
            handleError(error.message);

            // Handle error or display error message to the user
            // console.error('Signup failed!', error);
        }
    };

    // useEffect(() => {
    //     const showSweetAlert = async () => {
    //       const { value } = await Swal.fire({
    //         title: 'Success!',
    //         html: '<div class="tick-animation"></div><div>Operation successful</div>',
    //         showConfirmButton: false,
    //         customClass: {
    //           container: 'custom-swal-container',
    //           popup: 'custom-swal-popup',
    //         },
    //         timer: 2500, // Adjust the timer as needed
    //       });

    //       if (value) {
    //         // Handle any action after the alert is closed
    //       }
    //     };

    //     showSweetAlert();
    //   }, []);
    return (
        <>
            <motion.div className='progressBar' style={{ scaleX }} />

            <section className='hero_sec' style={{ backgroundImage: `url(${heroBanner})` }}>
                <div className='hero_overlay'></div>
                <div className='custom-container'>
                    <div className='hero_inner'>
                        <div className='hero_info'>
                            {/* <span   data-aos='fade-up' data-aos-duration='1500'>Book With Us</span> */}
                            {/* <h2 data-aos='fade-up' data-aos-duration='1500'>Find  Next place to visit</h2> */}
                            <h2 key={text} data-aos='fade-up' data-aos-duration='1500'>Book {text}</h2>

                        </div>
                    </div>
                </div>
            </section>

            <section className='tab_form_sec' ref={tabsSectionRef} id='tabsSection'>
                <div className='tabs_inner'>
                    <Tabs onSelect={handleTabSelection} selectedIndex={active}>
                        <TabList>
                            <Tab><i className='fa fa-plane'></i> Flights</Tab>
                            <Tab><i className='fa fa-ship'></i> Cruise</Tab>
                            <Tab><i className='fa fa-hotel'></i> Hotels</Tab>
                            <Tab><i className='fa fa-car'></i> Car Hire</Tab>
                        </TabList>
                        <TabPanel ref={tabRefs.flights}>
                            <Flight openLoginModal={handleOpenModal} tojk />
                        </TabPanel>
                        <TabPanel ref={tabRefs.cruise}>
                            <Cruise  openLoginModal={handleOpenModal}/>
                        </TabPanel>
                        <TabPanel ref={tabRefs.hotels}>
                            <Hotel openLoginModal={handleOpenModal} />
                        </TabPanel>
                        <TabPanel ref={tabRefs.carHire}>
                            <CarHire openLoginModal={handleOpenModal} />
                        </TabPanel>
                    </Tabs>
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

            <section className='explore_sec' data-aos='fade-up' data-aos-duration='1500'>
                <div className='custom-container'>
                    <div className='custom_row'>
                        <div className='cont_Col'>
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
                                <div className='serv_card' onClick={() => handleServiceCardClick(0)}>
                                <i className='fas fa-hotel'></i>
                                    <span>Hotel</span>
                                </div>
                                <div className='serv_card' onClick={() => handleServiceCardClick(1)}>
                                    <i className='fas fa-car'></i>
                                    <span>Cars</span>
                                </div>
                                <div className='serv_card ' onClick={() => handleServiceCardClick(2)}>
                                    <i className='fa fa-plane'></i>
                                    <span>Flight</span>
                                </div>
                                <div className='serv_card' onClick={() => handleServiceCardClick(3)}>
                                    <i className='fa fa-calendar-xmark'></i>
                                    <span>Cruise</span>
                                </div>
                            </div>
                        </div>
                        <div className='imgCol'>
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
            <Modal size='xs' className='loginModal' backdrop="static" keyboard={false} overflow={overflow} open={openModal} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Please login to continue</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal_inner'>
                        <Form>
                            {/* <h1>Login to Continue</h1> */}
                            <div className='formGrp'>
                            <Form.Control
                                    name='email'
                                    type="email"
                                    placeholder='Email'
                                    value={email}
                                    onChange={(value) => {
                                        SetEmail(value);
                                        if (value == '') {
                                            setEmailError(true)
                                            return;
                                        }
                                        setEmailError(false);
                                    }}
                                    className={emailError ? 'error' : ''}
                                />
                                {emailError && <span className='errorTxt' style={{ color: "red" }}>Email is invalid</span>}
                            </div>
                            <div className='formGrp'>
                            <Input.Password
                                    name='password'
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                        SetPassword(e.target.value);
                                        if (e.target.value == '') {
                                            setPasswordError(true)
                                            return;
                                        }
                                        setPasswordError(false)
                                    }}
                                    className={passwordError ? 'error' : ''}
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />

                                {passwordError && <span className='errorTxt' style={{ color: "red" }}>Password is invalid</span>}
                                           </div>
                            <div className='formBtn'>
                                <button type='submit' className='butn butn_success butn_block' onClick={handleLogin}>Login</button>
                            </div>
                        </Form>
                        <span>---- Or Sign In With ----</span>
                        <div className="social-container">
                            <button type="button" className="social" onClick={googleAuth}><img src={googleSvg} /></button>

                            {/* <button type="button" className="social" onClick={googleAuth}><img src={googleSvg} /></button> */}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <FloatingWhatsApp phoneNumber="1234567890" accountName="Excellent Travels" avatar={logo} />
        </>
    )
}

export default Home;