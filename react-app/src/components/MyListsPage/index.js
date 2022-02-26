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
import { loadVideosToList } from '../../store/videos';


function MyListsPage({profileId}) {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([]);
    const [editListTitle, setEditListTitle] = useState("")
    const [showEditForm, setShowEditForm] = useState(false)
    const lists = Object.values(useSelector(state => state?.my_lists))
    const [newList, setNewList] = useState("")
    const [currentList, setCurrentList] = useState([])
    const [showAddForm, setShowAddForm] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    // console.log("?????? MY LIST PAGE", lists)


    useEffect(() => {
        dispatch(getLists(profileId))
        // dispatch(getVideos(profileId))
    },[dispatch, profileId])

    const addListForm = (e) => {
        e.preventDefault()

        if (!showAddForm) {
            setShowAddForm(true)
        } else {
            setShowAddForm(false)
        }
    }

    // const closeAddProfileForm = (e) => {
    //     e.preventDefault()

    //     setShowAddForm(true)
    // }

    const handleAddList = async (e) => {
        e.preventDefault()

        const addlist_errors = [];

        if (newList.length <= 0) addlist_errors.push("Field must not be empty.")

        if (addlist_errors.length > 0) {
            setErrors(addlist_errors);
        } else {
            await dispatch(addNewList(newList, +profileId))
            // await dispatch(loadVideosToList(newList?.id))
            await dispatch(getLists(+profileId))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors)
                });
            setShowAddForm(false)
        }
    }


    const my_lists = lists?.filter(list => {
        // console.log("in my_lists", +profileId)
        return list?.profile_id === +profileId
    })

    // console.log("MY LISTS FROM LIST COMP", my_lists)


    return (
        <div className='page__container'>
            <div>
                <h1>My Lists <button className='add__list__btn' onClick={addListForm}><FaPlusCircle className='' /></button>
                {showAddForm && (
                    <>
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
                        <div className='profile__errors'>
                            {errors.map((error) => (
                                <li style={{ color: "white" }} key={error}>{error}</li>
                            ))}
                        </div>
                    </>
                )}
                </h1>
                {my_lists?.map(list => (
                    <div className='my__lists' key={list.title}>
                        <h2 className='title'>{list?.title}
                        <EditLists profileId={list.profile_id} listId={list.id} list={list} className="idkyet"/>
                        </h2>
                        <VideosToList list={list} profileId={list.profile_id}/>
                    </div>
                )).reverse()}
            </div>
        </div>
    )

}

export default MyListsPage;
