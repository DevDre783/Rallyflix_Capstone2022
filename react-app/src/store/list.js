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

export const addNewList = (id, title) => async dispatch => {
    console.log("WORKING???????", id, title )

    const response = await fetch(`/api/my-lists/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "id": id,
            "title": title
        })
    })

    if (response.ok) {
        const new_list = await response.json();
        dispatch(addList(new_list))
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
