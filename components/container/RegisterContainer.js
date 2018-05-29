import React, {Component} from 'react'
import Register from '../presentation/Register'
import { connect } from 'react-redux'
import user from '../../reducers/user'
import registerUser from '../../actions/registerUser'
/*class RegisterContainer extends Component
{
    constructor(props)
    {
        super(props)
    }

    componentWillMount()
    {

    }


    render(){
        return(
                <Register registerUser={registerUser}/>
            
        )
    }
}*/
const RegisterContainer =  connect(
    (state, props) => { 
        return {
            user : user
        }
    },
    (dispatch) =>
        ({
            registerUser(id,username, password,name, email, phone,address, type) {
                registerUser(id,username, password,name, email, phone, address,type,dispatch)
            }
        })
)(Register)
module.exports = RegisterContainer;