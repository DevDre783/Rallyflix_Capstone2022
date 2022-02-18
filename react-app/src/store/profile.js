import { user } from "pg/lib/defaults";

const LOAD = "profiles/LOAD";
const ADD_PROFILE = "profiles/ADD_PROFILE"
const EDIT_PROFILE = "profiles/EDIT_PROFILE"
// const DELETE_PROFILE = "profiles/DELETE_PROFILE"


const loadProfiles = profiles => ({
    type: LOAD,
    profiles
})

const addProfile = (profile) => ({
    type: ADD_PROFILE,
    profile
});

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


// export const editNewProfile = (userId, name) => async dispatch => {
//     console.log("WORKING???????", userId, name )

//     const response = await fetch(`/api/profiles/`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             "user_id": userId,
//             "name": name
//         })
//     })

//     if (response.ok) {
//         const new_profile_name = await response.json();
//         dispatch(editProfile(new_profile_name))
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
