import {
    GET_PLATES_LIST,
    GET_PLATES_LIST_FAILED,
    CLEAR_PLATE,
    DELETE_PLATE
}from '../constants'
export default (state = {}, action) => {
    switch (action.type) {
        case GET_PLATES_LIST:
            return action.plates 
        case GET_PLATES_LIST_FAILED:
            return [] 
        case CLEAR_PLATE:
            return []   
        case DELETE_PLATE:
            return state.filter(
                plate => plate.id != action.id
            )  
        default :
            return state
    }
}

