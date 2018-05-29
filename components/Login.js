import React from 'react'
class Login extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            'hi':"hi"
        }
    }
        
     handleLogin(e) {
            e.preventDefault() 
            //onNewColor(_title.value, _color.value) 
            loginUser(_username.value, _password.value)
            //_title.value = ''
            //_color.value = '#000000' 
            //_title.focus()
    }
    
    render(){
        return(
            <div id="" style={{ marginTop: "10%",display:"block" }} className="login-with-page page-container col-md-12">           

            <div style={{paddingBottom:30} }className="" id="landing-page-banner">
                <img width="150" height="150" className="center-block" src="src/icons/logo 192.png" />
            </div>
            <form id="login-form" action="" onSubmit={this.handleLogin} method="post">
                <input ref="_username" style={{backgroundColor:"white",border:"1px solid #cccccc"}} autoComplete="off" id="email-input" name="username" type="text" className="center-block" placeholder="username" />
                <input ref="_pass" style={{backgroundColor:"white",border:"1px solid #cccccc"}} autoComplete="off" id="password-input" name="password" type="password" className="center-block" placeholder="password" />
                <button type="submit" style={{height:44,boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",border:"none"}} className="landing-page-btn center-block text-center" id="email-login-btn" href="#facebook">Login</button>
            </form>
            <div className="col-md-12">
                <h1 style={{fontSize:14}}>OR</h1>
            </div>

            <div className="center-block" style={{width:236}}>
                <div  className="fb-login-button center-block" data-max-rows="1" data-size="large" data-button-type="login_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="true"></div>
            </div>
            <div className="center-block" style={{width:236}}>
                <div style={{marginTop:15}} className="g-signin2" data-width="236" data-onsuccess="onSignIn"></div>
            </div>

            <p><a href="#!/register" style={{marginTop:15}} id="dont-have-account-btn" className="text-center center-block" href="">Dont have an account?</a></p>

        </div>
        )
    }
}
module.exports = Login;

