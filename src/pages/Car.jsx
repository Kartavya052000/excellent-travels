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

const CarHire = ({ openLoginModal }) => {
    const today = dayjs();

    const [drivedropdownOpen, setdrivDropdownOpen] = useState(false); // State to manage dropdown visibility
    const [options, setOptions] = useState([]);
    const [pickValue, setPickValue] = useState('');
    const [dropValue, setDropValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [drivervalue, SetDriverValue] = useState("")
    const pickupPickerPlaceholder = ['Pick Up', 'Drop Off'];
    const [checkinDate, setCheckinDate] = useState(today.add(1, 'day'))
    const [checkOutDate, setCheckOutDate] = useState(checkinDate.add(2, 'day'))
    const [selectedDate, setSelectedDate] = useState([]); // State to store selected date range
    const [cartype, SetcarType] = useState("")
    const [capacity, SetCap] = useState("")
    const [driverreq, SetDriverReq] = useState("")
    const [wheeldrive, SetWheelDrive] = useState("")
    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
    };
  
    const carType=[
       { label:"5 seater car",value:"5 seater car"},
       { label:"SUV",value:"SUV"},
       { label:"premium van",value:"premium van"},
       { label:"mini commercial van or truck",value:"mini commercial van or truck"}
    ]
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
    const handleChange = (e) => {
        // console.log(e.target.value)
        SetDriverValue(e.target.value)
    }
    const handleDateChange = (dates) => {
        const formattedDates = dates.map((date) => date.format('YYYY-MM-DD')); // Format dates as YYYY-MM-DD
        setCheckinDate(formattedDates[0]);
        setCheckOutDate(formattedDates[1]);
        console.log(formattedDates)
        setSelectedDate(dates); // Store selected date range in state
    };
    const handleType = (value) => {
        SetcarType(value)
    }
    const handleCapType = (value) => {
        SetCap(value)
    }
    const handleDrivType = (value) => {
        SetDriverReq(value)
    }
    const handleWheelType = (e) => {
        SetWheelDrive(e.target.value)
    }
    const onSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        let carval = {
            type: "car",
            bookingDetails: {

                pickuplocation: pickValue,
                dropOffLocation: dropValue,
                DriversAge: drivervalue,
                PickupDateAndTIme: checkinDate,
                DropOffDateAndTime: checkOutDate,
                CarType: cartype,
                Capacity: capacity,
                // DriverRequired: driverreq,
                WheelDrive: wheeldrive
            }

        }
console.log(carval);

        openLoginModal(carval); // Call the function passed as a prop to open the login modal in the Home component

        return;
    }
const handlePricingChange =(e) =>{
    SetcarType(e.target.value)
}

const handleCapacity = (e) =>[
    SetCap(e.target.value)
]
    return (
        <div className='tabForm carForm'>
            <form className='inline_Form'>
                <div className='formGrp hoverCenter carPickup fieldBord'>
                    <label htmlFor='fromLoc'>Pick up city/airport/address</label>
                    <Autocomplete
                        options={options}
                        defaultValue={"Vancouver"} // Set the default value here
                        freeSolo
                        getOptionLabel={(option) => option}
                        onInputChange={(event, newInputValue) => {
                            setPickValue(newInputValue);
                            fetchData(newInputValue)
                        }}
                        renderInput={(params) => (
                            <TextField {...params} fullWidth />
                        )}
                    />

                </div>
                <div className='formGrp fieldChng'>
                    <button type='button' className='interchnge'><i className='fa fa-arrow-right-arrow-left'></i></button>
                </div>
                <div className='formGrp hoverCenter carDrop fieldBord'>
                    <label htmlFor='fromLoc'>Drop Off city/airport/address</label>
                    <Autocomplete
                        options={options}
                        defaultValue={"Vancouver"}
                        freeSolo
                        getOptionLabel={(option) => option}
                        onInputChange={(event, newInputValue) => {
                            setDropValue(newInputValue);
                            fetchData(newInputValue)
                        }}
                        renderInput={(params) => (
                            <TextField {...params} fullWidth />
                        )}
                    />

                </div>

               

                <div className='formGrp hoverCenter carPickDropTime fieldBord'>
                    <label htmlFor='checkOut'>Pick up & Drop Off (Time)</label>
                    <RangePicker
                        id='checkOut'
                        disabledDate={disabledDate}
                        placeholder={pickupPickerPlaceholder}
                        showTime
                        onChange={handleDateChange} // Capture the selected date range
                        defaultValue={[checkinDate, checkOutDate]} // Set default values
                    />
                </div>
             
                <div className='formGrp hoverCenter driver fieldBord'>
                    <label htmlFor='driver'>Driver</label>
                    <Dropdown title="Driver">
                        <div className='guest_wrap'>
                        <div className='g_col'>
                                <label for='driverage'>young driver under 30</label>
                                <div className='count check'>
                                    <input type="radio" name="driverage" id="driverage" value="under 30" onChange={handleChange} />
                                </div>
                            </div>
                            <div className='g_col'>
                                <label for="seniorage">senior over 70 years
                                    <span>old may be required to pay an additional fee</span>
                                </label>
                                <div className='count check'>
                                    <input type="radio" name="driverage" id="seniorage" value="over 70" onChange={handleChange} />
                                </div>
                            </div>
                            <div className='g_col'>
                                <label>Driver's Required
                                <span>If you need a driver for the car</span>

                                </label>

                                <div className='count check'>
                                <input type="radio" name="driverage" id="driverReq" value="driver required" onChange={handleChange} />

                                    {/* <input type="checkbox" name="driverReq" id="driverReq" /> */}
                                </div>
                            </div>
                        </div>
                    </Dropdown>
                </div>
                <div className='formGrp hoverCenter cars fieldBord'>
                <label htmlFor='cars'>Cars</label>
                    <Dropdown title="Car Type">
                        <div className='guest_wrap'>
                            <div className='g_col'>
                                <label for='cartype'>Car Type</label>
                                <div className='count check'>
                                    <select onChange={handlePricingChange}>
                                        <option selected>Select</option>
                                        <option>5 Seater Car</option>
                                        <option>SUV</option>
                                        <option>Premium Van</option>
                                        <option>Mini Commercial Van or Truck</option>
                                    </select>
                              
                                </div>
                            </div>
                            <div className='g_col'>
                                <label for='capacity'>Capacity</label>
                                <div className='count check'>
                                    <select onChange={handleCapacity}>
                                        <option selected>Select</option>
                                        <option>2-5 Passengers</option>
                                        <option>6 or more Passengers</option>
                                    </select>
                                </div>
                            </div>
                            <div className='g_col'>
                                <label for='wheeldrive'>Wheel Drive</label>
                                <div className='count check'>
                                    <select onChange={handleWheelType}>
                                        <option selected>Select</option>
                                        <option>All Wheel Drive</option>
                                        <option>2 Wheel Drive</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </Dropdown>
                </div>
                {/* <div className='formGrp hoverCenter'>
                    <label htmlFor='adults'>Wheel Drive</label>
                    <Space wrap>
                        <Select
                            // defaultValue=""
                            placeholder="Wheel Drive"
                            style={{
                                width: 120,
                            }}
                            value={wheeldrive}
                            onChange={handleWheelType}
                            options={drive}
                        />
                    </Space>
                </div> */}
                <div className='formBtn'>
                    <button type='submit' className='butn butn_success' onClick={onSubmit} >Submit</button>
                </div>
            </form>
        </div>
    )
}
export default CarHire;
