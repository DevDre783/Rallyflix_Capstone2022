import React from 'react';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useState } from "react";
import * as sessionActions from '../../store/session';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



function Navbar({ isLoaded }) {
  const user = useSelector(state => state.session.user)
  const location = useLocation()
  const path = location.pathname

  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = async (e) => {
      await dispatch(sessionActions.login('demo@aa.io', 'password'))
      history.push('/profiles')
  }

  const handleLogout = async () => {
    await dispatch(sessionActions.logout());

    history.push('/');
  };


  return (
    <nav className='navbar'>
      {user ? null :
      <>
        <div className='logo__container'>
          <Link to={`/`}><h1>Rallyflix</h1></Link>
        </div>
        <div className=''>

        </div>
        <div className='right__container'>
          <div>
            <Link to={"/login"}><button className='signin__btn'>Sign In</button></Link><Link to={'/profiles'}><button onClick={handleClick} className='signin__btn'>Demo</button></Link>
          </div>
          <div className='right-nav'>
            <div className='profile-icon'>{isLoaded}</div>
          </div>
        </div>
      </>
      }
      {!user ? null :
        <>
          <div className='logo__container'>
            <Link to={`/profiles`}><h1>Rallyflix</h1></Link>
          </div>
          <div className=''>
            <div>

            </div>
            <div className=''>

            </div>
            <div>

            </div>
          </div>
        </>
      }

      {path == '/profiles' ?<button className="navbar_logout" onClick={handleLogout}>logout</button>:null}
      {path !== '/profiles' ?
        <div className='profile__icon'>
         {!user ? null : <div className='my__lists__tab'><Link to={'/browse'} className="browse__videos"><h3>Browse Videos</h3></Link><NavLink to={`/my-lists`}>My Lists</NavLink></div>}
         {!user ? null :<ProfileButton />}
        </div>
      :null}
    </nav>
  );
}

export default Navbar;
