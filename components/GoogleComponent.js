import React, { Component } from 'react';
import { connect } from 'react-redux'
import user from '../reducers/user'
import PropTypes from 'prop-types'
import registerUser from '../actions/registerUser'

class GoogleComponent extends Component {
    constructor(props)
    {
        super(props)
        this.onSignIn = this.onSignIn.bind(this)
    }
    componentDidMount(){
       
    }
    onSignIn(googleUser)
    {
        alert('welcome');
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    
        console.log('Successful login for: ' + profile.getName());
        //console.log(response);
        //$('.customerName').html(profile.getName());
    
        //var res = JSON.stringify(response);
        
    }

  render() {
    let {children} = this.props;
    return (
        <div className="center-block" style={{width:236}}>
            <div style={{marginTop:15}} className="g-signin2" data-width="236" data-onsuccess={this.onSignIn}></div>
        </div>
    );
  }
}

GoogleComponent.contextTypes = {
    store: PropTypes.object
}
export default connect(
    (state, props) => { 
        return {
            user : user
        }
    },
    (dispatch) =>
        ({
            registerUser(id,username, password,name, email, phone,address, type) {
                registerUser(id,username, password,name, email, phone, address,"facebook", dispatch)
            }
        })
)(GoogleComponent)


//module.exports = FacebookComponent;