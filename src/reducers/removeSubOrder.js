const removeSubOrderReducer = (state = null, action) => {
    switch (action.type) {
        case 'REMOVE_SUBITEM':
            state = action.id
            return state
        default:
            return state
    }
}


export default removeSubOrderReducer