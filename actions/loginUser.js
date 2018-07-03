import C from '../constants/constants'
import toast from '../modules/toast'
import axios from "axios";
const loginUser = (email, password, dispatch) =>{
    $('#login-form button').attr("disabled", "disabled").html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>');

        
    var formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    axios.get(`${C.LOGIN_USER_API}/${email}/${password}`)
      .then(response => {
        console.log(response)
        return response
      })
      .then(json => {
        if (json.data.success)
        {
            dispatch({
                type: C.LOGIN_USER_SUCCESSFUL,
                //username: json.data.data.username,
                password: json.data.data.password,
                name: json.data.data.name,
                address: json.data.data.address,
                phone: json.data.data.phone,
                id : json.data.data.id,
                email: json.data.data.email,
                auth_token: json.data.data.auth_token,
                auth_type: json.data.data.oauth_provider,
                orders:json.data.data.orders,
                timestamp: new Date().toString()
            })
            toast(`${json.data.message}`)
        }
        else
        {
            dispatch({
                type: C.LOGIN_USER_FAILED
            })
            toast(`${json.data.message}`)
        }
        $("#login-form button").removeAttr("disabled").html('Login');
      })
      .catch((error) => {
        toast('An Error Occured!')
          console.log(`${C.LOGIN_USER_API}/${email}/${password} ${error}`)
          $("#login-form button").removeAttr("disabled").html('Login');
      });

}
module.exports = loginUser;