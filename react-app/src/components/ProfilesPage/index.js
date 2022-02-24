import React from 'react';
import './ProfilesPage.css';
import { useState, useEffect } from "react";
// import * as sessionActions from '../../store/profile';
// import { useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProfile, deleteUserProfile, getProfiles } from "../../store/profile";
// import { useParams } from 'react-router-dom';
import { FaPlusCircle, FaTrash } from 'react-icons/fa';
import EditProfile from '../EditProfile';


function ProfilesPage({ getProfileId }) {
    const [newProfile, setNewProfile] = useState("")
    const [errors, setErrors] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false)
    const profiles = useSelector(state => state?.profile?.entries);
    const user = useSelector(state => state?.session?.user);
    const history = useHistory()
    const dispatch = useDispatch()
    const userId = user.id


    const handleProfileSelect = (e) => {
        getProfileId(e.target.value)

        history.push('/browse')
    }

    const addProfileForm = (e) => {
        e.preventDefault()

        setShowAddForm(true)
    }

    const handleAddProfile = async (e) => {
        e.preventDefault()

        const profile_errors = [];

        if (newProfile.length > 20) profile_errors.push("Profile name must not be longer than 20 characters.");
        if (profiles.length >= 4) profile_errors.push("Cannot add more than four profiles.")
        if(newProfile.length <= 0) profile_errors.push("Please provide a valid profile name.")

        if (profile_errors.length > 0) {
            setErrors(profile_errors);
        } else {
            await dispatch(addNewProfile(userId, newProfile))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors)
                });
            // dispatch(getProfiles(userId))
            setShowAddForm(false)
        }
    }

    const handleDeleteProfile = (e, id) => {
        e.preventDefault()
        let user_id = user.id
        dispatch(deleteUserProfile(id, user_id))
    }

    useEffect(() => {
        dispatch(getProfiles(userId))
        // ?????
    }, [dispatch, userId])

    // <img className='profile__img' src='https://i.pinimg.com/originals/e3/94/30/e39430434d2b8207188f880ac66c6411.png'></img>

    return (
        <>
            <div className='page_container'>
                <div className='users__profiles'>
                    {/* {profiles.length < 4 } */}
                    {profiles?.map(profile => (
                        <div className='profile'>
                            <button id="WOOO" value={profile.id} onClick={handleProfileSelect}></button>
                            <h1 className='placeholder'>{profile?.name}</h1>
                            <div className="edit__component">
                                <EditProfile profile={profile} className="something" />
                                <button className='profile-buttons' onClick={(e) => { handleDeleteProfile(e, profile?.id) }}><FaTrash className='deleteProfileBtn' /></button>
                            </div>
                        </div>
                    ))}
                    {profiles.length < 4 &&
                        <button className='add__profile__btn' onClick={addProfileForm}><FaPlusCircle className='add__profile__icon' /></button>
                    }
                </div>
                {showAddForm && (
                    <>
                        <div className='add__profile'>
                            <input
                                type="text"
                                name="add-profile"
                                value={newProfile}
                                onChange={(e) => setNewProfile(e.target.value)}
                                placeholder="Add Profile"
                            />
                            <button className='submit-add-profile' type="submit" onClick={handleAddProfile}>Add</button>
                        </div>
                        <div className='profile__errors'>
                            {errors.map((error) => (
                                <li style={{ color: "white" }} key={error}>{error}</li>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default ProfilesPage;
