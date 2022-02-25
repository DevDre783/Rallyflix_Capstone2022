import React from 'react';
// import './EditProfileStyle.css';
import { useState, useEffect } from "react";
// import * as sessionActions from '../../store/profile';
// import { useSelector } from 'react-redux';
// import { Link, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { editUserProfile, getProfiles } from "../../store/profile";
// import { useParams } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { editList, getLists, deleteProfileLists, addNewList } from '../../store/list';
import { useParams } from 'react-router-dom';


function EditLists({ profileId, list, listId }) {

    const [editListTitle, setEditListTitle] = useState(list.title)
    // console.log("EDIT LIST TITLE", editListTitle)
    const [errors, setErrors] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false)
    const [newList, setNewList] = useState("")
    const lists = useSelector(state => state?.my_lists.lists)
    const dispatch = useDispatch()
    // const profileId = useParams()

    useEffect(() => {
       
    }, [dispatch])

    const handleEditListForm = (e) => {
        e.preventDefault()

        if (!showEditForm) {
            setShowEditForm(true)
        } else {
            setShowEditForm(false)
        }
    }


    const handleEditList = async (e) => {
        e.preventDefault()
        const editlist_errors = [];

        if (editListTitle.length <= 0) editlist_errors.push("Field must not be empty.")

        if (editlist_errors.length > 0) {
            setErrors(editlist_errors);
        } else {
            dispatch(editList(editListTitle, profileId, listId))
            dispatch(getLists(profileId))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors)
                });
            setShowEditForm(false)
        }
    }

    const handleDeleteList = async () => {
        await dispatch(deleteProfileLists(listId))
        await dispatch(getLists(profileId))
    }



    return (
        <>
            <button className='editProfile_Btn' onClick={handleEditListForm}><FaEdit className='editProfileBtn' /></button>
            <button id={list.id} className='deleteListBtn' onClick={handleDeleteList}><FaTrash className='deleteListBtn' /></button>
            {showEditForm && (
                <>
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
                    <div className='profile__errors'>
                        {errors.map((error) => (
                            <li style={{ color: "white" }} key={error}>{error}</li>
                        ))}
                    </div>
                </>
            )}
        </>
    )

}

export default EditLists;
