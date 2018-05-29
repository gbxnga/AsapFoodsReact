import C from '../constants/constants'
const user = (state = {}, action) => {
    switch (action.type) {
        case C.LOGIN_USER_SUCCESSFUL:
            return {
                isLoggedIn : true,
                details: { // Returns a new color object constructed from the action’s payload data.
                    id: action.id,
                    name: action.name,
                    address: action.address,
                    phone: action.phone,
                    //username: action.username,
                    email:action.email,
                    auth_token: action.auth_token,
                    auth_type:action.auth_type,
                    orders:action.orders,
                    timestamp: action.timestamp
                }
            } 
        case C.LOGIN_USER_FAILED:
            return {
                isLoggedIn : false,
                details: {}
            } 
        case C.REGISTER_USER_SUCCESSFUL:
            return {
                isLoggedIn : false,
                details: {}
            } 
        case C.REGISTER_USER_FAILED:
            return {
                isLoggedIn : false,
                details: {}
            } 
        case C.LOGOUT_USER_SUCCESSFUL:
            return {
                isLoggedIn : false,
                details: {}
            }
        case C.LOGOUT_USER_FAILED:
            return state   
        case C.UPDATE_PROFILE_SUCCESSFUL:
            return {
                isLoggedIn : true,
                details: { // Returns a new color object constructed from the action’s payload data.
                    id: action.id,
                    name: action.name,
                    address: action.address,
                    phone: action.phone,
                    //username: action.username,
                    email:action.email,
                    auth_token: action.auth_token,
                    auth_type:action.auth_type,
                    orders:action.orders,
                    timestamp: action.timestamp,
                    
                }
            } 
        case C.INCREMENT_ORDERS:

            return {
                ...state,...state.details, orders: state.details.orders++
            }

        case C.UPDATE_PROFILE_FAILED:
            return state
            
        default :
            return state
    }
}
module.exports = user;