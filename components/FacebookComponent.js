import React, { Component } from 'react';
import { connect } from 'react-redux'
import user from '../reducers/user'
import PropTypes from 'prop-types'
import registerUser from '../actions/registerUser'
//import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import TiSocialFacebookCircular from 'react-icons/lib/ti/social-facebook-circular';

class FacebookComponent extends Component {
    constructor(props)
    {
        super(props)
        this.responseFacebook = this.responseFacebook.bind(this)
    }

     responseFacebook(response){
        console.log(response);
        var res = JSON.stringify(response);
        this.props.registerUser(response.id,"username","password",response.name, response.email, "", response.address,"facebook")
      }
      componentClicked(){

      }


  render() {
    let {children} = this.props;
    return (
        <FacebookLogin
        appId="1996180800633192"
        size="small"
        autoLoad={true}
        fields="name,first_name,last_name,email,gender, address"
        onClick={this.componentClicked}
        callback={this.responseFacebook}
        redirectUri={window.history.href="https://asapfoods.com.ng/#/login"}
        render={renderProps => (
            <div className="center-block" style={{width:236}}>
                <button onClick={renderProps.onClick} style={{background:"transparent",border:"none"}}>
                    <img src="src/icons/facebook-login.png" className="img-responsive"/>
                </button>            
            </div>
            
          )}
        />
    );
  }
}

FacebookComponent.contextTypes = {
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
)(FacebookComponent)


//module.exports = FacebookComponent;