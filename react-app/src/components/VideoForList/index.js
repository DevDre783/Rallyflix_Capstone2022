import React from 'react';

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getLists } from '../../store/list';
import { getVideos } from '../../store/browse';
import { useParams } from 'react-router-dom';


function VideosToList({list}) {
    const dispatch = useDispatch()
    const videos = Object.values(useSelector(state => state?.videos?.videos_list))
    const profileId = useParams()


    useEffect(() => {
        dispatch(getVideos(profileId.id))
    }, [])

    const myVideo = videos.find(video => video.id === list.video_id)

    return (
        <>
            <iframe className="individual__video" width="300" height="175" src={myVideo?.url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="allowfullscreen"></iframe>
        </>
    )
}

export default VideosToList;
