import React from 'react';
import './EditProfileStyle.css';
import { useState, useEffect } from "react";
// import * as sessionActions from '../../store/profile';
// import { useSelector } from 'react-redux';
// import { Link, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editUserProfile, getProfiles } from "../../store/profile";
// import { useParams } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';


function EditProfile({profile}) {
    const [editProfileName, setEditProfileName] = useState(profile.name)
    const [errors, setErrors] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false)
    // const profiles = useSelector(state => state?.profile?.entries);
    const user = useSelector(state => state?.session?.user);
    const dispatch = useDispatch()
    const userId = user.id


    const handleEditProfileForm = (e) => {
        e.preventDefault()

        setShowEditForm(true)
    }

    const handleEditProfile = async (e, id) => {
        e.preventDefault()
        let user_id = user.id
        let newName = editProfileName

        const edit_profile_errors = [];

        if (newName.length <= 0) edit_profile_errors.push("Please provide a valid profile name.");

        if (edit_profile_errors.length > 0) {
            setErrors(edit_profile_errors);
        } else {
            await dispatch(editUserProfile(user_id, newName, id))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors)
                });
            // dispatch(getProfiles(userId))
            setShowEditForm(false)
        }
    }

    useEffect(() => {
        dispatch(getProfiles(userId))
        // ?????
    }, [dispatch, userId])


    return (
        <>
            <button className='profile-buttons' onClick={handleEditProfileForm}><FaEdit className='editProfileBtn' /></button>
        <div>
            {showEditForm && (
                <>
                <div className='edit__profile'>
                        <div className='edit__profile'>
                            <input
                                type="text"
                                name="edit-profile"
                                value={editProfileName}
                                onChange={(e) => setEditProfileName(e.target.value)}
                                placeholder={profile.name}
                            />
                            <button className='submit-profile-edit' type="submit" onClick={(e) => { handleEditProfile(e, profile?.id) }}>Submit</button>
                        </div>
                </div>
                </>
            )}
            <div className='profile__errors'>
                {errors.map((error) => (
                    <li style={{ color: "white" }} key={error}>{error}</li>
                ))}
            </div>
        </div>
        </>
    )

}

export default EditProfile;
