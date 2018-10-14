import {GET_KITCHENS_API} from '../constants/api'
import {GET_KITCHENS_LIST, GET_KITCHENS_LIST_FAILED } from '../constants'
import axios from "axios";
const getKitchens = (auth_token, dispatch) =>{
    var formData = new FormData();
    formData.append("token", auth_token);

    return axios.get(`${GET_KITCHENS_API}?token=${auth_token}`)

    
      .then(response => {
        
        const { success } = response.data
        if (success)
        {            
            const { data } = response.data
                
            const kitchens = $.map(data, function(value, index) {
                return [value];
            });
            dispatch({
                type:GET_KITCHENS_LIST,
                kitchens
            })
            return kitchens;
        }
        else
        {
            dispatch({
                type: GET_KITCHENS_LIST_FAILED
            });
            return [];
        }
      })
      .catch((error) => {
          console.log(` ${error}`)
      });

}
module.exports = getKitchens;