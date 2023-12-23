import { useState } from 'react'
import InnerHeader from '../../components/innerHeader/innerHeader'
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Form } from "rsuite";
import '../../assets/css/login.css';
import { useParams } from 'react-router-dom'; // Import useParams to access URL parameters
import axios from 'axios'; // Import Axios for making API requests
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPass = () => {
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    const { token } = useParams(); // Get the token from the route parameters
    const handleError = (err) =>
        toast.error(err, {
            position: "top-left",
        });
    const handleSuccess = (msg) =>
        toast.success(msg, {
            position: "top-right",
        });

    const handlePass = (e) => {
        setpassword(e.target.value)
    }
    const handleSubmit = async (e) => {
        // e.preventDefault(); // Prevent default form submission

        try {
            // Make a POST request to your reset-password endpoint with the new password and token
            const response = await axios.post( process.env.REACT_APP_BACKEND_URL +"/auth/reset-password"+`/${token}`, { newPassword: password });
            console.log(response.data); // Log the response or handle success message
            handleSuccess(response.data.message)
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            handleError(error.message);

            console.error('Error:', error); // Handle error responses
        }
    };
    return (
        <>
            <InnerHeader value='Reset -Password' />
            <section className='lostPass_sec'>
                <div className='formGrp'>
                    <Form>
                        <Input.Password
                            name='password'
                            placeholder="New Password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            value={password}
                            onChange={handlePass}
                        />



                        <button type='button' className='butn butn_success butn_sm' onClick={handleSubmit}>Submit</button>
                    </Form>
                </div>
            </section>
        </>
    )
}

export default ResetPass
