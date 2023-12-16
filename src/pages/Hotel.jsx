import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DatePicker, Space, Select } from 'antd';
import dayjs from 'dayjs';
import _debounce from 'lodash/debounce';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {  Dropdown } from "rsuite";

const { RangePicker } = DatePicker;

const Hotel = ({ openLoginModal }) => {
    const navigate = useNavigate()
    const today = dayjs();
    const [roomcount, setRoomCount] = useState(1);
    const [adultcount, setAdultCount] = useState(1);
    const [childcount, setChildCount] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility
    const [facdropdownOpen, setFacDropdownOpen] = useState(false); // State to manage dropdown visibility
    const [options, setOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [checkinDate, setCheckinDate] = useState(today.add(1, 'day'))
    const [checkOutDate, setCheckOutDate] = useState(checkinDate.add(2, 'day'))
    const [amenities, setAmenities] = useState({
        breakfast: false,
        pool: false,
        wifi: false,
        petFriendly: false,
    });
    const stars = ['3 star', '5 star', '7 star'].map(
        item => ({ label: item, value: item })
    );
    const [pricingval, SetPricingval] = useState("CA0 - CA300")
    const [starval, SetStarval] = useState("5 star")

    const hotelPickerPlaceholder = ['Check In ', 'Check out'];
    const [selectedDate, setSelectedDate] = useState([]); // State to store selected date range

    const dropdownTitle = `${roomcount} ROOM | ${adultcount} ADULT | ${childcount} CHILD`;

    const pricing = [
        { label: 'CA0 - CA300', value: 'CA0 - CA300' },
        { label: 'CA300 - CA600', value: 'CA300 - CA600' },
        { label: 'CA600 & Above', value: 'CA600 & Above' },
    ];
    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
    };
    // Increment function for updating the counts
    const increment = (e, val) => {
        // alert(val)
        e.preventDefault()
        if (val === "room") {
            setRoomCount(roomcount + 1);
        } else if (val === "adult") {
            setAdultCount(adultcount + 1);
        } else {
            setChildCount(childcount + 1);
        }
    };
 
    // Decrement function for updating the counts
    const decrement = (e, val) => {
        e.preventDefault()

        if (val === "room" && roomcount > 0) {
            setRoomCount(roomcount - 1);
        } else if (val === "adult" && adultcount > 0) {
            setAdultCount(adultcount - 1);
        } else if (val === "child" && childcount > 0) {
            setChildCount(childcount - 1);
        }
    };
    
  
    const fetchData = async (search) => {
        debouncedSearch(search)
    };
    
    const debouncedSearch = _debounce(async (value) => {
        // alert("2")
        setLoading(true);

        try {
            // Make an API call to get search results
            const response = await axios.get(process.env.REACT_APP_BACKEND_URL + "/cities" + `?city=${value}`);
            const data = response.data; // Assuming response is an array of cities and airports
            // Format the data for Ant Design's AutoComplete options
            setOptions(data.cities);

            // setOptions(formattedOptions);
            setLoading(false);

            console.log(options)
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);

        }
    }, 500);
    const handleDateChange = (dates) => {
        const formattedDates = dates.map((date) => date.format('YYYY-MM-DD')); // Format dates as YYYY-MM-DD
        setCheckinDate(formattedDates[0]);
        setCheckOutDate(formattedDates[1]);
        console.log(formattedDates)
        setSelectedDate(dates); // Store selected date range in state
    };
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setAmenities((prevAmenities) => ({
            ...prevAmenities,
            [name]: checked,
        }));
    };
    // Function to handle value change in Select component
    const handlePricingChange = (value) => {
        SetPricingval(value); // Update the state with the selected value
    };
    const handleStarChange = (value) => {
        SetStarval(value); // Update the state with the selected value
    };
    const onSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior


        let hotelval = {
            type: "hotel",
            bookingDetails: {

                destination: inputValue,
                checkIn: checkinDate,
                checkOut: checkOutDate,
                guests: {
                    rooms: roomcount,
                    adults: adultcount,
                    children: childcount
                },
                facilities: amenities,
                pricing: pricingval, // Replace with the selected pricing value
                stars: starval // Replace with the selected star rating value
            }

        }
        openLoginModal(hotelval); // Call the function passed as a prop to open the login modal in the Home component

        return;
        // alert("stop")
    }
    return (
        <div className='tabForm'>
            <form className='inline_Form' >
                <div className='formGrp hoverCenter'>
                    <label htmlFor='destination'>Destination</label>
                    <Autocomplete
                        id="api-autocomplete"
                        style={{ width: 300 }}
                        options={options}
                        defaultValue={"Vancouver"} // Set the default value here
                        freeSolo
                        getOptionLabel={(option) => option}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                            fetchData(newInputValue)
                        }}
                        renderInput={(params) => (
                            // <TextField {...params} label="Search a repository" variant="outlined" fullWidth />
                            <TextField {...params} fullWidth />
                        )}
                    />

                </div>

                <div className='formGrp hoverCenter'>
                    <label htmlFor='checkOut'>Check In & Check Out</label>
                    {/* <Space direction="vertical" size={12}> */}
                    <RangePicker
                        id='checkOut'
                        disabledDate={disabledDate}
                        placeholder={hotelPickerPlaceholder}
                        onChange={handleDateChange} // Capture the selected date range
                        defaultValue={[checkinDate, checkOutDate]} // Set default values

                    />
                </div>
                <div className='formGrp hoverCenter'>
                    <label htmlFor='guest_room'>Guests & Rooms</label>
                    <Dropdown
                        title={dropdownTitle}
                        open={dropdownOpen}
                        onToggle={() => setDropdownOpen(!dropdownOpen)}
                        onOpen={() => setDropdownOpen(true)}
                        onClose={() => setDropdownOpen(false)}

                    >
                        <div className='guest_wrap'>
                            <div className='g_col'>
                                <label>Rooms</label>
                                <div className='count'>
                                    <button onClick={(e) => decrement(e, "room")}>-</button>
                                    <span>{roomcount}</span>
                                    <button onClick={(e) => increment(e, "room")}>+</button>
                                </div>
                            </div>
                            <div className='g_col'>
                                <label>Adults</label>
                                <div className='count'>
                                    <button onClick={(e) => decrement(e, "adult")}>-</button>
                                    <span>{adultcount}</span>
                                    <button onClick={(e) => increment(e, "adult")}>+</button>
                                </div>
                            </div>
                            <div className='g_col'>
                                <label>Children</label>
                                <div className='count'>
                                    <button onClick={(e) => decrement(e, "child")}>-</button>
                                    <span>{childcount}</span>
                                    <button onClick={(e) => increment(e, "child")}>+</button>
                                </div>
                            </div>
                        </div>
                        {/* We can ignore below button for now */}
                        {/* <Button className='butn butn_success butn_rounded' onClick={updateGuestsArray}>Apply</Button> */}
                    </Dropdown>
                </div>
                <div className='formGrp hoverCenter'>
                    <label htmlFor='guest_room'> Amenities</label>
                    <Dropdown
                        title={`Amenities: ${amenities.breakfast ? 'Breakfast ' : ''} ${amenities.pool ? 'Pool ' : ''} ${amenities.wifi ? 'Wifi ' : ''} ${amenities.childFriendly ? 'Child-Friendly ' : ''}`}
                        open={facdropdownOpen}
                        onToggle={() => setFacDropdownOpen(!facdropdownOpen)}
                        onOpen={() => setFacDropdownOpen(true)}
                        onClose={() => setFacDropdownOpen(false)}

                    >
                        <div className='guest_wrap'>
                            <div className='g_col'>
                                <label>Breakfast</label>
                                <div className='count'>
                                    <input
                                        type="checkbox"
                                        name="breakfast"
                                        checked={amenities.breakfast}
                                        onChange={handleCheckboxChange} />
                                </div>
                            </div>
                            <div className='g_col'>
                                <label>Pool</label>
                                <div className='count'>
                                    <input
                                        type="checkbox"
                                        name="pool"
                                        checked={amenities.pool}
                                        onChange={handleCheckboxChange} />

                                </div>
                            </div>
                            <div className='g_col'>
                                <label>Wifi</label>
                                <div className='count'>
                                    <input
                                        type="checkbox"
                                        name="wifi"
                                        checked={amenities.wifi}
                                        onChange={handleCheckboxChange} />

                                </div>
                            </div>
                            <div className='g_col'>
                                <label>Pet-Friendly</label>
                                <div className='count'>
                                    <input
                                        type="checkbox"
                                        name="wifi"
                                        checked={amenities.count}
                                        onChange={handleCheckboxChange} />

                                </div>
                            </div>
                        </div>
                        {/* <Button className='butn butn_success butn_rounded' onClick={updateFaility}>Apply</Button> */}
                    </Dropdown>
                </div>
                <div className='formGrp hoverCenter'>
                    <label htmlFor='adults'>Pricing</label>
                    <Space wrap>
                        <Select
                            value={pricingval}
                            placeholder="pricing"
                            style={{
                                width: 120,
                            }}
                            onChange={handlePricingChange}
                            options={pricing}
                        />
                    </Space>
                    {/* <InputPicker id='adults' data={rooms} appearance="subtle" /> */}
                </div>
                <div className='formGrp hoverCenter'>
                    <label htmlFor='children'>Stars</label>
                    <Space wrap>
                        <Select
                            value={starval}
                            style={{
                                width: 120,
                            }}
                            onChange={handleStarChange}
                            options={stars}
                        />
                    </Space>
                    {/* <InputPicker id='children' data={rooms} appearance="subtle" /> */}
                </div>
                <div className='formBtn'>
                    <button type='submit' className='butn butn_success' onClick={onSubmit} >Submit</button>
                </div>
            </form>
        </div>
    )

}

export default Hotel;

