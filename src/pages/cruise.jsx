
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

const Cruise = () =>{
    const navigate = useNavigate();

    const cruiseLine = ['Azamara', 'Carnival Cruise Line', 'Celebrity Cruises', 'Cunard', 'Disney Cruise Line'].map(
        item => ({ label: item, value: item })
    );

    const [options, setOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);

    
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
           
            <div className='formGrp'>
                <label htmlFor='destination'>Destination</label>
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
    )
}

export default Cruise;