import {useState} from 'react'
import InnerHeader from '../../components/innerHeader/innerHeader'
import { Form } from "rsuite";
import '../../assets/css/login.css';
import axios from 'axios'; // Import Axios for making API requests
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPass = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
  
    const handleError = (err) =>
    toast.error(err, {
      position: "top-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });
    const handleEmail = (value) =>{
     setEmail(value)
    }
    const handleSubmit = async (e) => {
      // e.preventDefault(); // Prevent default form submission
      try {
        // Make a POST request to your API endpoint
  
        const response = await axios.post(process.env.REACT_APP_BACKEND_URL +'/auth/forget-password', { email });
      const { success, message,token } = response.data;
      handleSuccess(message);
      setTimeout(() => {
          navigate("/");
        }, 2000);
  
        console.log(response.data); // Log the response or handle success message
      } catch (error) {
        handleError(error.message);
  
        console.error('Error:', error); // Handle error responses
      }
    };
  
    return (
        <>
            <InnerHeader value='Forgot-Password' />
            <section className='lostPass_sec'>
                <div className='formGrp'>
                    <Form>
                        <label>Email</label>
                        <Form.Control
                            name='email'
                            type="email"
                            placeholder='Email'
                            value={email}
                            onChange={handleEmail}
                        />
                        <button type='button' className='butn butn_success butn_sm' onClick={handleSubmit}>Submit</button>
                    </Form>
                </div>
            </section>
        </>
    )
}

export default ForgotPass
