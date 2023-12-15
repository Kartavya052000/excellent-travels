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

const CarHire = () =>{
    const [drivedropdownOpen, setdrivDropdownOpen] = useState(false); // State to manage dropdown visibility
    const [options, setOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const pickupPickerPlaceholder = ['Pick Up ', 'Drop Off'];
    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
    };
    const carType = ['5 seater car', 'SUV', 'premium van', 'Standard pick up extended cab', 'mini commercial van or truck'].map(
        item => ({ label: item, value: item })
    );
    const Capacity = ['2-5 passengers', '6 or more passengers'].map(
        item => ({ label: item, value: item })
    );
    const drive = ['all wheel drive', ' Two wheel drive'].map(
        item => ({ label: item, value: item })
    );
    const driverRequired = ['Yes', 'No'].map(
        item => ({ label: item, value: item })
    );
   
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
                                    <form className='inline_Form'>

                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='fromLoc'>Pick up city/airport/or address</label>
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
                                        <div className='formGrp mw-auto w-auto'>
                                            <button type='button' className='interchnge'><i className='fa fa-arrow-right-arrow-left'></i></button>
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='fromLoc'>Drop Off city/airport/or address</label>
                                            <Autocomplete
                                                id="api-autocomplete"
                                                style={{ width: 300 }}
                                                options={options}
                                                defaultValue={"Vancouver"}
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
                                            <label htmlFor='guest_room'>Drivers</label>
                                            <Dropdown
                                                title="Drivers"
                                                open={drivedropdownOpen}
                                                onToggle={() => setdrivDropdownOpen(!drivedropdownOpen)}
                                                onOpen={() => setdrivDropdownOpen(true)}
                                                onClose={() => setdrivDropdownOpen(false)}

                                            >
                                                <div className='guest_wrap'>
                                                    <div className='g_col'>
                                                        <label>young driver under 30</label>
                                                        <div className='count'>
                                                            <input type="checkbox" name="young" />

                                                        </div>
                                                    </div>
                                                    <div className='g_col'>
                                                        <label>senior over 70 years
                                                            <span>old may be required to pay an additional fee</span>
                                                        </label>                                                        
                                                        <div className='count'>
                                                            <input type="checkbox" name="old" />

                                                        </div>
                                                    </div>

                                                </div>
                                                {/* <Button className='butn butn_success butn_rounded' onClick={updateGuestsArray}>Apply</Button> */}
                                            </Dropdown>


                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='checkOut'>Pick up & Drop Off (Time)</label>
                                            {/* <Space direction="vertical" size={12}> */}
                                            <RangePicker
                                                id='checkOut'
                                                disabledDate={disabledDate}
                                                placeholder={pickupPickerPlaceholder}
                                                showTime
                                            />
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='adults'>Car Type</label>
                                            <Space wrap>
                                                <Select
                                                    // defaultValue=""
                                                    placeholder="Car Type"
                                                    style={{
                                                        width: 120,
                                                    }}
                                                    //   onChange={handleChange}
                                                    options={carType}
                                                />
                                            </Space>
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='adults'>Capacity</label>
                                            <Space wrap>
                                                <Select
                                                    // defaultValue=""
                                                    placeholder="Capacity"
                                                    style={{
                                                        width: 120,
                                                    }}
                                                    //   onChange={handleChange}
                                                    options={Capacity}
                                                />
                                            </Space>
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='adults'>Driver Required ?</label>
                                            <Space wrap>
                                                <Select
                                                    // defaultValue=""
                                                    placeholder="Driver Required"
                                                    style={{
                                                        width: 120,
                                                    }}
                                                    //   onChange={handleChange}
                                                    options={driverRequired}
                                                />
                                            </Space>
                                        </div>
                                        <div className='formGrp hoverCenter'>
                                            <label htmlFor='adults'>Wheel Drive</label>
                                            <Space wrap>
                                                <Select
                                                    // defaultValue=""
                                                    placeholder="Wheel Drive"
                                                    style={{
                                                        width: 120,
                                                    }}
                                                    //   onChange={handleChange}
                                                    options={drive}
                                                />
                                            </Space>
                                        </div>
                                    </form>
                                </div>
    )
}
export default CarHire;
