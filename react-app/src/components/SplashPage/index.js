import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "./SplashPage.css"
// import { useState } from "react"
// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';


function SplashPage () {
    return (
        <>
            <div className="background__container"></div>
            <div className='middle__container'>
                    <h1 className='splash__message'>
                        Unlimited access to the world of Rally
                    </h1>
                <div className='input__container'>
                    <input className='email__input' type='text' placeholder='Email Address'></input><Link to={'/sign-up'}><button className='get__started__btn'>Get Started <FaArrowRight/></button></Link>
                </div>
            </div>
        </>
    )
}

export default SplashPage;
