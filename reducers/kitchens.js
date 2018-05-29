import C from '../constants/constants'
const kitchens = (state = {}, action) => {
    switch (action.type) {
        case C.GET_KITCHENS_LIST:
            return action.kitchens 
        case C.GET_KITCHENS_LIST_FAILED:
            return []     
        default :
            return state
    }
}
module.exports = kitchens;