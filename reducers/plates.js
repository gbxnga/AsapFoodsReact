import {
    GET_PLATES_LIST,
    GET_PLATES_LIST_FAILED,
    CLEAR_PLATE,
    DELETED_PLATE,
    ADD_PLATE
}from '../constants'
export default (state = {}, action) => {
    switch (action.type) {
        case ADD_PLATE:
            return  [ ...state,  action.plate ]
            
        case GET_PLATES_LIST:
            return action.plates 
        case GET_PLATES_LIST_FAILED:
            return [] 
        case CLEAR_PLATE:
            return []   
        case DELETED_PLATE:
            return state.filter(
                plate => plate.id != action.id
            ) 
        default :
            return state
    }
}

