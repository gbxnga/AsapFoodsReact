
import React from 'react';
import { connect } from 'react-redux';

import { plates, user } from '../../reducers'

import Plate from './Plate'
import deletePlate from '../../actions/deletePlate'
import toast from '../../modules/toast'

const mapStateToProps = state => {
    return {
        plates: state.plates,
        user: state.user
    }
}
const mapDispatchToProps = dispatch => ({
    deletePlate(auth_token, id){
        return deletePlate(auth_token, id, dispatch)
    }
})

class PlateList extends React.Component {

    constructor(){
        super()
        this.state = {

            deletingPlates : []
        }
    }

    componentDidMount(){

        // fetch its own data
    }

    async _deletePlate(plateId){

        this.setState({deletingPlates: [ ...this.state.deletingPlates, plateId ] })
        // $(`#btn_delete_plate_${id}`).removeAttr('class').attr('class', 'fa fa-spinner fa-spin fa-1x fa-fw delete-plate-btn');
        

        const { deletePlate, user } = this.props
        const { auth_token } = user.details

        const result = await deletePlate( auth_token, plateId )

        if (result)
        {
            toast('Plate Deleted!')
        }
        else
        {
            toast('Couldnt Delete Plate!') 
        }
        // $(`#btn_delete_plate_${id}`).removeAttr('class').attr('class', 'glyphicon glyphicon-trash delete-plate-btn');

        console.log(this.state)


    }


    render(){

        const { plates } = this.props
        

        return(

            <div id="media-con-new">
                { plates.length === 0 ?

                    console.log(plates) : 
                            
                    plates.map( plate => <Plate 
                                            deletePlate={ _ => this._deletePlate( plate.id ) } 
                                            key={plate.id} 
                                            plate={plate}
                                            deleting={ this.state.deletingPlates.includes(plate.id)}
                                        />
                                )
                }
            </div>

        )
    }
}


export default connect( mapStateToProps, mapDispatchToProps )( PlateList )