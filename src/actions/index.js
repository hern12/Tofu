export const removeSubItem = id => {
    return {
        type: 'REMOVE_SUBITEM',
        id: id ? id : null
    }
}