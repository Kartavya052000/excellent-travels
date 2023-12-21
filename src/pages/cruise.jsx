
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
    const shuttle = ['Yes', 'No'].map(
        item => ({ label: item, value: item })
    );

    const [options, setOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [facdropdownOpen, setFacDropdownOpen] = useState(false); // State to manage dropdown visibility
    const [amendownOpen, setAmenDropdownOpen] = useState(false); // State to manage dropdown visibility
    const [cabindropdownOpen, setCabinDropdownOpen] = useState(false); // State to manage dropdown visibility
    const [Bevragepackage, setBevragepackage] = useState({
        tea: false,
        coffee: false,
        bottledWater: false,
        nonalcoholicBottle: false,
        juices:false,
        beer:false,
        wines:false,
        soda:false,
        cocktail:false
    });
    const [CabinType, setCabinType] = useState({
        windows: false,
        nonWindows: false,
        midShipCabin: false,
        familyRooms: false,
        balcony:false,
        scenicViewCabins:false
       
    });
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setBevragepackage((prevAmenities) => ({
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
                    }}
                    renderInput={(params) => (
                        <TextField {...params} variant="outlined" fullWidth />
                    )}
                />

            </div>
            <div className='formGrp hoverCenter departMonth fieldBord'>
                <label htmlFor='departure'>Departure</label>
                <Input id='departure' placeholder='Departure Month' />
            </div>
            <div className='formGrp hoverCenter cruiseline fieldBord'>
                <label htmlFor='cruiseLine'>Cruise Line</label>
                <SelectPicker id='cruiseLine' data={cruiseLine} appearance='subtle' />
            </div>
            <div className='formGrp hoverCenter duration fieldBord'>
                <label htmlFor='duration'>Duration</label>
                <Input id='duration' placeholder='Duration' />
            </div>
            <div className='formGrp hoverCenter shuttle fieldBord'>
                <label htmlFor='cruiseLine'>Shuttle Service or Taxi</label>
                <Select
                    placeholder="Shuttle Service or Taxi"
                    // value={shuttle}
                    options={shuttle}
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
                                <input type="checkbox" name="Tea" checked={Bevragepackage.tea} onChange={handleCheckboxChange} />
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
                                <input type="checkbox" name="wifi" checked={Bevragepackage.bottledWater} onChange={handleCheckboxChange} />
                            </div>
                        </div>
                        <div className='g_col'>
                            <label>nonalcoholicBottle</label>
                            <div className='count check'>
                                <input type="checkbox" name="wifi" checked={Bevragepackage.nonalcoholicBottle} onChange={handleCheckboxChange} />
                            </div>
                        </div>
                        <div className='g_col'>
                            <label>juices</label>
                            <div className='count check'>
                                <input type="checkbox" name="wifi" checked={Bevragepackage.juices} onChange={handleCheckboxChange} />
                            </div>
                        </div>
                        <div className='g_col'>
                            <label>beer</label>
                            <div className='count check'>
                                <input type="checkbox" name="wifi" checked={Bevragepackage.beer} onChange={handleCheckboxChange} />
                            </div>
                        </div>
                        <div className='g_col'>
                            <label>wines</label>
                            <div className='count check'>
                                <input type="checkbox" name="wifi" checked={Bevragepackage.wines} onChange={handleCheckboxChange} />
                            </div>
                        </div>
                        <div className='g_col'>
                            <label>soda</label>
                            <div className='count check'>
                                <input type="checkbox" name="wifi" checked={Bevragepackage.soda} onChange={handleCheckboxChange} />
                            </div>
                        </div>
                        <div className='g_col'>
                            <label>cocktail</label>
                            <div className='count check'>
                                <input type="checkbox" name="wifi" checked={Bevragepackage.cocktail} onChange={handleCheckboxChange} />
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
                                <input type="checkbox" name="Tea" checked={Bevragepackage.tea} onChange={handleCheckboxChange} />
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
                                <input type="checkbox" name="Windows" checked={cabindropdownOpen.windows} onChange={handleCabinCheckboxChange} />
                            </div>
                        </div>
                        <div className='g_col'>
                            <label>Non Window</label>
                            <div className='count check'>
                                <input type="checkbox" name="nonWindow" checked={cabindropdownOpen.nonWindows} onChange={handleCabinCheckboxChange} />
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
                                <input type="checkbox" name="familyroom" checked={cabindropdownOpen.familyRooms} onChange={handleCabinCheckboxChange} />
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
                                <input type="checkbox" name="wiscenicViewCabinsfi" checked={cabindropdownOpen.scenicViewCabins} onChange={handleCabinCheckboxChange} />
                            </div>
                        </div>
                        
                    
                    </div>
                    {/* <Button className='butn butn_success butn_rounded' onClick={updateFaility}>Apply</Button> */}
                </Dropdown>
            </div>
            <div className='formBtn'>
                <button type='submit' className='butn butn_success' onClick={onSearch} >Search</button>
            </div>
        </form>
    </div>
    )
}

export default Cruise;