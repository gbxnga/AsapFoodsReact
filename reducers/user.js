import {
    LOGIN_USER_SUCCESSFUL,
    LOGIN_USER_FAILED,
    REGISTER_USER_SUCCESSFUL,
    REGISTER_USER_FAILED,
    LOGOUT_USER_SUCCESSFUL,
    LOGOUT_USER_FAILED,
    UPDATE_PROFILE_SUCCESSFUL,
    INCREMENT_ORDERS,
    UPDATE_PROFILE_FAILED
    
} from '../constants'

const DEFAULT_STATE = {
    isLoggedIn : false,
    details: { }
}
export default ( state = DEFAULT_STATE, action ) => {

    const {id, name, address, phone, email, auth_token, auth_type, orders, timestamp} = action
    switch (action.type) {
        case LOGIN_USER_SUCCESSFUL:
            return {
                isLoggedIn : true,
                details: { // Returns a new color object constructed from the action’s payload data.
                    id,
                    name,
                    address,
                    phone,
                    //username: action.username,
                    email,
                    auth_token,
                    auth_type,
                    orders,
                    timestamp
                }
            } 
        case LOGIN_USER_FAILED:
            return {
                isLoggedIn : false,
                details: {}
            } 
        case REGISTER_USER_SUCCESSFUL:
            return {
                isLoggedIn : false,
                details: {}
            } 
        case REGISTER_USER_FAILED:
            return {
                isLoggedIn : false,
                details: {}
            } 
        case LOGOUT_USER_SUCCESSFUL:
            return {
                isLoggedIn : false,
                details: {}
            }
        case LOGOUT_USER_FAILED:
            return state   
        case UPDATE_PROFILE_SUCCESSFUL:
            return {
                isLoggedIn : true,
                details: { // Returns a new color object constructed from the action’s payload data.
                    id,
                    name,
                    address,
                    phone,
                    //username: action.username,
                    email,
                    auth_token,
                    auth_type,
                    orders,
                    timestamp,
                    
                }
            } 
        case INCREMENT_ORDERS:

            return {
                ...state,...state.details, orders: state.details.orders++
            }

        case UPDATE_PROFILE_FAILED:
            return state
            
        default :
            return state
    }
}