import React from "react";
import './assets/css/mysubmissions.css';
import InnerHeader from "./components/innerHeader/innerHeader";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

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
                        <div className='bookCard'>
                            <div className='card_head'>
                                <i className='fa fa-building'></i>
                                <h4 className='name'>Hotel Name</h4>
                            </div>
                            <div className='card_body'>
                                <ul>
                                    <li><span>Check-In</span> <small>08 Dec 23</small></li>
                                    <li><span>Check-Out</span> <small>10 Dec 23</small></li>
                                    <li className='room_dets'>
                                        <div className='room'><i className='fa fa-door-open'></i> 1 Room(s), 2 Night(s)</div>
                                        <div className='person'><i className='fa fa-users'></i> PersonName + 1</div>
                                    </li> 
                                </ul>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        
                    </TabPanel>
                </Tabs>

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

export default MySubmissions;