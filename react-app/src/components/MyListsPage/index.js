import React from 'react';
import './MyListPage.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getLists, addNewList, editList, deleteProfileLists } from '../../store/list';
import { getVideos } from '../../store/browse';
import { useParams } from 'react-router-dom';
import VideosToList from '../VideoForList';
import { FaEdit, FaPlusCircle, FaTrash } from 'react-icons/fa';
import EditLists from '../EditMyLists';


function MyListsPage({profileId}) {
    console.log("FROM MYLISTPAGE",  profileId)
    const dispatch = useDispatch()
    const [editListTitle, setEditListTitle] = useState("")
    const [showEditForm, setShowEditForm] = useState(false)
    const lists = Object.values(useSelector(state => state?.my_lists))
    const [newList, setNewList] = useState("")
    const [currentList, setCurrentList] = useState([])
    const [showAddForm, setShowAddForm] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    console.log("?????? MY LIST PAGE", lists)


    useEffect(() => {
        dispatch(getLists(profileId))
    },[dispatch])

    const addListForm = (e) => {
        e.preventDefault()

        setShowAddForm(true)
    }

    const handleAddList = async (e) => {
        e.preventDefault()

        console.log("??????? HANDLE ADD", newList, +profileId)
        await dispatch(addNewList(newList, +profileId))
        await dispatch(getLists(+profileId))
        setShowAddForm(false)
    }


    return (
        <div className='page__container'>
            <div>
                <h1>My Lists <button className='add__list__btn' onClick={addListForm}><FaPlusCircle className='' /></button></h1>
                {showAddForm && (
                    <div className='add__list'>
                        <input
                            type="text"
                            name="add-profile"
                            value={newList}
                            onChange={(e) => setNewList(e?.target?.value)}
                            placeholder="New List"
                        />
                        <button type="submit" onClick={handleAddList}>Add</button>
                    </div>
                )}
                {lists?.map(list => (
                    <div key={list.title}>
                        <h2 className='crap'>{list?.title}
                        <EditLists profileId={list.profile_id} listId={list.id} list={list} className="idkyet"/>
                        {/* <button id={list.id} className='deleteListBtn' onClick={handleDeleteList}><FaTrash  className='deleteListBtn'/></button> */}
                        </h2>
                        <VideosToList list={list} />
                    </div>
                )).reverse()}
            </div>
        </div>
    )

}

export default MyListsPage;
