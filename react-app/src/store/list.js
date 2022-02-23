const LOAD = "lists/LOAD";
const ADD_LIST = "lists/ADD_LIST"
const EDIT_LIST = "lists/EDIT_LIST"
const DELETE_LIST = "lists/DELETE_LIST"


const loadLists = my_lists => ({
    type: LOAD,
    my_lists
})

const addList = list => ({
    type: ADD_LIST,
    list
})

const deleteList = (list) => {
    return {
        type: DELETE_LIST,
        list
    }
}

const editAList = (list) => ({
    type: EDIT_LIST,
    list
})

export const getLists = (id) => async dispatch => {
    console.log("FROM GET LISTS", id)
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

    const response = await fetch(`/api/my-lists/${+profileId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "profile_id": +profileId,
            "title": title
        })
    })

    if (response.ok) {
        const new_list = await response.json();
        dispatch(addList(new_list))
        return new_list
    }
}

export const editList = (title, id) => async (dispatch) => {
    console.log("IN STORE LIST", id, title)
    const res = await fetch(`/api/my-lists/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "title": title
        })
    })

    if(res.ok) {
        const edited_list = await res.json()
        // dispatch(deleteProfile(id));
        console.log("THE PROFILES LIST", edited_list)
        dispatch(editAList(edited_list))
    }
}


export const deleteProfileLists = (id) => async (dispatch) => {
    console.log("IN STORE LIST DELETE", +id)
    const res = await fetch(`/api/my-lists/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })

    if(res.ok) {
        const profiles_list = await res.json()
        // dispatch(deleteProfile(id));
        console.log("THE PROFILES LIST", profiles_list)
        dispatch(deleteList(profiles_list))
        // dispatch(getLists(profiles_list));
    }
}

const initialState = {
    lists: []
};

const listsReducer = (state = initialState, action) => {
    let newState;

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

        case EDIT_LIST: {
            return {
                ...state,
                [action.payload]: action.list
            }
        }

        case DELETE_LIST: {
            newState = { ...state };
            delete newState[action.list]
            return newState;
        }

        default: return state;
    }
}

export default listsReducer;
