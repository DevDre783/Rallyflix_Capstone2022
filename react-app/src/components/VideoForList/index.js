import React from 'react';

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getLists } from '../../store/list';
import { addVideoToList, loadVideosToList } from '../../store/videos';
import { useParams } from 'react-router-dom';


function VideosToList({list}) {
    const dispatch = useDispatch()
    // const videos = Object.values(useSelector(state => state?.videos.videos_list))

    
    useEffect(() => {
        dispatch(loadVideosToList(list?.id))
    }, [dispatch])

    const videos = Object.values(useSelector(state => state.list_videos))

    // console.log('your title', list)
    console.log('your videos', videos)

    // const target = videos?.filter(vid => vid.id === list.id)

    // console.log('here is your target',target)
    // console.log("LIST FROM VIDEOSTOLIST", list)


    // console.log("VIDEO COMPONENt STATE", videos)
    if(!videos.length) {
        return (<h1>Wait....</h1>)
    }
    return (
        <div>
            <div>
            {videos?.map(video => (
                    <h1 style={{color: "white"}}>{video.title}</h1>
            ))}
            </div>
        </div>
    )
}
export default VideosToList;
