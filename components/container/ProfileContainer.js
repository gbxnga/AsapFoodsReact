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
    componentWillReceiveProps()
    {
        console.log('Profile Container: im receiveing props')
    }
    componentDidMount(){
        const {plates} = this.context.store.getState()
        
        $('header #right').attr('data-content', `${plates.length}`);
    }
    componentDidUpdate()
    {
        const {plates} = this.context.store.getState()
        
        $('header #right').attr('data-content', `${plates.length}`);
    }
    render(){
        //const {user} = this.state
        const {user} = this.context.store.getState()
        const {openNav, closeNav} = this.context
        return(
            <div>
                <NavComponent closeNav={closeNav}/>
                <Header showBack={(this.props.location.pathname.endsWith('/edit-profile'))} title={(this.props.location.pathname.endsWith('/edit-profile')) ? "Edit Profile" : "Profile"} openNav={openNav}/>
                {(this.props.location.pathname.endsWith('/edit-profile'))? 
                <EditProfile updateProfile={this.props.updateProfile} logoutUser={this.props.logoutUser} user={user}/>
                :
                <Profile store={this.context.store}updateProfile={this.props.updateProfile} logoutUser={this.props.logoutUser} user={user}/>}
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
            user : user
        }
    },
    dispatch =>
        ({
            logoutUser() {
                logoutUser(dispatch)
            },
            updateProfile(id, name, password, phone,email, address, auth_token){
                updateProfile(id, name, password, phone,email, address, auth_token, dispatch)
            }
        })
)(ProfileContainer)

//module.exports = ProfileContainer;