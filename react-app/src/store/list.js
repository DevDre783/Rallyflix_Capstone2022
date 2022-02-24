const LOAD = "lists/LOAD";
const ADD_LIST = "lists/ADD_LIST"
const EDIT_LIST = "lists/EDIT_LIST"
const DELETE_LIST = "lists/DELETE_LIST"


const loadLists = lists => ({
    type: LOAD,
    lists
})

const addList = list => ({
    type: ADD_LIST,
    list
})

const editAList = (list) => ({
    type: EDIT_LIST,
    list
})

const deleteList = (list) => {
    return {
        type: DELETE_LIST,
        list
    }
}


export const getLists = (id) => async dispatch => {
    console.log("GET LISTS", id)
    const response = await fetch(`/api/my-lists/${id}`);

    if (response.ok) {
        const lists = await response.json();
        dispatch(loadLists(lists));
        return lists
    }
}

export const addNewList = (title, id) => async dispatch => {
    console.log("FROM THUNK", typeof(id))
    const response = await fetch(`/api/my-lists/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id,
            title
        })
    })

    if (response.ok) {
        const new_list = await response.json();
        dispatch(addList(new_list))
        return new_list
    }
}

export const editList = (title, profileId, id) => async (dispatch) => {
    const res = await fetch(`/api/my-lists/${profileId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            profileId,
            id,
            title
        })
    })

    if(res.ok) {
        const edited_list = await res.json()

        dispatch(editAList(edited_list))
    }
}


export const deleteProfileLists = (id) => async (dispatch) => {
    const res = await fetch(`/api/my-lists/${id}`, {
        method: 'DELETE'
    })

    if(res.ok) {
        const profiles_list = await res.json()

        dispatch(deleteList(profiles_list))
        return profiles_list
    }
}

const initialState = {

};

const listsReducer = (state = initialState, action) => {
    let newState = {...state}

    switch (action.type) {
        case LOAD: {
            action.lists.forEach(list => {
                newState[list.id] = list
            });
            return newState
        }

        case ADD_LIST:
        case EDIT_LIST: {
            if(state[action.list.id] = action.list.id) {
                newState[action.list.id] = action.list
            }
            return newState;
        }

        case DELETE_LIST: {
            let newState = []
            newState.push({...state})
            return newState.filter((list) => list.id !== action.list.id);
        }

        default:
            return state
    }
}

export default listsReducer;
