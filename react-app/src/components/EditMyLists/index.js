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


function EditLists({profileId, list, listId}) {

    const [editListTitle, setEditListTitle] = useState(list.title)
    // console.log("EDIT LIST TITLE", editListTitle)
    const [showEditForm, setShowEditForm] = useState(false)
    const [newList, setNewList] = useState("")
    const lists = useSelector(state => state?.my_lists.lists)
    const dispatch = useDispatch()
    // const profileId = useParams()

    useEffect(() => {
        dispatch(getLists(profileId))
    }, [dispatch, profileId])

    const handleEditListForm = (e) => {
        e.preventDefault()

        if(!showEditForm) {
            setShowEditForm(true)
        } else {
            setShowEditForm(false)
        }
    }


    const handleEditList = async (e) => {
        e.preventDefault()

        console.log("?????? FROM EDIT HANDLE", profileId)
        await dispatch(editList(editListTitle, profileId, listId))
        await dispatch(getLists(profileId))
        setShowEditForm(false)
    }

    const handleDeleteList = async () => {
        console.log("LIST ID", listId)
        console.log(profileId)
        await dispatch(deleteProfileLists(listId))
        await dispatch(getLists(profileId))
    }



    return (
        <>
            <button onClick={handleEditListForm}><FaEdit className='editProfileBtn' /></button>
            <button id={list.id} className='deleteListBtn' onClick={handleDeleteList}><FaTrash  className='deleteListBtn'/></button>
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
