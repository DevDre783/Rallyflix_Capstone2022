const LOAD = "videos/LOAD";


const loadVideos = videos => ({
    type: LOAD,
    videos
})


export const getVideos = (profileId) => async dispatch => {
    console.log("HEEELLLLOOOOOO", profileId)
    const response = await fetch(`/api/browse/${profileId}`);

    if (response.ok) {
        const videos = await response.json();
        dispatch(loadVideos(videos));
    }
}

const initialState = {
    videos_list: []
};

const videoReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD: {
            return {
                ...state,
                videos_list: [...action.videos]
            }
        }
        default: return state;
    }
}

export default videoReducer;
