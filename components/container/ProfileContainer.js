import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import NavComponent from '../NavComponent'
import Header from '../presentation/Header'
import Profile from '../presentation/Profile'
import EditProfile from '../presentation/EditProfile'

import user from '../../reducers/user'
import logoutUser from '../../actions/logoutUser'
import updateProfile from '../../actions/updateProfile'

class ProfileContainer extends React.Component
{
    constructor(props)
    {
        super(props)
    }
    componentWillUnmount()
    {
        $('.modal-backdrop').remove();
    }
    componentDidCatch(){
        console.log('ERROR!');
    }
     
    render(){
        //const {user} = this.state
        const { user } = this.props  
        console.log(user)
        return(
            <div>
                <NavComponent />
                <Header showBack={(this.props.location.pathname.endsWith('/edit-profile'))} title={(this.props.location.pathname.endsWith('/edit-profile')) ? "Edit Profile" : "Profile"}  />
                {(this.props.location.pathname.endsWith('/edit-profile'))? 
                <EditProfile updateProfile={this.props.updateProfile} logoutUser={this.props.logoutUser} user={user}/>
                :
                <Profile updateProfile={this.props.updateProfile} logoutUser={this.props.logoutUser} user={user}/>}
            </div>
        )
    }

}
ProfileContainer.contextTypes = {
    store: PropTypes.object,
    openNav: PropTypes.func,
    closeNav: PropTypes.func
}
export default connect(
    (state, props) => { 
        return {
            user : state.user
        }
    },
    dispatch =>
        ({
            logoutUser() {
                return logoutUser(dispatch)
            },
            updateProfile(id, name, password, phone,email, address, auth_token){
                updateProfile(id, name, password, phone,email, address, auth_token, dispatch)
            }
        })
)(ProfileContainer)

//module.exports = ProfileContainer;