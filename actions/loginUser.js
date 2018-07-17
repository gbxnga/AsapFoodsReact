import {
    LOGIN_USER_SUCCESSFUL,
    LOGIN_USER_FAILED
} from '../constants'
import {
    LOGIN_USER_API,
} from '../constants/api'
import toast from '../modules/toast'
import axios from "axios";
export default (email, password, dispatch) =>{
    $('#login-form button').attr("disabled", "disabled").html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>');

        
    var formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    axios.get(`${LOGIN_USER_API}/${email}/${password}`)
      .then(response => {
        console.log(response)
        return response
      })
      .then(json => {
        if (json.data.success)
        {
            let {password, name, address, phone, id, email, auth_token, auth_type, orders, oauth_provider} = json.data.data
            dispatch({
                type: LOGIN_USER_SUCCESSFUL,
                //username: json.data.data.username,
                password,
                name,
                address,
                phone,
                id,
                email,
                auth_token,
                auth_type: oauth_provider ,
                orders,
                timestamp: new Date().toString()
            })
            toast('Login Successful!')
        }
        else
        {
            dispatch({
                type: LOGIN_USER_FAILED
            })
            toast('Login Failed!')
        }
        $("#login-form button").removeAttr("disabled").html('Login');
      })
      .catch((error) => {
        toast('An Error Occured!')
          console.log(`${LOGIN_USER_API}/${email}/${password} ${error}`)
          $("#login-form button").removeAttr("disabled").html('Login');
      });

}