const LOAD = "videos/LOAD"
const ADD_VIDEO = "videos/ADD_VIDEO"


const load = videos => {
    console.log("IN ACTION", videos)
    return {
    type: LOAD,
    videos
}}


const addVideo = video => ({
    type: ADD_VIDEO,
    video
})


export const loadVideosToList = (listId) => async dispatch => {
    const response = await fetch(`api/my-lists/load-videos/${listId}`)
    // console.log("FROM loadVideos THUNK....", listId)
    if (response.ok) {
        const listVideos = await response.json();
        console.log("FROM LOAD VIDEOS THUNK", listVideos)
        dispatch(load(listVideos));
    }
}


export const addVideoToList = (listId, videoId) => async dispatch => {
    console.log("addVideosToList.....", listId, videoId)

    const response = await fetch(`/api/my-lists/add-video`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            listId,
            videoId
        })
    })

    if (response.ok) {
        const video = await response.json();
        console.log(">>>>>>>>", video)
        dispatch(addVideo(video))
        return video
    }
}


const initialState = {

};


const videosReducer = (state = initialState, action) => {
    let newState = {...state}

    console.log("ENTERED REDUCER.........", action.video)
    switch (action.type) {
        case LOAD: {
            let cleanState = {};
            console.log("CASE LOAD..........", action.videos)
            action.videos.forEach(video => {
                cleanState[video.id] = video
            });
            console.log("CLEANSTATE>>>>>>>>>>", cleanState)
            return cleanState
        }

        case ADD_VIDEO: {
            newState[action.video.videos[action.video.videos.length - 1].id] = action.video.videos[action.video.videos.length - 1]
            return newState
        }

        default:
            return state
    }
}

export default videosReducer;
