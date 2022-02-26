import React from 'react';
import './BrowsePage.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getVideos } from '../../store/browse';
import { Redirect, useHistory, useParams } from 'react-router-dom';

import { getLists } from '../../store/list';
import { addVideoToList } from '../../store/videos';


function BrowsePage({profileId}) {
    const dispatch = useDispatch();
    const history = useHistory()
    const [errors, setErrors] = useState([])
    const lists = Object.values(useSelector(state => state?.my_lists))

    const my_lists = lists?.filter(list => {
        return list?.profile_id === +profileId
    })

    const [ listID, setListID ] = useState()
    const [ videoID, setVideoID ] = useState(-1)

    const [ showList, setShowList ] = useState(false);
    const videos = useSelector(state => state?.videos?.videos_list)

    const handleSubmit = (e) => {
        e.preventDefault()

        const addedVideo = dispatch(addVideoToList(listID, videoID))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            });

        if (addedVideo) {
            history.push('/my-lists')
        }
    }

    useEffect(() => {
        dispatch(getVideos(profileId))
        dispatch(getLists(profileId))
    }, [dispatch])

    if (!profileId) {
        return <Redirect to="/profiles" />
    }


    return (
        <div className='page__container'>
            <div>
                <h1>Browse Videos !</h1>
            </div>
            <div className='videos__container'>
                {videos.map(video => (
                    <div key={video?.id}>
                        <h2 style={{color: "white"}}>{video?.title}</h2>
                        <iframe loading='lazy' className="individual__video" width="450" height="275" src={video?.url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="allowfullscreen"></iframe>
                        <p className='addtolist_btn' style={{color: "white"}}>Add to list:
                            <form onSubmit={handleSubmit}>
                                <select onChange={(e) => {
                                    setListID(e.target.value)
                                    setVideoID(video.id)
                                }}>
                                    {my_lists.map(list => (
                                        <option value={list.id} key={list.id}>{list.title}</option>
                                    ))}
                                </select>
                                <button type='submit' className='list_choice_submit'>Submit</button>
                            </form>
                        </p>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default BrowsePage;
