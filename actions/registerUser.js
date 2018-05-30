import C from '../constants/constants'
import toast from '../modules/toast'
import axios from "axios";
const registerUser = (id=0,username, password, name, email, phone,address,type,dispatch) =>{
    var formData = new FormData();
    formData.append("type", type);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("name", name);
    formData.append("id", id);
    
    axios.post(C.REGISTER_USER_API, formData)
      .then(response => {
        console.log(response)
        return response
      })
      .then(json => {
        if (json.data.success)
        {
            dispatch({
                type: C.LOGIN_USER_SUCCESSFUL,
                username: json.data.data.username,
                password: json.data.data.password,
                name: json.data.data.fullname,
                address: json.data.data.address,
                phone: json.data.data.phone,
                id : json.data.data.id,
                email: json.data.data.email,
                auth_token: json.data.data.auth_token,
                auth_type: json.data.data.auth_type,
                orders:json.data.data.orders,
                timestamp: new Date().toString()
            })
            toast(`${(json.data.data.auth_type == "email")?"Registration":"Login"} Successful!`)
        }
        else
        {
            dispatch({
                type: C.REGISTER_USER_FAILED
            })
            toast(`${(json.data.data.auth_type == "email")?"Registration":"Login"} Failed!`)
        }
      })
      .catch((error) => {
        toast('An Error Occured!')
          console.log(`${formData} ${error}`)
      });

}
module.exports = registerUser;