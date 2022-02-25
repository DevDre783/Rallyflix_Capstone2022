const ADD_VIDEO = "videos/ADD_VIDEO"


const addVideo = video => ({
    type: ADD_VIDEO,
    video
})


export const addVideoToList = (listId, videoId) => async dispatch => {
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
        dispatch(addVideo(video))
        return video
    }
}


const initialState = {

};

const videosReducer = (state = initialState, action) => {
    let newState = {...state}

    switch (action.type) {

        case ADD_VIDEO: {
            newState[action.video.id] = action.video
            return newState
        }

        default:
            return state
    }
}

export default videosReducer;
