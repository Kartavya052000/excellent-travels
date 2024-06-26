
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

const Cruise = ({ openLoginModal }) => {
    const navigate = useNavigate();

    // const cruiseLine = ['Azamara', 'Carnival Cruise Line', 'Celebrity Cruises', 'Cunard', 'Disney Cruise Line'].map(
    //     item => ({ label: item, value: item })
    // );
    const Months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"].map(
            item => ({ label: item, value: item })
        );
    const shuttle = ['Yes', 'No'].map(
        item => ({ label: item, value: item })
    );
    const Days = Array.from({ length: 31 }, (_, i) => ({ label: `${i + 1}`, value: `${i + 1}` }));

    const [options, setOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [departMonth, setDepartMonth] = useState("")
    const [cruiseLine, setCruiseLine] = useState("")
    const [duration, setDuration] = useState("")
    const [shuttleval, setShuttleVal] = useState("Yes")
    const [facdropdownOpen, setFacDropdownOpen] = useState(false); // State to manage dropdown visibility
    const [amendownOpen, setAmenDropdownOpen] = useState(false); // State to manage dropdown visibility
    const [cabindropdownOpen, setCabinDropdownOpen] = useState(false); // State to manage dropdown visibility
    const [Bevragepackage, setBevragepackage] = useState({
        tea: false,
        coffee: false,
        bottledWater: false,
        nonalcoholicBottle: false,
        juices: false,
        beer: false,
        wines: false,
        soda: false,
        cocktail: false
    });
    const [amenities, setAmenities] = useState({
        wifi: false
    })
    const [CabinType, setCabinType] = useState({
        windows: false,
        nonWindows: false,
        midShipCabin: false,
        familyRooms: false,
        balcony: false,
        scenicViewCabins: false

    });


    const [desterror, setDestError] = useState(false)
    useEffect(() => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed

        const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        // Set departMonth to the current month from the array
        setDepartMonth(Months[currentMonth - 1]); // Subtract 1 as months array is zero-indexed
    }, []);
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setBevragepackage((prevAmenities) => ({
            ...prevAmenities,
            [name]: checked,
        }));
    };
    const handleamenCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setAmenities((prevAmenities) => ({
            ...prevAmenities,
            [name]: checked,
        }));
    };
    const handleCabinCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCabinType((prevAmenities) => ({
            ...prevAmenities,
            [name]: checked,
        }));
    };
    const fetchData = async (search) => {
        debouncedSearch(search)
    };
    const onSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        if (inputValue == "") {
            setDestError(true);
            return
        }
      
        
        let cruiseval = {
            type: "cruise",
            bookingDetails: {

                Destination: inputValue,
                DepartureMonth: departMonth,
                CruiseLine: cruiseLine,
                Duration: duration,
                ShuttleService: shuttleval,
                BevPackage: Bevragepackage,
                amenities: amenities,
                cabinType: CabinType
            }

        }
        openLoginModal(cruiseval); // Call the function passed as a prop to open the login modal in the Home component
        return;
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
    const handleDepartChange = (value) => {
        setDepartMonth(value)
    }
    const handleCruiseChange = (value) => {
        setCruiseLine(value)
    }
    const handleDurChange = (value) => {
        setDuration(value)
    }
    const handleShuttle = (value) => {
        setShuttleVal(value)
    }

    return (
        <div className='tabForm cruiseForm'>
            <form className='inline_Form'>
                <div className='formGrp hoverCenter destin fieldBord'>
                    <label htmlFor='destination'>Destination</label>
                    <Autocomplete
                        options={options}
                        defaultValue={"Vancouver"} // Set the default value here
                        getOptionLabel={(option) => option}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                            fetchData(newInputValue)
                            if(inputValue !=""){
                                setDestError(false)
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                             {...params}
                              variant="outlined" 
                              className={desterror ?'fieldErr':''}
                              fullWidth />
                        )}
                    />

                </div>
                <div className='formGrp hoverCenter departMonth fieldBord'>
                    <label htmlFor='departure'>Departure Month</label>
                    {/* <Input id='departure' placeholder='Departure Month' /> */}
                    {/* <SelectPicker id='departure' data={Months} appearance='subtle' placeholder="Departure Month" /> */}
                    <Space wrap>
                        <Select
                            value={departMonth}
                            onChange={handleDepartChange}
                            options={Months}
                            placeholder="Departure Month"

                        />
                    </Space>
                </div>
                <div className='formGrp hoverCenter cruiseline fieldBord'>
                    <label htmlFor='cruiseLine'>Cruise Line</label>
                    <Input id='cruiseLine' placeholder='Cruise Line' value={cruiseLine} onChange={handleCruiseChange} />

                    {/* <SelectPicker id='cruiseLine' data={cruiseLine} appearance='subtle' /> */}
                </div>
                <div className='formGrp hoverCenter duration fieldBord'>
                    <label htmlFor='duration'>Duration (in days)</label>
                    <Input id='duration' placeholder='Duration' value={duration} onChange={handleDurChange} />
                    {/* <Select
                        value={duration}
                        onChange={handleDurChange}
                        options={Days}
                        placeholder="Select Duration"
                    /> */}
                </div>
                <div className='formGrp hoverCenter shuttle fieldBord'>
                    <label htmlFor='cruiseLine'>Shuttle Service or Taxi</label>
                    <Select
                        placeholder="Shuttle Service or Taxi"
                        value={shuttleval}
                        options={shuttle}
                        onChange={handleShuttle}
                    />
                </div>
                <div className='formGrp hoverCenter beverage fieldBord'>
                    <label htmlFor='amenities'>Beverage Packages</label>
                    <Dropdown
                        title="Beverage Packages"
                        open={facdropdownOpen}
                        onToggle={() => setFacDropdownOpen(!facdropdownOpen)}
                        onOpen={() => setFacDropdownOpen(true)}
                        onClose={() => setFacDropdownOpen(false)}>
                        <div className='guest_wrap'>
                            <div className='g_col'>
                                <label>Tea</label>
                                <div className='count check'>
                                    <input type="checkbox" name="tea" checked={Bevragepackage.tea} onChange={handleCheckboxChange} />
                                </div>
                            </div>
                            <div className='g_col'>
                                <label>Coffee</label>
                                <div className='count check'>
                                    <input type="checkbox" name="coffee" checked={Bevragepackage.coffee} onChange={handleCheckboxChange} />
                                </div>
                            </div>
                            <div className='g_col'>
                                <label>bottledWater</label>
                                <div className='count check'>
                                    <input type="checkbox" name="bottledWater" checked={Bevragepackage.bottledWater} onChange={handleCheckboxChange} />
                                </div>
                            </div>
                            <div className='g_col'>
                                <label>nonalcoholicBottle</label>
                                <div className='count check'>
                                    <input type="checkbox" name="nonalcoholicBottle" checked={Bevragepackage.nonalcoholicBottle} onChange={handleCheckboxChange} />
                                </div>
                            </div>
                            <div className='g_col'>
                                <label>juices</label>
                                <div className='count check'>
                                    <input type="checkbox" name="juices" checked={Bevragepackage.juices} onChange={handleCheckboxChange} />
                                </div>
                            </div>
                            <div className='g_col'>
                                <label>beer</label>
                                <div className='count check'>
                                    <input type="checkbox" name="beer" checked={Bevragepackage.beer} onChange={handleCheckboxChange} />
                                </div>
                            </div>
                            <div className='g_col'>
                                <label>wines</label>
                                <div className='count check'>
                                    <input type="checkbox" name="wines" checked={Bevragepackage.wines} onChange={handleCheckboxChange} />
                                </div>
                            </div>
                            <div className='g_col'>
                                <label>soda</label>
                                <div className='count check'>
                                    <input type="checkbox" name="soda" checked={Bevragepackage.soda} onChange={handleCheckboxChange} />
                                </div>
                            </div>
                            <div className='g_col'>
                                <label>cocktail</label>
                                <div className='count check'>
                                    <input type="checkbox" name="cocktail" checked={Bevragepackage.cocktail} onChange={handleCheckboxChange} />
                                </div>
                            </div>
                        </div>
                        {/* <Button className='butn butn_success butn_rounded' onClick={updateFaility}>Apply</Button> */}
                    </Dropdown>
                </div>
                <div className='formGrp hoverCenter amenity fieldBord'>
                    <label htmlFor='amenities'>Amenities</label>
                    <Dropdown
                        title="Beverage Packages"
                        open={amendownOpen}
                        onToggle={() => setAmenDropdownOpen(!amendownOpen)}
                        onOpen={() => setAmenDropdownOpen(true)}
                        onClose={() => setAmenDropdownOpen(false)}

                    >

                        <div className='guest_wrap'>
                            <div className='g_col'>
                                <label>Wifi</label>
                                <div className='count check'>
                                    <input type="checkbox" name="wifi" checked={amenities.wifi} onChange={handleamenCheckboxChange} />
                                </div>
                            </div>

                        </div>
                        {/* <Button className='butn butn_success butn_rounded' onClick={updateFaility}>Apply</Button> */}
                    </Dropdown>
                </div>
                <div className='formGrp hoverCenter cabin fieldBord'>
                    <label htmlFor='cabinType'>Cabin Type</label>
                    <Dropdown
                        title="CabinType"
                        open={cabindropdownOpen}
                        onToggle={() => setCabinDropdownOpen(!cabindropdownOpen)}
                        onOpen={() => setCabinDropdownOpen(true)}
                        onClose={() => setCabinDropdownOpen(false)}>
                        <div className='guest_wrap'>
                            <div className='g_col'>
                                <label>Windows</label>
                                <div className='count check'>
                                    <input type="checkbox" name="windows" checked={cabindropdownOpen.windows} onChange={handleCabinCheckboxChange} />
                                </div>
                            </div>
                            <div className='g_col'>
                                <label>Non Window</label>
                                <div className='count check'>
                                    <input type="checkbox" name="nonWindows" checked={cabindropdownOpen.nonWindows} onChange={handleCabinCheckboxChange} />
                                </div>
                            </div>
                            <div className='g_col'>
                                <label>Mid Ship </label>
                                <div className='count check'>
                                    <input type="checkbox" name="midShipCabin" checked={cabindropdownOpen.midShipCabin} onChange={handleCabinCheckboxChange} />
                                </div>
                            </div>
                            <div className='g_col'>
                                <label>Family Rooms</label>
                                <div className='count check'>
                                    <input type="checkbox" name="familyRooms" checked={cabindropdownOpen.familyRooms} onChange={handleCabinCheckboxChange} />
                                </div>
                            </div>
                            <div className='g_col'>
                                <label>Balcony</label>
                                <div className='count check'>
                                    <input type="checkbox" name="balcony" checked={cabindropdownOpen.balcony} onChange={handleCabinCheckboxChange} />
                                </div>
                            </div>
                            <div className='g_col'>
                                <label>Scenic View Cabins</label>
                                <div className='count check'>
                                    <input type="checkbox" name="scenicViewCabins" checked={cabindropdownOpen.scenicViewCabins} onChange={handleCabinCheckboxChange} />
                                </div>
                            </div>


                        </div>
                        {/* <Button className='butn butn_success butn_rounded' onClick={updateFaility}>Apply</Button> */}
                    </Dropdown>
                </div>
                <div className='formBtn'>
                    <button type='submit' className='butn butn_success' onClick={onSubmit} >Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Cruise;