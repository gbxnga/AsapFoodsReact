import C from '../constants/constants'
import toast from '../modules/toast'
import axios from "axios";
const deletePlate = (auth_token, id, dispatch) =>{
    $(`#btn_delete_plate_${id}`).removeAttr('class').attr('class', 'fa fa-spinner fa-spin fa-1x fa-fw delete-plate-btn');
    
    axios.get(`${C.DELETE_PLATE_API}/${id}/delete?token=${auth_token}`)
      .then(response => {
        console.log(response)
        return response
      })
      .then(json => {
        if (json.data.success)
        {
            dispatch({
                type:C.DELETE_PLATE,
                id: id
            })
            toast('Plate Deleted!')
            
        }
        else
        {
            dispatch({
                type: C.DELETE_PLATE_FAILED
            })  
            toast('Couldnt Delete Plate!')             
        }
        $(`#btn_delete_plate_${id}`).removeAttr('class').attr('class', 'glyphicon glyphicon-trash delete-plate-btn');
      })
      .catch((error) => {
        toast('An Error Occured!') 
          console.log(` ${error}`)
          $(`#btn_delete_plate_${id}`).removeAttr('class').attr('class', 'glyphicon glyphicon-trash delete-plate-btn');
      });


}
module.exports = deletePlate;