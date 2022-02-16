import React from 'react';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useState } from "react"
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignUpForm from '../auth/SignUpForm';




function Navbar({ isLoaded }) {
const user = useSelector(state => state.session.user)



return (
  <nav className='navbar'>
    <div className='logo__container'>
      <Link to={'/'}><h1>Rallyflix</h1></Link>
    </div>
    <div className=''>

    </div>
    <div className='right__container'>
      <div>
        <Link to={"/login"}><button className='signin__btn'>Sign In</button></Link>
      </div>
      <div className='right-nav'>
        <div className='profile-icon'>{isLoaded}</div>
      </div>
      {!user ? null :
      <div className='profile__icon'>
        <ProfileButton/>
      </div>
      }
    </div>
  </nav>
  );
}

export default Navbar;
