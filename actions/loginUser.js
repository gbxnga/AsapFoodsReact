import {
    LOGIN_USER_SUCCESSFUL,
    LOGIN_USER_FAILED
} from '../constants'
import {
    LOGIN_USER_API,
} from '../constants/api'

import axios from "axios";

import createHistory from 'history/createBrowserHistory';
const history = createHistory();

export default (email, password, dispatch) =>{

    return axios.get(`${LOGIN_USER_API}/${email}/${password}`) 
      .then(response => {
        console.log(response)
        console.table(response.data.data)
        
        const { success, data } = response.data
        if ( success )
        {
            let { password, name, address, phone, id, email, auth_token, auth_type, orders, oauth_provider } = response.data.data
            dispatch({
                type: LOGIN_USER_SUCCESSFUL,
                password,
                name: data.fullname,
                address,
                phone,
                id,
                email,
                auth_token,
                auth_type: oauth_provider ,
                orders,
                timestamp: new Date().toString()
            })
            
        }
        else
        {
            dispatch({
                type: LOGIN_USER_FAILED
            })
            
        }
        return success
        
      })

}