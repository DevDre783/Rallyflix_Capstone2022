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


function MyListsPage() {
    const dispatch = useDispatch()
    const [editListTitle, setEditListTitle] = useState("")
    const [showEditForm, setShowEditForm] = useState(false)
    const lists = useSelector(state => state?.lists)
    const [newList, setNewList] = useState("")
    const [currentList, setCurrentList] = useState([])
    const [showAddForm, setShowAddForm] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const profileId = useParams()

    // console.log("FROM MyListsPage", lists)

    const addListForm = (e) => {
        e.preventDefault()

        setShowAddForm(true)
    }

    const handleAddList = (e) => {
        e.preventDefault()

        dispatch(getLists(profileId?.id))
        const newListAdd = dispatch(addNewList(newList, profileId?.id))

        if (newListAdd) {
            dispatch(getLists(profileId?.id))
            setShowAddForm(false)
        }
    }

    const handleDeleteList = (e, id) => {
        e.preventDefault()
        let list_id = lists.id
        console.log("IN PROFILE COMPONENT", id, list_id)
        dispatch(deleteProfileLists(id, list_id))
    }


    useEffect(() => {
        (async () => {
            const lists = await dispatch(getLists(profileId?.id))
            console.log("??????", lists)
            setIsLoaded(true)
            const myLists = Object.values(lists[0])
            setCurrentList(myLists)
            await dispatch(getLists(profileId?.id))
        })();
    }, [dispatch, profileId])


    // console.log("CURRENT LIST", currentList)


    if (isLoaded) {

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
                    {currentList?.map(list => (
                        <div>
                            <h2 className='crap'>{list?.title}
                            <EditLists className="idkyet"/>
                            <button className='deleteListBtn' onClick={(e) => { handleDeleteList(e, lists?.id) }}><FaTrash  className='deleteListBtn'/></button>
                            </h2>
                            <VideosToList list={list} />
                        </div>
                    ))}
                </div>
            </div>
        )
    } else return <></>

}

export default MyListsPage;
