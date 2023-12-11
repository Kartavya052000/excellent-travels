import React from "react";
import { Link } from "react-router-dom";

const InnerHeader = (props) => {
    return (
        <>
            <section className='innerPg_header'>
                <div className='custom-container'>
                    <ul className='breadcrumb'>
                        <li><Link to='/' title='Home'><i className='fa fa-home'></i></Link> / <span>{props.value}</span></li>
                    </ul>
                </div>
            </section>
        </>
    )
}

export default InnerHeader;