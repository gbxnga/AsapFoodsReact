import {
    GET_NUMBER_OF_PLATES
} from '../constants'
const cart = (state = {}, action) => {
    switch (action.type) {
        case GET_NUMBER_OF_PLATES:
            return 0     
            
        default :
            return state
    }
}
module.exports = cart;