const LOAD = "profiles/LOAD";
// const ADD_PROFILE = "profiles/ADD_PROFILE"
// const EDIT_PROFILE = "profiles/EDIT_PROFILE"
// const DELETE_PROFILE = "profiles/DELETE_PROFILE"


const loadProfiles = profiles => ({
    type: LOAD,
    profiles
})

// const addProfile = (profile) => ({
//     type: ADD_PROFILE,
//     profile
// });

export const getProfiles = (userId) => async dispatch => {
    console.log("HEEELLLLOOOOOO", userId)
    const response = await fetch(`/api/profiles/${userId}`);

    if (response.ok) {
        const profiles_list = await response.json();
        dispatch(loadProfiles(profiles_list));
    }
}

// export const addNewProfile = ({userId, name}) => async dispatch => {
//     const response = await fetch(`/api/profiles/add-profile`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             "user_id": userId,
//             name
//         })
//     })

//     if (response.ok) {
//         const new_profile = await response.json();
//         dispatch(addProfile(new_profile))
//     }
// }


const initialState = {
    entries: []
};


const profileReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD: {
            return {
                ...state,
                entries: [...action.profiles]
            }
        }

        // case ADD_PROFILE: {
        //     return {
        //         ...state,
        //         entries: [...state.entries, action.profile]
        //         // must add action.lists to entries above
        //     }
        // }

        // case EDIT_PROFILE: {
        //     return {
        //         ...state,
        //         [action.payload]: action.id
        //     }
        // }

        // case DELETE_PROFILE: {
        //     newState = { ...state };
        //     delete newState[action.profile]
        //     return newState;
        // }

        default: return state;
    }
}

export default profileReducer;
