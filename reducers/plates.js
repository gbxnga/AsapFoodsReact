import C from '../constants/constants'
const plates = (state = {}, action) => {
    switch (action.type) {
        case C.GET_PLATES_LIST:
            return action.plates 
        case C.GET_PLATES_LIST_FAILED:
            return [] 
        case C.CLEAR_PLATE:
            return []   
        case C.DELETE_PLATE:
        console.log(`Action.id: ${action.id}`)
            return state.filter(
                plate => plate.id != action.id
            )  
        default :
            return state
    }
}
module.exports = plates;

