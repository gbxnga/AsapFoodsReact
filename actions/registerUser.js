import C from '../constants/constants'
import toast from '../modules/toast'
import axios from "axios";
<<<<<<< HEAD
const registerUser = (id=0,username, password, name, email, phone,address,type,dispatch) =>{

    $('#register-form button').attr("disabled", "disabled").html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>');
=======

export default (id=0,username, password, name, email, phone,address,type,dispatch) =>{
    

>>>>>>> remove-context
    var formData = new FormData();
    formData.append("type", type);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("name", name);
    formData.append("id", id);
    
    return axios.post(C.REGISTER_USER_API, formData)
      .then(response => {
        console.log(response)
        return response
      })
      .then( response => {
          const { success, message } = response.data

        if ( success )
        {
            let { username, password, fullname, address, phone, id, email, auth_token, auth_type, orders, oauth_provider } = response.data.data
            dispatch({
                type: C.LOGIN_USER_SUCCESSFUL,
                username, 
                name: fullname,
                address,
                phone,
                id,
                email,
                auth_token,
                auth_type: oauth_provider,
                orders,
                timestamp: new Date().toString()
            }) 
        }
        else
        {
            dispatch({
                type: C.REGISTER_USER_FAILED
            }) 
        }
        return { success, message } 
      }) 

}
