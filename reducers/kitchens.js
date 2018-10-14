import {
    GET_KITCHENS_LIST,
    GET_KITCHENS_LIST_FAILED

} from '../constants'
export default (state = [], action) => {
    switch (action.type) {
        case GET_KITCHENS_LIST:
            return action.kitchens 
        case GET_KITCHENS_LIST_FAILED:
            return []     
        default :
            return state
    }
}