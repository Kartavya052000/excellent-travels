import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DatePicker, Space, Select } from 'antd';
import dayjs from 'dayjs';
import _debounce from 'lodash/debounce';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Button, Dropdown, Input, InputNumber, InputPicker, SelectPicker } from "rsuite";

const { RangePicker } = DatePicker;

const Hotel = () => {
    const navigate = useNavigate()
    const [roomcount, setRoomCount] = useState(0);
    const [adultcount, setAdultCount] = useState(0);
    const [childcount, setChildCount] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility
    const [facdropdownOpen, setFacDropdownOpen] = useState(false); // State to manage dropdown visibility
    const [drivedropdownOpen, setdrivDropdownOpen] = useState(false); // State to manage dropdown visibility
    const [options, setOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const stars = ['3 star', '5 star', '7 star'].map(
        item => ({ label: item, value: item })
    );
    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
    };
    const hotelPickerPlaceholder = ['Check In ', 'Check out'];
    const ticketPickerPlaceholder = ['Departue ', 'Return'];
    const pickupPickerPlaceholder = ['Pick Up ', 'Drop Off'];
    const rooms = ['1', '2', '3', '4', '5'].map(
        item => ({ label: item, value: item })
    );
    const pricing = ['CA0 - CA300', 'CA300-CA600', 'CA600 & Above'].map(
        item => ({ label: item, value: item })
    );
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
    const updateGuestsArray = () => {

        setDropdownOpen(!dropdownOpen)
    };
    const updateFaility = () => {

        setFacDropdownOpen(!dropdownOpen)
    };
    const fetchData = async (search) => {
        debouncedSearch(search)
    };
    const onSearch = () => {
        navigate('/booking-confirmation`')
    }
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
return(
    <div className='tabForm'>
    <form className='inline_Form'>
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
                    <TextField {...params} label="Search a repository" variant="outlined" fullWidth />
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
            />
        </div>
        <div className='formGrp hoverCenter'>
            <label htmlFor='guest_room'>Guests & Rooms</label>
            <Dropdown
                title="Guests & Room"
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
                <Button className='butn butn_success butn_rounded' onClick={updateGuestsArray}>Apply</Button>
            </Dropdown>
        </div>
        <div className='formGrp hoverCenter'>
            <label htmlFor='guest_room'>Choose Facilities</label>
            <Dropdown
                title="Facilities"
                open={facdropdownOpen}
                onToggle={() => setFacDropdownOpen(!facdropdownOpen)}
                onOpen={() => setFacDropdownOpen(true)}
                onClose={() => setFacDropdownOpen(false)}

            >
                <div className='guest_wrap'>
                    <div className='g_col'>
                        <label>Breakfast</label>
                        <div className='count'>
                            <input type="checkbox" name="breakfast" />
                        </div>
                    </div>
                    <div className='g_col'>
                        <label>Pool</label>
                        <div className='count'>
                            <input type="checkbox" name="pool" />

                        </div>
                    </div>
                    <div className='g_col'>
                        <label>Wifi</label>
                        <div className='count'>
                            <input type="checkbox" name="wifi" />

                        </div>
                    </div>
                    <div className='g_col'>
                        <label>Pet-Friendly</label>
                        <div className='count'>
                            <input type="checkbox" name="wifi" />

                        </div>
                    </div>
                </div>
                <Button className='butn butn_success butn_rounded' onClick={updateFaility}>Apply</Button>
            </Dropdown>
        </div>
        <div className='formGrp hoverCenter'>
            <label htmlFor='adults'>Pricing</label>
            <Space wrap>
                <Select
                    // defaultValue=""
                    placeholder="pricing"
                    style={{
                        width: 120,
                    }}
                    //   onChange={handleChange}
                    options={pricing}
                />
            </Space>
            {/* <InputPicker id='adults' data={rooms} appearance="subtle" /> */}
        </div>
        <div className='formGrp hoverCenter'>
            <label htmlFor='children'>Stars</label>
            <Space wrap>
                <Select
                    defaultValue="5 star"
                    style={{
                        width: 120,
                    }}
                    //   onChange={handleChange}
                    options={stars}
                />
            </Space>
            {/* <InputPicker id='children' data={rooms} appearance="subtle" /> */}
        </div>
        <div className='formBtn'>
            <button type='submit' className='butn butn_success' onClick={onSearch} >Submit</button>
        </div>
    </form>
</div>
)

}

export default Hotel;

