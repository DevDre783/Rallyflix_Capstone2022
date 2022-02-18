import React from 'react';
import './ProfilesPage.css';
import { useState, useEffect } from "react";
// import * as sessionActions from '../../store/profile';
// import { useSelector } from 'react-redux';
// import { Link, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfiles } from "../../store/profile";
import { useParams } from 'react-router-dom';


function ProfilesPage() {
    const profiles = useSelector(state => state?.profile?.entries);
    const user = useSelector(state => state?.session?.user);

    const dispatch = useDispatch()
    const userId = user.id
    console.log("hhhhiiiiiiii", userId)
    
    const currProfiles = profiles?.filter(profile => console.log("FLAG", profile))
    console.log("hiuhdihiwdhihdi", currProfiles)

    useEffect(() => {
        dispatch(getProfiles(userId))
    }, [dispatch])

    return (
        <div className='page_container'>
            {profiles?.map(profile => (
                <div><h1 className='placeholder'>{profile?.name}</h1></div>
            ))}
        </div>
    )
}

export default ProfilesPage;
