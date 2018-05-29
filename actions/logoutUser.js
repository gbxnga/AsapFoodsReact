import C from '../constants/constants'
const logoutUser = (dispatch) =>{
    dispatch({
        type: C.LOGOUT_USER_SUCCESSFUL
    })

}
module.exports = logoutUser;