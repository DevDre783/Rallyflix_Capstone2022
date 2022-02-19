import React from 'react';
import './ProfilesPage.css';
import { useState, useEffect } from "react";
// import * as sessionActions from '../../store/profile';
// import { useSelector } from 'react-redux';
// import { Link, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProfile, deleteUserProfile, editUserProfile, getProfiles } from "../../store/profile";
import { useParams } from 'react-router-dom';
import { FaEdit, FaPlusCircle, FaSmile, FaTrash } from 'react-icons/fa';
import EditProfile from '../EditProfile';


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

    const handleAddProfile = (e) => {
        e.preventDefault()

        if (profiles.length >= 4) {
            return "CANNOT ADD MORE THAN 4 PROFILES"
        }

        dispatch(addNewProfile(userId, newProfile))
        dispatch(getProfiles(userId))

        setShowAddForm(false)
    }

    const handleEditProfileForm = (e) => {
        e.preventDefault()

        setShowEditForm(true)
    }

    const handleDeleteProfile = (e, id) => {
        e.preventDefault()
        let user_id = user.id
        console.log("IN PROFILE COMPONENT", id, user_id)
        dispatch(deleteUserProfile(id, user_id))
    }


    const handleEditProfile = (e, id) => {
        e.preventDefault()
        let user_id = user.id
        let newName = editProfileName

        dispatch(editUserProfile(user_id, newName, id))
    }

    useEffect(() => {
        dispatch(getProfiles(userId))
        // ?????
    }, [dispatch])

    return (
        <>
            <div className='page_container'>
                <div className='users__profiles'>
                    {/* {profiles.length < 4 } */}
                    {profiles?.map(profile => (
                        <div className='profile'>
                            <h1 className='placeholder'>{profile?.name}</h1>
                            <button onClick={(e) => { handleDeleteProfile(e, profile?.id) }}><FaTrash className='deleteProfileBtn' /></button>
                            <EditProfile profile={profile}/>
                        </div>
                    ))}
                    {profiles.length < 4 &&
                    <button onClick={addProfileForm}><FaPlusCircle className='Add__profile__btn' /></button>
                    }
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
                        <button type="submit" onClick={handleAddProfile}>Add</button>
                    </div>
                )}
            </div>
        </>
    )
}

export default ProfilesPage;
