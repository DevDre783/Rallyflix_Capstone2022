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
import { editList, getLists, deleteProfileLists } from '../../store/list';
import { useParams } from 'react-router-dom';


function EditLists({listId, list}) {
    const [editListTitle, setEditListTitle] = useState(list.title)
    const [showEditForm, setShowEditForm] = useState(false)
    const lists = useSelector(state => state?.my_lists.lists)
    // console.log("FROM EDIT", listId)
    const dispatch = useDispatch()
    const profileId = useParams()

    useEffect(() => {

    }, [dispatch])

    const handleEditListForm = (e) => {
        e.preventDefault()

        if(!showEditForm) {
            setShowEditForm(true)
        } else {
            setShowEditForm(false)
        }
    }


    const handleEditList = (e) => {
        e.preventDefault()
        setShowEditForm(false)
        let newTitle = editListTitle
        // console.log(newTitle)
        console.log("HANDLE EDIT !!!!!!", +profileId.id)
        dispatch(editList(newTitle, list.id)).then(() => dispatch(getLists(+profileId.id)))
    }

    const handleDeleteList = () => {
        // e.preventDefault()
        // console.log("FROM DELETE", e.target.id)
        // let list_id = e.target.id
        console.log("IN PROFILE COMPONENT", list.id)
        dispatch(deleteProfileLists(list.id)).then(() => dispatch(getLists(+profileId.id)))
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
