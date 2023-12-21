import React from "react";
import './assets/css/mysubmissions.css';
import InnerHeader from "./components/innerHeader/innerHeader";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import hotel from './assets/images/hotel.png';
import waiter from './assets/images/waiter.png';
import car from './assets/images/carhire_ic.png';
import flight from './assets/images/flight_ic.png';
import cruise from './assets/images/cruise_ic.png';

const MySubmissions = () => {
    return(
        <>
        <InnerHeader value='Submissions' />
        
        <section className='mysubmissions'>
            <div className='custom-container'>
                <Tabs>
                    <TabList>
                        <Tab><i className='fas fa-hotel'></i> Hotels</Tab>
                        <Tab><i className='fa fa-car'></i> Car Hire</Tab>
                        <Tab><i className='fa fa-plane'></i> Flights</Tab>
                        <Tab><i className='fa fa-ship'></i> Cruise</Tab>
                    </TabList>

                    <TabPanel>
                        <div className="wrapper">
                            <div className="overviewInfo">
                                <div className="actions">
                                    <div className="backbutton">
                                        {/* empty */}
                                    </div>
                                    <div className="cartbutton neurobutton">
                                        <i className='fa fa-heart'></i>
                                    </div>
                                </div>

                                <div className="productinfo">
                                    <div className="grouptext">
                                        <h3>DESTINATION</h3>
                                        <p>VANCOUVER</p>
                                    </div>
                                    <div className="grouptext">
                                        <h3>CHECK IN & OUT</h3>
                                        <p>DEC 20, 2023 - DEC 25, 2023</p>
                                    </div>
                                    <div className="grouptext">
                                        <h3>GUESTS/ROOMS</h3>
                                        <p>1 ROOM | 1 ADULT | 0 CHILD</p>
                                    </div>
                                </div>
                                <div className="productImage">
                                    <img src={waiter} alt="" />
                                    <img src={hotel} alt="" />
                                </div>
                            </div>
                            <div className="productSpecifications">
                                <div className="productFeatures">
                                    <div className="feature">
                                        <div className="featureIcon">
                                            <i className='fa fa-wifi'></i>
                                        </div>
                                        <div className="featureText">
                                            <p><strong>Amenities</strong></p>
                                            <p>Breakfast | Pool | Wi-Fi | Pet-Friendly</p>
                                        </div>
                                    </div>
                                    <div className="feature">
                                        <div className="featureIcon">
                                            <i className='fa fa-dollar'></i>
                                        </div>
                                        <div className="featureText">
                                            <p><strong>Pricing</strong></p>
                                            <p>CA 300</p>
                                        </div>
                                    </div>
                                    <div className="feature">
                                        <div className="featureIcon">
                                            <i className='fa fa-star'></i>
                                        </div>
                                        <div className="featureText">
                                            <p><strong>Stars</strong></p>
                                            <p>5 Star</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="wrapper car">
                            <div className="overviewInfo">
                                <div className="actions">
                                    <div className="backbutton">
                                        {/* empty */}
                                    </div>
                                    <div className="cartbutton neurobutton">
                                        <i className='fa fa-heart'></i>
                                    </div>
                                </div>

                                <div className="productinfo">
                                    <div className="grouptext">
                                        <h3>PICKUP</h3>
                                        <p>VANCOUVER</p>
                                    </div>
                                    <div className="grouptext">
                                        <h3>DROP-OFF</h3>
                                        <p>VANCOUVER</p>
                                    </div>
                                    <div className="grouptext">
                                        <h3>PICKUP & DROP-OFF</h3>
                                        <p>2023-12-20 & 2023-12-22</p>
                                    </div>
                                </div>
                                <div className="productImage">
                                    {/* <img src={waiter} alt="" /> */}
                                    <span></span>
                                    <img src={car} alt="" />
                                </div>
                            </div>
                            <div className="productSpecifications">
                                <div className="productFeatures">
                                    <div className="feature">
                                        <div className="featureIcon">
                                            <i className='fas fa-car'></i>
                                        </div>
                                        <div className="featureText">
                                            <p><strong>Driver</strong></p>
                                            <p>Yes, young under 30</p>
                                        </div>
                                    </div>
                                    <div className="feature">
                                        <div className="featureIcon">
                                            <i className='fa fa-car'></i>
                                        </div>
                                        <div className="featureText">
                                            <p><strong>Car Type</strong></p>
                                            <p>XUV</p>
                                        </div>
                                    </div>
                                    <div className="feature">
                                        <div className="featureIcon">
                                            <i className='fa fa-car'></i>
                                        </div>
                                        <div className="featureText">
                                            <p><strong>Capacity</strong></p>
                                            <p>2 passengers</p>
                                        </div>
                                    </div>
                                    <div className="feature">
                                        <div className="featureIcon">
                                            <i className='fa fa-car'></i>
                                        </div>
                                        <div className="featureText">
                                            <p><strong>Wheel Drive</strong></p>
                                            <p>All Wheel Drive</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="wrapper flight">
                            <div className="overviewInfo">
                                <div className="actions">
                                    <div className="backbutton">
                                        {/* empty */}
                                    </div>
                                    <div className="cartbutton neurobutton">
                                        <i className='fa fa-heart'></i>
                                    </div>
                                </div>

                                <div className="productinfo">
                                    <div className="grouptext">
                                        <h3>FROM</h3>
                                        <p>VANCOUVER</p>
                                    </div>
                                    <div className="grouptext">
                                        <h3>TO</h3>
                                        <p>VANCOUVER</p>
                                    </div>
                                    <div className="grouptext">
                                        <h3>DEPARTURE</h3>
                                        <p>2023-12-21</p>
                                    </div>
                                    <div className="grouptext">
                                        <h3>TRAVELLERS</h3>
                                        <p>2 Adult | 1 Children | 1 Infant</p>
                                    </div>
                                </div>
                                <div className="productImage">
                                    {/* <img src={waiter} alt="" /> */}
                                    <span></span>
                                    <img src={flight} alt="" />
                                </div>
                            </div>
                            <div className="productSpecifications">
                                <div className="productFeatures">
                                    <div className="feature">
                                        <div className="featureIcon">
                                            <i className='fas fa-car'></i>
                                        </div>
                                        <div className="featureText">
                                            <p><strong>Amenities</strong></p>
                                            <p>Breakfast | Pool | WiFi</p>
                                        </div>
                                    </div>
                                    <div className="feature">
                                        <div className="featureIcon">
                                            <i className='fa fa-dollar'></i>
                                        </div>
                                        <div className="featureText">
                                            <p><strong>Price</strong></p>
                                            <p>CA 300</p>
                                        </div>
                                    </div>
                                    <div className="feature">
                                        <div className="featureIcon">
                                            <i className='fa fa-star'></i>
                                        </div>
                                        <div className="featureText">
                                            <p><strong>Star</strong></p>
                                            <p>4 Star</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="wrapper cruise">
                            <div className="overviewInfo">
                                <div className="actions">
                                    <div className="backbutton">
                                        {/* empty */}
                                    </div>
                                    <div className="cartbutton neurobutton">
                                        <i className='fa fa-heart'></i>
                                    </div>
                                </div>

                                <div className="productinfo">
                                    <div className="grouptext">
                                        <h3>PICKUP</h3>
                                        <p>VANCOUVER</p>
                                    </div>
                                    <div className="grouptext">
                                        <h3>DROP-OFF</h3>
                                        <p>VANCOUVER</p>
                                    </div>
                                    <div className="grouptext">
                                        <h3>PICKUP & DROP-OFF</h3>
                                        <p>2023-12-20 & 2023-12-22</p>
                                    </div>
                                </div>
                                <div className="productImage">
                                    {/* <img src={waiter} alt="" /> */}
                                    <span></span>
                                    <img src={cruise} alt="" />
                                </div>
                            </div>
                            <div className="productSpecifications">
                                <div className="productFeatures">
                                    <div className="feature">
                                        <div className="featureIcon">
                                            <i className='fas fa-car'></i>
                                        </div>
                                        <div className="featureText">
                                            <p><strong>Driver</strong></p>
                                            <p>Yes, young under 30</p>
                                        </div>
                                    </div>
                                    <div className="feature">
                                        <div className="featureIcon">
                                            <i className='fa fa-car'></i>
                                        </div>
                                        <div className="featureText">
                                            <p><strong>Car Type</strong></p>
                                            <p>XUV</p>
                                        </div>
                                    </div>
                                    <div className="feature">
                                        <div className="featureIcon">
                                            <i className='fa fa-car'></i>
                                        </div>
                                        <div className="featureText">
                                            <p><strong>Capacity</strong></p>
                                            <p>2 passengers</p>
                                        </div>
                                    </div>
                                    <div className="feature">
                                        <div className="featureIcon">
                                            <i className='fa fa-car'></i>
                                        </div>
                                        <div className="featureText">
                                            <p><strong>Wheel Drive</strong></p>
                                            <p>All Wheel Drive</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>

                <div className='submissionCard'>
                    <svg className="success-svg" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
                        <g fill="none" fill-rule="evenodd" stroke="#177EE6">
                            <circle className="success-circle" cx="40" cy="40" r="39" stroke-width="2"/>
                            <polyline className="success-checkmark" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" points="24.5 41.5 34.5 51.5 55.5 30.5"/>
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

export default MySubmissions;