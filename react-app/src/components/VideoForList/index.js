import React from 'react';

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import listsReducer, { getLists } from '../../store/list';
import { addVideoToList, loadVideosToList } from '../../store/videos';
import { useParams } from 'react-router-dom';


function VideosToList({list}) {
    const dispatch = useDispatch()
    const videos = Object.values(useSelector(state => state?.list_videos))


    useEffect(() => {
        dispatch(loadVideosToList(list.id))
    }, [dispatch])

    return (
        <div>
            {videos?.map(video => {
                <iframe className="" width="300" height="175" src={video?.url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="allowFullScreen"></iframe>
            })}
        </div>
    )
}

export default VideosToList;
