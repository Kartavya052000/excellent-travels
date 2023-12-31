import React, { useState } from "react";
import axios from "axios";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import _debounce from 'lodash/debounce';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Button, Dropdown } from "rsuite";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
const { RangePicker } = DatePicker;

const Flight = ({ openLoginModal }) => {
    const [showReturn, setShowReturn] = useState(false); // State to manage the visibility of return date
    const [options, setOptions] = useState([]);
    const [wayval, Setwayval] = useState("oneWay")
    const [loading, setLoading] = useState(false);
    const [fromvalue, setFromValue] = useState('');
    const [tovalue, setTomValue] = useState('');
    const [Departvalue, setDepartValue] = useState('');
    const [Returnvalue, setReturnalue] = useState('');
    const [cityCount, setCityCount] = useState(1); // State to manage the count of cities for Multi-city
    const [adultcount, SetadultCount] = useState(1);
    const [childcount, SetChildCount] = useState(0);
    const [infantcount, SetInfantCount] = useState(0);
    const [flightErrors, setFlightErrors] = useState({
        from: false,
        to: false,
        Departure: false,
        DepartReturn:false
    })
    let title = `${adultcount} Adult`;
    title += childcount > 0 ? ` ${childcount} Children` : '';
    title += infantcount > 0 ? ` ${infantcount} Infant` : '';
    const handleChange = (event) => {
        // setTabIndex(index);
        Setwayval(event.target.value);
        let way = event.target.value
        // // Based on the selected tab index, set the visibility of return date picker
        if (way === "oneWay") {
            setShowReturn(false); // One Way
            setCityCount(1);

        } else if (way === "roundTrip") {
            setShowReturn(true); // Round Trip or Multi-city
            setCityCount(1);
        } else {
            if (event.target.value === "multiCity") {
                setShowReturn(true); // Show return date picker for multi-city
                setCityCount(cityCount + 1); // Set initial city count to 2 (you can set it to any default count)
            }
        }
    };

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
    const handleDateChange = (dates) => {
        setDepartValue(dates.format('YYYY-MM-DD')); // Format dates as YYYY-MM-DD
        setFlightErrors({...flightErrors,Departure:false})

    };
    const handleDatesChange = (dates) => {
        const formattedDates = dates.map((date) => date.format('YYYY-MM-DD')); // Format dates as YYYY-MM-DD
        setDepartValue(formattedDates[0]);
        setReturnalue(formattedDates[1]);
         setFlightErrors({...flightErrors,DepartReturn:false})

    };
    const ReturnLabel = () => {
        setShowReturn(true);
        Setwayval("roundTrip");
    }
    const AddCity = (e) => {
        e.preventDefault();
        setCityCount(cityCount + 1)
    }


    const increment = (e, val) => {
        // alert(val)
        e.preventDefault()
        if (val === "adult") {
            SetadultCount(adultcount + 1);
        } else if (val === "child") {
            SetChildCount(childcount + 1);
            title += ` + ${childcount} Children`;

        } else if (val === "infant") {
            SetInfantCount(infantcount + 1);
            title += ` + ${infantcount} Children`;

        }
    };

    // Decrement function for updating the counts
    const decrement = (e, val) => {
        e.preventDefault()

        if (val === "adult" && adultcount > 1) {
            SetadultCount(adultcount - 1);
        } else if (val === "child" && childcount > 0) {
            SetChildCount(childcount - 1);
        } else if (val === "infant" && infantcount > 0) {
            SetInfantCount(infantcount - 1);
        }
    };
    const onSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        console.log(fromvalue,"FFFF")
       
        if (tovalue == "") {
            // setTimeout(()=>{
                setFlightErrors({ ...flightErrors, to: true });

            // },500)
        }
        if (Departvalue == "") {
            setFlightErrors({ ...flightErrors, Departure: true });
        }
        if (fromvalue == "") {
            setFlightErrors({ ...flightErrors, from: true });
            
        }
        if (fromvalue == '' || tovalue == '' || Departvalue == '') {
            return
        }
        let hotelval = {
            type: "flight",
            bookingDetails: {
                roundtype: wayval,
                From: fromvalue,
                To: tovalue,
                Departure: Departvalue,
                Adults: adultcount,
                Children: childcount,
                Infant: infantcount
            }

        }
        if (wayval === "multiCity" || wayval == 'roundTrip') {
            if (Returnvalue =="") {
              setFlightErrors({...flightErrors,DepartReturn:true})
              return
            }
            hotelval.bookingDetails.Returnvalue = Returnvalue;
        }
        openLoginModal(hotelval); // Call the function passed as a prop to open the login modal in the Home component

        return;
        // alert("stop")
    }
    return (
        <div className='tabForm flightForm'>
            <RadioGroup
                name="radioList"
                value={wayval}
                onChange={handleChange}
                row
                className="radioGrp">

                <FormControlLabel value="oneWay" control={<Radio />} label="One Way" />
                <FormControlLabel value="roundTrip" control={<Radio />} label="Round Trip" />
                {/* <FormControlLabel value="multiCity" control={<Radio />} label="Multi-city" /> */}
            </RadioGroup>
            {Array.from({ length: cityCount }).map((_, index) => (
                <form className='inline_Form'>
                    <div className={(showReturn == true) ? 'formGrp hoverCenter flightFrom fieldBord active' : 'formGrp hoverCenter flightFrom fieldBord'}>
                        <label htmlFor='from'>From</label>
                        <Autocomplete
                            options={options}
                            defaultValue={"Vancouver"} // Set the default value here

                            getOptionLabel={(option) => option}
                            onInputChange={(event, newInputValue) => {
                                setFromValue(newInputValue);
                                fetchData(newInputValue)
                                if(newInputValue !== ""){
                                    setFlightErrors({...flightErrors,from:false})
                                }
                            }}
                            renderInput={(params) => (
                                <TextField {...params}
                                    variant="outlined"
                                    fullWidth
                                    style={{ fontWeight: 800 }}
                            className={flightErrors.from ? 'fieldErr' : ''}

                                    required
                                />
                            )}
                        />

                    </div>
                    <div className='formGrp fieldChng'>
                        <button type='button' className='interchnge'><i className='fa fa-arrow-right-arrow-left'></i></button>
                    </div>
                    <div className={(showReturn == true) ? 'formGrp hoverCenter flightTo fieldBord active' : 'formGrp hoverCenter flightTo fieldBord'}>
                        <label htmlFor='destination'>To</label>
                        <Autocomplete
                            options={options}
                            defaultValue={"Vancouver"} // Set the default value here
                            className={flightErrors.to ? 'fieldErr' : ''}

                            getOptionLabel={(option) => option}
                            onInputChange={(event, newInputValue) => {
                                setTomValue(newInputValue);
                                fetchData(newInputValue)
                                setFlightErrors({...flightErrors,to:false})

                            }}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" fullWidth 
                                required
                                />
                            )}
                        />

                    </div>
                    {showReturn == false && (<>
                        <div className='formGrp hoverCenter fieldBord departure'>
                            <label htmlFor='return'>Departure</label>
                            {/* <DatePicker id='return' format='MM/dd/yyyy' appearance='subtle' /> */}
                            <DatePicker
                                disabledDate={disabledDate}
                                placeholder="Departure"
                            className={flightErrors.Departure ? 'fieldErr' : ''}

                                onChange={handleDateChange} // Capture the selected date range
                                required

                            />
                        </div>
                    </>

                    )}
                    {showReturn == true && (
                        <div className='formGrp hoverCenter fieldBord return'>
                            <label htmlFor='return'>Departure and Return</label>
                            {/* <DatePicker id='return' format='MM/dd/yyyy' appearance='subtle' /> */}
                            <RangePicker
                                disabledDate={disabledDate}
                                placeholder={ticketPickerPlaceholder}
                                onChange={handleDatesChange} // Capture the selected date range
                            className={flightErrors.DepartReturn ? 'fieldErr' : ''}

                            />
                        </div>
                    )}
                    {index == 0 ? (
                        <>
                            <div className='formGrp hoverCenter traveller fieldBord'>
                                <label htmlFor='travellers'>Travellers</label>
                                <Dropdown title={title}>
                                    <div className='guest_wrap'>
                                        <div className='g_col'>
                                            <label>Adults (12yr +)</label>
                                            <div className='count'>
                                                <button onClick={(e) => decrement(e, "adult")}>-</button>
                                                <span>{adultcount}</span>
                                                <button onClick={(e) => increment(e, "adult")}>+</button>
                                            </div>
                                        </div>
                                        <div className='g_col'>
                                            <label>Children(2y -12y)</label>
                                            <div className='count'>
                                                <button onClick={(e) => decrement(e, "child")}>-</button>
                                                <span>{childcount}</span>
                                                <button onClick={(e) => increment(e, "child")}>+</button>
                                            </div>
                                        </div>
                                        <div className='g_col'>
                                            <label>Infant </label>
                                            <div className='count'>
                                                <button onClick={(e) => decrement(e, "infant")}>-</button>
                                                <span>{infantcount}</span>
                                                <button onClick={(e) => increment(e, "infant")}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <Button className='butn butn_success butn_rounded'>Accept</Button> */}
                                </Dropdown>
                            </div>
                        </>
                    ) : (null)}

                    {(index === cityCount - 1 && index != 0) && (
                        <div className='formGrp fieldBord addMore'>
                            <button type='submit' className='butn butn_success butn_sm' onClick={AddCity}>Add another City</button>
                        </div>
                    )}

                    {index == 0 && (
                        <div className='formBtn'>
                            <button type='submit' className='butn butn_success' onClick={onSubmit}>Submit</button>
                        </div>
                    )}
                </form>
            ))}
        </div>
    )
}

export default Flight;