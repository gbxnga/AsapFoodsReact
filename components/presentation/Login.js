import FacebookComponent from '../FacebookComponent'
//import GoogleComponent from '../GoogleComponent'
//import { Redirect } from 'react-router-dom';
import toast from '../../modules/toast'
import { Link } from 'react-router-dom'
const Login = ({history, isLoggedIn=f=>f, user, loginUser=f=>f}) => {
    let _email, _password
        
     const handleLogin = e => {
        
            e.preventDefault() 
            var regexPassword = /^[a-zA-Z_0-9]{5,12}$/;
            var regexEmail = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;


            if (!regexEmail.test(_email.value)) {
                $('.warning').show().html('Email should be a standard, acceptable email');
                toast("Email invalid!");
                return false;
            } else if (!regexPassword.test(_password.value)) {
                $('.warning').show().html('Password must be 5-12 characters and(or) digits long');
                toast("Password invalid!");
                return false;
            } else {
                loginUser(_email.value, _password.value)
            }
            
        } 
        
    
        return(
            <div id="" style={{ marginTop: "10%",display:"block" }} className="login-with-page page-container col-md-12">           

            <div style={{paddingBottom:30} }className="" id="landing-page-banner">
                <img width="150" height="150" className="center-block" src="src/icons/logo 192.png" />
            </div>
            <p style={{display:"none", width:"90%"}} className="alert alert-warning center-block text-center warning"></p>
            <form id="login-form" action="" onSubmit={handleLogin} method="post">
                <input ref={input => _email = input} style={{backgroundColor:"white",border:"1px solid #cccccc"}} autoComplete="off" id="email-input" name="email" type="text" className="center-block" placeholder="email" />
                <input ref={input => _password = input} style={{backgroundColor:"white",border:"1px solid #cccccc"}} autoComplete="off" id="password-input" name="password" type="password" className="center-block" placeholder="password" />
                <button type="submit" style={{height:44,boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",border:"none"}} className="landing-page-btn center-block text-center" id="email-login-btn" href="#facebook">Login</button>
            </form>
            <div className="col-md-12">
                <h1 style={{fontSize:14}}>OR</h1>
            </div>
            

            <p><Link to="register" style={{marginTop:15}} id="dont-have-account-btn" className="text-center center-block" href="">Dont have an account?</Link></p>

        </div>
        )
    
}
module.exports = Login;