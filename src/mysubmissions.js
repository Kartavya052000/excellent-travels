import { useEffect, useState } from "react";
import './assets/css/mysubmissions.css';
import InnerHeader from "./components/innerHeader/innerHeader";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import hotel from './assets/images/hotel.png';
import waiter from './assets/images/waiter.png';
import car from './assets/images/carhire_ic.png';
import flight from './assets/images/flight_ic.png';
import cruise from './assets/images/cruise_ic.png';
import axios from 'axios'

import { useCookies } from 'react-cookie';


const MySubmissions = () => {
    const [activeTab, setActiveTab] = useState(0); // Initialize active tab index
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const token = cookies['token'];
    const [booking, setBooking] = useState([]);
    const handleTabSelect = async (index) => {
        setActiveTab(index); // Update active tab index
    };

    useEffect(() => {
        BookingsApi(activeTab)
    }, [activeTab])

    const BookingsApi = async (index) => {

        const tabNames = ['hotel', 'car', 'flight', 'cruise'];

        const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/user-bookings/' + tabNames[index], {
            headers: {
                Authorization: token
            }
        });


        try {
            console.log(response.data.bookings
            )
            setBooking(response.data.bookings)
        }
        catch (error) {

        }

    }
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const formatDateRange = (startDateString, endDateString) => {
        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);

        const formattedStartDate = `${startDate.toLocaleDateString()} ${startDate.toLocaleTimeString([], { timeStyle: 'short' })}`;
        const formattedEndDate = `${endDate.toLocaleDateString()} ${endDate.toLocaleTimeString([], { timeStyle: 'short' })}`;

        return `${formattedStartDate} - ${formattedEndDate}`;
    };

    // Inside your component's JSX
    <p>{formatDateRange(booking.bookingDetails?.PickupDateAndTIme, booking.bookingDetails?.DropOffDateAndTime)}</p>

    return (
        <>
            <InnerHeader value='Submissions' />

            <section className='mysubmissions'>
                <div className='custom-container'>
                    <Tabs selectedIndex={activeTab} onSelect={handleTabSelect}>
                        <TabList>
                            <Tab><i className='fas fa-hotel'></i> Hotels</Tab>
                            <Tab><i className='fa fa-car'></i> Car Hire</Tab>
                            <Tab><i className='fa fa-plane'></i> Flights</Tab>
                            <Tab><i className='fa fa-ship'></i> Cruise</Tab>
                        </TabList>

                        <TabPanel>
                            {booking?.length > 0 ? (
                                booking.map((booking, index) => (
                                    <div className="wrapper" key={index}>
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
                                                    <p>{booking.bookingDetails?.destination}</p>
                                                </div>
                                                <div className="grouptext">
                                                    <h3>CHECK IN & OUT</h3>
                                                    <p>
                                                        {formatDate(booking.bookingDetails?.checkIn)} -{' '}
                                                        {formatDate(booking.bookingDetails?.checkOut)}
                                                    </p>                                                </div>
                                                <div className="grouptext">
                                                    <h3>GUESTS/ROOMS</h3>
                                                    <p>{booking.bookingDetails?.guests?.rooms} ROOM | {booking.bookingDetails?.guests?.adults} ADULT | {booking.bookingDetails?.guests?.children} CHILD</p>
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
                                                        <p>{booking.bookingDetails?.facilities?.breakfast ? "Breakfast" : null}
                                                            {booking.bookingDetails?.facilities?.pool ? "Pool" : null}
                                                            {booking.bookingDetails?.facilities?.wifi ? "Wi-Fi" : null}
                                                            {booking.bookingDetails?.facilities?.petFriendly ? "Pet-Friendly" : null}</p>
                                                    </div>
                                                </div>
                                                <div className="feature">
                                                    <div className="featureIcon">
                                                        <i className='fa fa-dollar'></i>
                                                    </div>
                                                    <div className="featureText">
                                                        <p><strong>Pricing</strong></p>
                                                        <p>{booking.bookingDetails?.pricing}</p>
                                                    </div>
                                                </div>
                                                <div className="feature">
                                                    <div className="featureIcon">
                                                        <i className='fa fa-star'></i>
                                                    </div>
                                                    <div className="featureText">
                                                        <p><strong>Stars</strong></p>
                                                        <p>{booking.bookingDetails?.stars}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No hotel bookings </p>
                            )}

                        </TabPanel>
                        <TabPanel>
                            {booking?.length > 0 ? (
                                booking.map((booking, index) => (
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
                                                    <p>{booking.bookingDetails?.pickuplocation}</p>
                                                </div>
                                                <div className="grouptext">
                                                    <h3>DROP-OFF</h3>
                                                    <p>{booking.bookingDetails?.dropOffLocation}</p>
                                                </div>
                                                <div className="grouptext">
                                                    <h3>PICKUP & DROP-OFF</h3>

                                                    <p>{formatDateRange(booking.bookingDetails?.PickupDateAndTIme, booking.bookingDetails?.DropOffDateAndTime)}</p>
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
                                                        <p>{booking.bookingDetails?.DriversAge}</p>
                                                    </div>
                                                </div>
                                                <div className="feature">
                                                    <div className="featureIcon">
                                                        <i className='fa fa-car'></i>
                                                    </div>
                                                    <div className="featureText">
                                                        <p><strong>Car Type</strong></p>
                                                        <p>{booking.bookingDetails?.carType}</p>
                                                    </div>
                                                </div>
                                                <div className="feature">
                                                    <div className="featureIcon">
                                                        <i className='fa fa-car'></i>
                                                    </div>
                                                    <div className="featureText">
                                                        <p><strong>Capacity</strong></p>
                                                        <p>{booking.bookingDetails?.Capacity}</p>
                                                    </div>
                                                </div>
                                                <div className="feature">
                                                    <div className="featureIcon">
                                                        <i className='fa fa-car'></i>
                                                    </div>
                                                    <div className="featureText">
                                                        <p><strong>Wheel Drive</strong></p>
                                                        <p>{booking.bookingDetails?.WheelDrive}</p>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No Car bookings </p>
                            )}
                        </TabPanel>
                        <TabPanel>
                            {booking?.length > 0 ? (
                                booking.map((booking, index) => (
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
                                                    <p>{booking.bookingDetails?.From}</p>
                                                </div>
                                                <div className="grouptext">
                                                    <h3>TO</h3>
                                                    <p>{booking.bookingDetails?.To}</p>
                                                </div>
                                                <div className="grouptext">
                                                    <h3>DEPARTURE</h3>
                                                    <p>{booking.bookingDetails?.Departure}</p>
                                                </div>
                                                <div className="grouptext">
                                                    <h3>TRAVELLERS</h3>
                                                    <p>{booking.bookingDetails?.Adults} Adult | {booking.bookingDetails?.Children} Children | {booking.bookingDetails?.Infant}  Infant</p>
                                                </div>
                                            </div>
                                            <div className="productImage">
                                                {/* <img src={waiter} alt="" /> */}
                                                <span></span>
                                                <img src={flight} alt="" />
                                            </div>
                                        </div>
                                        {/* <div className="productSpecifications">
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
                                        </div> */}
                                    </div>
                                ))
                            ) : (
                                <p>No Flight bookings </p>
                            )}

                        </TabPanel>
                        <TabPanel>
                            {booking?.length > 0 ? (
                                booking.map((booking, index) => (
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
                                                    <h3>DESTINATION</h3>
                                                    <p>{booking?.bookingDetails?.Destination}</p>
                                                </div>
                                                <div className="grouptext">
                                                    <h3>DEPARTURE MONTH</h3>
                                                    <p>{booking?.bookingDetails?.DepartureMonth}</p>
                                                </div>
                                                <div className="grouptext">
                                                    <h3>NUMBER OF DAYS</h3>
                                                    <p>{booking?.bookingDetails?.Duration}</p>
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
                                                        <p><strong>Cruise Line</strong></p>
                                                        <p>{booking?.bookingDetails?.CruiseLine}</p>
                                                    </div>
                                                </div>
                                                <div className="feature">
                                                    <div className="featureIcon">
                                                        <i className='fa fa-car'></i>
                                                    </div>
                                                    <div className="featureText">
                                                        <p><strong>Shuttle Service</strong></p>
                                                        <p>{booking?.bookingDetails?.ShuttleService}</p>
                                                    </div>
                                                </div>
                                                <div className="feature">
                                                    <div className="featureIcon">
                                                        <i className='fa fa-car'></i>
                                                    </div>
                                                    <div className="featureText">
                                                        <p><strong>Amenities</strong></p>
                                                        <p>{booking.bookingDetails?.amenities?.wifi ? "Wi-Fi" : "No Amenities"}</p>
                                                    </div>
                                                </div>
                                                <div className="feature">
                                                    <div className="featureIcon">
                                                        <i className='fa fa-car'></i>
                                                    </div>
                                                    <div className="featureText">
                                                        <p><strong>Cabin Type</strong></p>
                                                        <p>
                                                            {booking.bookingDetails?.cabinType?.balcony ? "Balcony " : null}
                                                            {booking.bookingDetails?.cabinType?.familyRooms ? "Family Rooms " : null}
                                                            {booking.bookingDetails?.cabinType?.midShipCabin ? "Mid-Ship " : null}
                                                            {booking.bookingDetails?.cabinType?.nonWindows ? "Non-Window " : null}
                                                            {booking.bookingDetails?.cabinType?.windows ? "Window " : null}
                                                            {booking.bookingDetails?.cabinType?.scenicViewCabins ? "Scenic View " : null}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="feature">
                                                    <div className="featureIcon">
                                                        <i className='fa fa-car'></i>
                                                    </div>
                                                    <div className="featureText">
                                                        <p><strong>Beverage Package</strong></p>
                                                        <p>
                                                        {booking.bookingDetails?.BevPackage?.beer ? "Beer " : null}
                                                        {booking.bookingDetails?.BevPackage?.bottledWater ? "Bottle Water " : null}
                                                        {booking.bookingDetails?.BevPackage?.cocktail ? "CockTail " : null}
                                                        {booking.bookingDetails?.BevPackage?.coffee ? "Coffee " : null}
                                                        {booking.bookingDetails?.BevPackage?.juices ? "Juices" : null}
                                                            {booking.bookingDetails?.BevPackage?.nonalcoholicBottle ? "Non-Alcoholic " : null}
                                                            {booking.bookingDetails?.BevPackage?.soda ? "Soda " : null}
                                                            {booking.bookingDetails?.BevPackage?.tea ? "Tea" : null}
                                                            {booking.bookingDetails?.BevPackage?.wines ? "Wine" : null}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No Cruise bookings </p>
                            )}
                        </TabPanel>
                    </Tabs>


                </div>
            </section>
        </>
    )
}

export default MySubmissions;