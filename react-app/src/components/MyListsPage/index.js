import React from 'react';
import './MyListPage.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getLists, addNewList } from '../../store/list';
import { getVideos } from '../../store/browse';
import { useParams } from 'react-router-dom';
import VideosToList from '../VideoForList';
import { FaPlusCircle } from 'react-icons/fa';


function MyListsPage() {
    const dispatch = useDispatch()
    const lists = useSelector(state => state?.lists?.list)
    const [newList, setNewList] = useState("")
    const [currentList, setCurrentList] = useState([])
    const [showAddForm, setShowAddForm] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const profileId = useParams()
    const listId = lists?.list?.id
    console.log("FROM MyListsPage", listId)

    const addListForm = (e) => {
        e.preventDefault()

        setShowAddForm(true)
    }

    const handleAddList = (e) => {
        e.preventDefault()

        dispatch(addNewList(listId, newList))
        dispatch(getLists(profileId.id))

        setShowAddForm(false)
    }

    useEffect(async () => {

        const lists = await dispatch(getLists(profileId.id))
        setIsLoaded(true)
        const myLists = Object.values(lists[0])
        setCurrentList(myLists)

    }, [profileId])


    console.log("CURRENT LIST", currentList)


    if (isLoaded) {

        return (
            <div className='page__container'>
                <div>
                    <h1>My Lists</h1><button className='add__list__btn' onClick={addListForm}><FaPlusCircle className=''/></button>
                    {showAddForm && (
                        <div className='add__list'>
                            <input
                                type="text"
                                name="add-profile"
                                value={newList}
                                onChange={(e) => setNewList(e.target.value)}
                                placeholder="New List"
                            />
                            <button type="submit" onClick={handleAddList}>Add</button>
                        </div>
                    )}
                    {currentList?.map(list => (
                        <div>
                            <h2 className='crap'>{list?.title}</h2>
                            <VideosToList list={list} />
                        </div>
                    ))}
                </div>
            </div>
        )
    } else return <></>

}

export default MyListsPage;
