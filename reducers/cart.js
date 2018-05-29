import C from '../constants/constants'
const cart = (state = {}, action) => {
    switch (action.type) {
        case C.GET_NUMBER_OF_PLATES:
            return 0     
            
        default :
            return state
    }
}
module.exports = cart;