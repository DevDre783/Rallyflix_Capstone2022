const LOAD = "lists/LOAD";
const ADD_LIST = "lists/ADD_LIST"
// const EDIT_LIST = "lists/EDIT_LIST"
// const DELETE_LIST = "lists/DELETE_LIST"


const loadLists = my_lists => ({
    type: LOAD,
    my_lists
})

const addList = list => ({
    type: ADD_LIST,
    list
})

export const getLists = (id) => async dispatch => {
    const response = await fetch(`/api/my-lists/${id}`);

    if (response.ok) {
        const lists = await response.json();
        // console.log("FROM List Store", lists)
        dispatch(loadLists(lists));
        return lists
    }
}

export const addNewList = (title, profileId) => async dispatch => {
    console.log("IN addNewList THUNK", profileId, title)

    const response = await fetch(`/api/my-lists/${profileId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "profile_id": profileId,
            "title": title
        })
    })

    if (response.ok) {
        const new_list = await response.json();
        dispatch(addList(new_list))
        return new_list
    }
}

export const editList = (title, profile_id, id) => async (dispatch) => {
    console.log("IN STORE LIST", profile_id, title)
    const res = await fetch(`/api/my-lists/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "id": id,
            "profile_id": profile_id,
            "title": title
        })
    })

    if(res.ok) {
        const edited_list = await res.json()
        // dispatch(deleteProfile(id));
        console.log("THE PROFILES LIST", edited_list)
        dispatch(getLists(edited_list));
    }
}

export const deleteProfileLists = (id, profile_id) => async (dispatch) => {
    console.log("IN STORE PROFILE 1", id, profile_id)
    const res = await fetch(`/api/my-lists/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            profile_id
        })
    })

    if(res.ok) {
        const profiles_list = await res.json()
        // dispatch(deleteProfile(id));
        console.log("THE PROFILES LIST", profiles_list)
        dispatch(getLists(profiles_list));
    }
}

const initialState = {
    lists: []
};

const listsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD: {
            return {
                ...state,
                lists: [...action.my_lists]
            }
        }

        case ADD_LIST: {
            return {
                ...state,
                lists: [...state.lists, action.list]
            }
        }

        default: return state;
    }
}

export default listsReducer;
