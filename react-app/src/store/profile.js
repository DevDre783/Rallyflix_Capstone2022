const LOAD = "profiles/LOAD";
// const ADD_PROFILE = "profiles/ADD_PROFILE"
// const EDIT_PROFILE = "profiles/EDIT_PROFILE"
// const DELETE_PROFILE = "profiles/DELETE_PROFILE"


const loadProfiles = profiles_list => ({
    type: LOAD,
    profiles_list
})

export const getProfiles = () => async dispatch => {
    const response = await fetch(`/api/profiles/`);

    if (response.ok) {
        const profiles_list = await response.json();
        dispatch(loadProfiles(profiles_list));
    }
}

const initialState = {
    entries: []
};


const profileReducer = (state = initialState, action) => {


    switch (action.type) {

        case LOAD: {

            const usersProfiles = [...action.profiles_list.users].reduce((prev, curr) => {
                return { ...prev, [curr.id]: { id: curr.id, user_id: curr.user_id, name: curr.name } }
            }, {})

            return {
                ...state,
                entries: [...action.profiles_list.profiles],
                usersProfiles: usersProfiles
            }
        }

        default: return state;
    }
}

export default profileReducer;
