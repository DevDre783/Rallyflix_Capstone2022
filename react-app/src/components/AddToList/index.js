import React from 'react';
// import './BrowsePage.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getVideos } from '../../store/browse';
import { Redirect, useParams } from 'react-router-dom';
import { FaAccusoft, FaPlus } from 'react-icons/fa';
import { getLists } from '../../store/list';


function AddToList({profileId}) {
    const dispatch = useDispatch();
    const lists = Object.values(useSelector(state => state?.my_lists))

    const my_lists = lists?.filter(list => {
        console.log("in my_lists", +profileId)
        return list?.profile_id === +profileId
    })

    const [ listID, setListID ] = useState(my_lists[0]?.id)
    // const [ videoID, setVideoID ] = useState()
    // console.log("HELLO????????", my_lists)
    const [ showList, setShowList ] = useState(false);
    // const videos = useSelector(state => state?.videos?.videos_list)

    const handleSubmit = (e) => {
        e.preventDefault()

        // dispatch(videosToList(listID, videoID))
    }

    // useEffect(() => {
    //     dispatch(getVideos(profileId))
    //     dispatch(getLists(profileId))
    // }, [dispatch])

    // if (!profileId) {
    //     return <Redirect to="/profiles" />
    // }


    return (
        <div>
            {showList &&
                <form onSubmit={handleSubmit}>
                    <select onChange={(e) => setListID(e.target.value)}>
                        {my_lists.map(list => (
                            <option value={list.id} key={list.id}>{list.title}</option>
                        ))}
                    </select>
                    <button className='list_choice_submit'>Submit</button>
                </form>
            }
        </div>
    )
}

export default AddToList;
