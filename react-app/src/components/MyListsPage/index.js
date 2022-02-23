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
    const lists = useSelector(state => state?.my_lists.lists)
    const [newList, setNewList] = useState("")
    const [currentList, setCurrentList] = useState([])
    const [showAddForm, setShowAddForm] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const profileId = useParams()
    console.log("FROM MYLISTPAGE", lists[0])

    // console.log("FROM MyListsPage", lists)
    // useEffect(() => {
    //     (async () => {
    //         const lists = await dispatch(getLists(+profileId?.id))
    //         console.log("??????", lists)
    //         const myLists = Object.values(lists[0])
    //         setCurrentList(myLists)
    //         await dispatch(getLists(+profileId?.id))
    //
    //     })();
    // }, [dispatch, +profileId])

    useEffect(() => {
        dispatch(getLists(+profileId.id))
        // setIsLoaded(true)
        // dispatch(deleteProfileLists())
    },[dispatch, +profileId])

    const addListForm = (e) => {
        e.preventDefault()

        setShowAddForm(true)
    }

    const handleAddList = (e) => {
        e.preventDefault()

        dispatch(getLists(+profileId?.id))
        const newListAdd = dispatch(addNewList(newList, +profileId?.id))

        dispatch(getLists(+profileId?.id))
        setShowAddForm(false)
    }

    // const handleDeleteList = (e, id) => {
    //     e.preventDefault()
    //     // console.log("FROM DELETE", e.target.id)
    //     // let list_id = e.target.id
    //     console.log("IN PROFILE COMPONENT", id)
    //     dispatch(deleteProfileLists(id)).then(() => dispatch(getLists(+profileId.id)))

    // }

    // console.log("CURRENT LIST", currentList)


    // if (isLoaded) {

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
                    {lists[0]?.map(list => (
                        <div>
                            <h2 className='crap'>{list?.title}
                            <EditLists listId={list.id} list={list} className="idkyet"/>
                            {/* <button id={list.id} className='deleteListBtn' onClick={handleDeleteList}><FaTrash  className='deleteListBtn'/></button> */}
                            </h2>
                            <VideosToList list={list} />
                        </div>
                    )).reverse()}
                </div>
            </div>
        )
    // } else return <></>

}

export default MyListsPage;
