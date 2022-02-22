import React from 'react';
import './BrowsePage.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getVideos } from '../../store/browse';
import { useParams } from 'react-router-dom';


function BrowsePage() {
    const dispatch = useDispatch()
    const profileId = useParams()
    // console.log("FROM COMPONENET !!!!!", profileId.profileId)

    const videos = useSelector(state => state?.videos?.videos_list)
    // console.log("From BrowsePage", videos)

    useEffect(() => {
        dispatch(getVideos(profileId.profileId))
        // ?????
    }, [dispatch])

    return (
        <div className='page__container'>
            <div>
                <h1>Browse Videos !</h1>
            </div>
            <div className='videos__container'>
                {videos.map(video => (
                    <div>
                        <iframe className="individual__video" width="450" height="275" src={video?.url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="allowfullscreen"></iframe>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BrowsePage;
