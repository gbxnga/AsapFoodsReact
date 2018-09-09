import C from '../constants/constants'
import axios from "axios";
const getPlates = (auth_token, dispatch) =>{
    console.log('Getting plates now');
    var formData = new FormData();

    return axios.get(`${C.GET_PLATES_API}?token=${auth_token}`)
      .then(response => {
        console.log(response)
        return response
      })
      .then(json => {
        if (json.data.success)
        {
            let myObj = json.data.data
            
            let array = $.map(myObj, function(value, index) {
                return [value];
            });
            dispatch({
                type:C.GET_PLATES_LIST,
                plates: array
            })
            return array
        }
        else
        {
            dispatch({
                type: C.GET_PLATES_LIST_FAILED
            })  
            return []             
        }
      })
      .catch((error) => {
            dispatch({
                type: C.GET_PLATES_LIST_FAILED
            })  
            return []
      });

}
module.exports = getPlates;