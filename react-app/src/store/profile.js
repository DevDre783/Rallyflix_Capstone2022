const LOAD = "profiles/LOAD";
const ADD_PROFILE = "profiles/ADD_PROFILE"
// const EDIT_PROFILE = "profiles/EDIT_PROFILE"
// const DELETE_PROFILE = "profiles/DELETE_PROFILE"


const loadProfiles = profiles => ({
    type: LOAD,
    profiles
})

const addProfile = (profile) => ({
    type: ADD_PROFILE,
    profile
});

// const deleteProfile = (profile) => {
//     return {
//         type: DELETE_PROFILE,
//         profile
//     }
// }

// const editProfile = (id) => ({
//     type: EDIT_PROFILE,
//     id
// })

export const getProfiles = (userId) => async dispatch => {
    // console.log("HEEELLLLOOOOOO", userId)
    const response = await fetch(`/api/profiles/${userId}`);

    if (response.ok) {
        const profiles_list = await response.json();
        dispatch(loadProfiles(profiles_list));
    }
}

export const addNewProfile = (userId, name) => async dispatch => {
    console.log("WORKING???????", userId, name )

    const response = await fetch(`/api/profiles/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "user_id": userId,
            "name": name
        })
    })

    if (response.ok) {
        const new_profile = await response.json();
        dispatch(addProfile(new_profile))
    }
}


export const editUserProfile = (user_id, newName, id) => async (dispatch) => {
    console.log("IN STORE PROFILE 1", id, newName, user_id)
    const res = await fetch(`/api/profiles/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            user_id,
            newName
        })
    })

    if(res.ok) {
        const profiles_list = await res.json()
        // dispatch(deleteProfile(id));
        console.log("THE PROFILES LIST", profiles_list)
        dispatch(loadProfiles(profiles_list));
    }
}

export const deleteUserProfile = (id, user_id) => async (dispatch) => {
    console.log("IN STORE PROFILE 1", id, user_id)
    const res = await fetch(`/api/profiles/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            user_id
        })
    })

    if(res.ok) {
        const profiles_list = await res.json()
        // dispatch(deleteProfile(id));
        console.log("THE PROFILES LIST", profiles_list)
        dispatch(loadProfiles(profiles_list));
    }
}


const initialState = {
    entries: []
};


const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOAD: {
            return {
                ...state,
                entries: [...action.profiles]
            }
        }

        case ADD_PROFILE: {
            return {
                ...state,
                entries: [...state.entries, action.profile]
            }
        }

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
