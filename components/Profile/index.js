import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import SideBar from '../SideBar'
import Header from '../Header';
import Profile from './Profile'
import EditProfile from './EditProfile'

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
                <SideBar />
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