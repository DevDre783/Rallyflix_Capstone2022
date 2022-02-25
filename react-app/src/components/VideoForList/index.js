import React from 'react';

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getLists } from '../../store/list';
import { addVideoToList, loadVideosToList } from '../../store/videos';
import { useParams } from 'react-router-dom';


function VideosToList({list}) {
    const dispatch = useDispatch()
    const videos = Object.values(useSelector(state => state?.videos.videos_list))
    // const videos = useSelector(state => state?.videos.videos_list)

    console.log("LIST FROM VIDEOSTOLIST", list)


    useEffect(() => {
        dispatch(loadVideosToList(list.id))
    }, [dispatch])
    console.log("VIDEO COMPONENt STATE", videos)


    if(!videos.length) {
        return (<h1>Wait....</h1>)
    }


    return (
        <div>
            <h1>HELLO</h1>
            {/* <p>{videos[0]}</p> */}
            {videos?.map(video => {
                <>
                    <h1>{video?.summary}</h1>
                    <iframe className="" width="300" height="175" src={video?.url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="allowFullScreen"></iframe>
                </>
            })}
        </div>
    )
}

export default VideosToList;
