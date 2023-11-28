import React from "react";

const InnerHeader = (props) => {
    return (
        <>
            <section className='innerPg_header'>
                <div className='custom-container'>
                    <h2>{props.value}</h2>
                </div>
            </section>
        </>
    )
}

export default InnerHeader;