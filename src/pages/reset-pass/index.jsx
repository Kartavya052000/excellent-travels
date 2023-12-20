import React from 'react'
import InnerHeader from '../../components/innerHeader/innerHeader'
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Form } from "rsuite";
import '../../assets/css/login.css';
const ResetPass = () => {
  return (
    <>
        <InnerHeader value='Reset -Password' />
        <section className='lostPass_sec'>
            <div className='formGrp'>
                <Form>
                    <Input.Password
                        name='password'
                        placeholder="Password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                    
                    <Input.Password
                        name='password'
                        placeholder="Password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                    
                    <button type='button' className='butn butn_success butn_sm'>Submit</button>
                </Form>
            </div>
        </section>
    </>
  )
}

export default ResetPass
