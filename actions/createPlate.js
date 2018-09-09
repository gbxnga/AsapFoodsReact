import {GET_KITCHENS_API} from '../constants/api'
import C from '../constants/constants'
import {CREATE_PLATE, CREATE_PLATE_FAILED } from '../constants'
import axios from "axios";
import toast from '../modules/toast'
const createPlate = (auth_token, items, kitchenId, dispatch) =>{
        //this.setState({loading: true})
        let formData = new FormData();

        

        formData.append("token", auth_token);
        formData.append("kitchen_id", kitchenId)

        items.map( item => { formData.append(item.id, item.quantity) } )
        

        return axios.post(`${C.CREATE_PLATE_API}?token=${auth_token}`, formData)
            .then(response => {
                console.log(response)
                return response
            })
            .then(json => {
                if (json.data.success) {

                    // add new plates to existing

                    dispatch({
                        type: C.CREATE_PLATE,
                        //plate: 
                    }) 
                    
                    return true;
                } else {
                    
                    return false;
                }
                
            })
            .catch((error) => {
                dispatch({
                    type: C.CREATE_PLATE_FAILED
                }) 
                console.log(` ${error}`)
                return false
                
                
            });

}
module.exports = createPlate;