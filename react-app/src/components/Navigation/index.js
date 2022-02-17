import React from 'react';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useState } from "react";
import * as sessionActions from '../../store/session';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';




function Navbar({ isLoaded }) {
  const user = useSelector(state => state.session.user)

  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = async (e) => {
      await dispatch(sessionActions.login('demo@aa.io', 'password'))
      history.push('/profiles')
  }


  return (
    <nav className='navbar'>
      <div className='logo__container'>
        <Link to={'/'}><h1>Rallyflix</h1></Link>
      </div>
      <div className=''>

      </div>
      {user ? null :
        <div className='right__container'>
          <div>
            <Link to={"/login"}><button className='signin__btn'>Sign In</button></Link><Link to={'/profiles'}><button onClick={handleClick} className='signin__btn'>Demo</button></Link>
          </div>
          <div className='right-nav'>
            <div className='profile-icon'>{isLoaded}</div>
          </div>
        </div>
      }
        {!user ? null :
        <div className='profile__icon'>
          <ProfileButton/>
        </div>
       }
    </nav>
  );
}

export default Navbar;
