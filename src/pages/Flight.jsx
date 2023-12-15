import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DatePicker, Space, Select } from 'antd';
import dayjs from 'dayjs';
import _debounce from 'lodash/debounce';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Button, Dropdown, Input, InputNumber, InputPicker, SelectPicker } from "rsuite";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
const { RangePicker } = DatePicker;

const Flight = () =>{
    const navigate = useNavigate();
    const [showReturn, setShowReturn] = useState(false); // State to manage the visibility of return date
    const [options, setOptions] = useState([]);
    const [open, setOpen] = useState(false);
    const [tabIndex, setTabIndex] = useState(0); // State to manage the selected tab index
    const [wayval, Setwayval] = useState("oneWay")
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        // setTabIndex(index);
        Setwayval(event.target.value);
        let way = event.target.value
        // // Based on the selected tab index, set the visibility of return date picker
        if (way === "oneWay") {
            setShowReturn(false); // One Way
        } else if (way === "roundTrip" || way === "multiCity") {
            setShowReturn(true); // Round Trip or Multi-city
        }
    };
    const onSearch = () => {
        navigate('/booking-confirmation`')
    }
    const ticketPickerPlaceholder = ['Departue ', 'Return'];

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
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
    }, 500); // Debounce time (milliseconds)

   
    const fetchData = async (search) => {
        debouncedSearch(search)
    };
    return(
        <div className='tabForm'>
        <RadioGroup
            name="radioList"
            value={wayval}
            onChange={handleChange}
            row
        >
            <FormControlLabel value="oneWay" control={<Radio />} label="One Way" />
            <FormControlLabel value="roundTrip" control={<Radio />} label="Round Trip" />
            <FormControlLabel value="multiCity" control={<Radio />} label="Multi-city" />
        </RadioGroup>
        <form className='inline_Form'>

            <div className='formGrp hoverCenter'>
                <label htmlFor='destination'>From</label>
                <Autocomplete
                    id="api-autocomplete"
                    style={{ width: 300 }}
                    options={options}
                    defaultValue={"Vancouver"} // Set the default value here

                    getOptionLabel={(option) => option}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                        fetchData(newInputValue)
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Search Airport" variant="outlined" fullWidth />
                    )}
                />

            </div>
            <div className='formGrp w-auto'>
                <button type='button' className='interchnge'><i className='fa fa-arrow-right-arrow-left'></i></button>
            </div>
            <div className='formGrp hoverCenter'>
                <label htmlFor='destination'>To</label>
                <Autocomplete
                    id="api-autocomplete"
                    style={{ width: 300 }}
                    options={options}
                    defaultValue={"Vancouver"} // Set the default value here

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
            {showReturn == false && (
                <div className='formGrp hoverCenter'>
                    <label htmlFor='return'>Departure</label>
                    {/* <DatePicker id='return' format='MM/dd/yyyy' appearance='subtle' /> */}
                    <DatePicker
                        disabledDate={disabledDate}
                        placeholder="Departure"

                    />
                </div>
            )}
            {showReturn == true && (
                <div className='formGrp hoverCenter'>
                    <label htmlFor='return'>Departure and Return</label>
                    {/* <DatePicker id='return' format='MM/dd/yyyy' appearance='subtle' /> */}
                    <RangePicker
                        disabledDate={disabledDate}
                        placeholder={ticketPickerPlaceholder}

                    />
                </div>
            )}

            <div className='formGrp hoverCenter'>
                <label htmlFor='travellers'>Travellers</label>
                {/* <Dropdown title="Travellers">
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
                    <Button className='butn butn_success butn_rounded'>Accept</Button>
                </Dropdown> */}
            </div>
            <div className='formBtn'>
                <button type='submit' className='butn butn_success' onClick={onSearch}>Submit</button>
            </div>
        </form>

    </div>
    )
}

export default Flight;