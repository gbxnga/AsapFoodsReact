import C from '../constants/constants'
import toast from '../modules/toast'
import axios from "axios";
const deletePlate = (auth_token, id, dispatch) =>{
    
    
    return axios.get(`${C.DELETE_PLATE_API}/${id}/delete?token=${auth_token}`)
      .then(response => {
        console.log(response)
        return response
      })
      .then(json => {

        const { success } = json.data
        if (success)
        {
            dispatch({
                type:C.DELETED_PLATE,
                id: id
            })            
        }
        else
        {
            dispatch({
                type: C.DELETE_PLATE_FAILED
            })              
        }
        return success
        
      })
      .catch((error) => {
        
          console.log(` ${error}`)
          
          return false
      });


}
module.exports = deletePlate;