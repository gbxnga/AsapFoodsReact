
import C from '../constants/constants'
import axios from "axios";
import toast from '../modules/toast'
const updateProfile = (id, fullname, password, phone, email, address,auth_token, dispatch) =>{
    $('#submit_edit_profile').attr("disabled", "disabled").html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>');

    
    var formData = new FormData();
    formData.append("id", id);
    //formData.append("username", username);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("fullname", fullname);
    formData.append("address", address);
    formData.append("token", auth_token);
    console.log(id, fullname, password, phone, email, address,auth_token, dispatch)
    
    axios.post(`${C.UPDATE_USER_API}`, formData)
      .then(response => {
        console.log(response)
        return response
      })
      .then(json => {
        if (json.data.success)
        {
            dispatch({
                type: C.UPDATE_PROFILE_SUCCESSFUL,
                //username: json.data.data.username,
                password: json.data.data.password,
                name: json.data.data.fullname,
                address: json.data.data.address,
                phone: json.data.data.phone,
                id : json.data.data.id,
                email: json.data.data.email,
                auth_token: json.data.data.auth_token,
                auth_type:json.data.data.oauth_provider,
                orders:json.data.data.orders,
                timestamp: new Date().toString()
            })
            window.history.back()
            toast(`${json.data.message}`)
            
        }
        else
        {
            dispatch({
                type: C.UPDATE_PROFILE_FAILED
            })
            
            toast(`${json.data.message}`)
            
        }
        $("#submit_edit_profile").removeAttr("disabled").html('UPDATE PROFILE');
      })
      .catch((error) => {
        toast('An Error occured!')
          console.log(`${formData} ${error}`)
          $("#submit_edit_profile").removeAttr("disabled").html('UPDATE PROFILE');
      });

}
module.exports = updateProfile;