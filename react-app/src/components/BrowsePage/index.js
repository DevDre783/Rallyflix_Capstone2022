import React from 'react';
import './BrowsePage.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getVideos } from '../../store/browse';
import { Redirect, useParams } from 'react-router-dom';
import { FaAccusoft } from 'react-icons/fa';


function BrowsePage({profileId}) {
    const dispatch = useDispatch()

    const videos = useSelector(state => state?.videos?.videos_list)

    useEffect(() => {
        dispatch(getVideos(profileId))
        // ?????
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
                    <div key={video.id}>
                        <iframe loading='lazy' className="individual__video" width="450" height="275" src={video?.url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="allowfullscreen"></iframe>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BrowsePage;
