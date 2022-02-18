import React from 'react';
import './ProfilesPage.css';
import { useState, useEffect } from "react";
// import * as sessionActions from '../../store/profile';
// import { useSelector } from 'react-redux';
// import { Link, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProfile, getProfiles } from "../../store/profile";
import { useParams } from 'react-router-dom';
import { FaEdit, FaPlusCircle, FaSmile, FaTrash } from 'react-icons/fa';


function ProfilesPage() {
    const [newProfile, setNewProfile] = useState("")
    const [editProfileName, setEditProfileName] = useState("")
    const [showAddForm, setShowAddForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)

    console.log("new profile", newProfile);
    const profiles = useSelector(state => state?.profile?.entries);
    const user = useSelector(state => state?.session?.user);

    const dispatch = useDispatch()
    const userId = user.id

    // console.log("hhhhiiiiiiii", userId)

    // const currProfiles = profiles?.filter(profile => console.log("FLAG", profile))
    // console.log("hiuhdihiwdhihdi", currProfiles)

    const addProfileForm = (e) => {
        e.preventDefault()

        setShowAddForm(true)
    }

    const handleEditProfile = (e) => {
        e.preventDefault()

        setShowEditForm(true)
    }

    const handleAddProfile = (e) => {
        e.preventDefault()

        dispatch(addNewProfile(userId, newProfile))
        dispatch(getProfiles(userId))

        setShowAddForm(false)
    }

    // const handleEditProfile = (e) => {
    //     e.preventDefault()

    //     dispatch(editProfileName(userId, profiles.id))
    //     dispatch(getProfiles(userId))
    // }

    useEffect(() => {
        dispatch(getProfiles(userId))
        // ?????
    }, [dispatch])

    return (
        <>
            <div className='page_container'>
                <div className='users__profiles'>
                    {profiles?.map(profile => (
                        <div className='profile'>
                            <h1 className='placeholder'>{profile?.name}</h1>
                            <button onClick={handleEditProfile}><FaEdit className='editProfileBtn'/></button>
                            <button><FaTrash className='deleteProfileBtn'/></button>
                        </div>
                    ))}
                    <button onClick={addProfileForm}><FaPlusCircle className='Add__profile__btn' /></button>
                </div>
                {showAddForm && (
                    <div className='add__profile'>
                        <input
                            type="text"
                            name="add-profile"
                            value={newProfile}
                            onChange={(e) => setNewProfile(e.target.value)}
                            placeholder="Add Profile"
                        />
                        <button onClick={handleAddProfile}>Add</button>
                    </div>
                )}
                <div className='edit__profile'>
                    {showEditForm && (
                        <div className='edit__profile'>
                            <input
                                type="text"
                                name="edit-profile"
                                value={editProfileName}
                                onChange={(e) => setEditProfileName(e.target.value)}
                                placeholder="Edit Name"
                            />
                            <button onClick={handleEditProfile}>Submit</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default ProfilesPage;
