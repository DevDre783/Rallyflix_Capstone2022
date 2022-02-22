import React from 'react';
// import './EditProfileStyle.css';
import { useState, useEffect } from "react";
// import * as sessionActions from '../../store/profile';
// import { useSelector } from 'react-redux';
// import { Link, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editUserProfile, getProfiles } from "../../store/profile";
// import { useParams } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { editList, getLists } from '../../store/list';
import { useParams } from 'react-router-dom';


function EditLists() {
    const [editListTitle, setEditListTitle] = useState("")
    const [showEditForm, setShowEditForm] = useState(false)
    const lists = useSelector(state => state?.lists)
    const dispatch = useDispatch()
    const profileId = useParams()


    const handleEditListForm = (e) => {
        e.preventDefault()

        setShowEditForm(true)
    }

    const handleEditList = (e) => {
        e.preventDefault()
        // let id = lists.id
        let newTitle = editListTitle

        dispatch(editList(newTitle))
    }

    useEffect(() => {
        dispatch(getLists(profileId.id))
        // ?????
    }, [dispatch, profileId])


    return (
        <>
            <button onClick={handleEditListForm}><FaEdit className='editProfileBtn' /></button>
            {showEditForm && (
                <div className='edit__list'>
                        <div className='edit__list'>
                            <input
                                type="text"
                                name="edit-list"
                                value={editListTitle}
                                onChange={(e) => setEditListTitle(e.target.value)}
                                placeholder="Edit Title..."
                            />
                            <button type="submit" onClick={(e) => { handleEditList(e, lists?.id) }}>Submit</button>
                        </div>
                </div>
            )}
        </>
    )

}

export default EditLists;
