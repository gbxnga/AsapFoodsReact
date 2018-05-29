import toast from '../../modules/toast'
import { Link } from 'react-router-dom'
const Register = ({registerUser=f=>f}) =>
{
    let _fullname, _password, _email, _phone
        
    const handleRegister = e => {
       
           e.preventDefault() 
            var regexPhone = /^\d{11}$/;
            var regexName = /^[a-zA-Z0-9 \.]{3,100}$/;
            var regexAddress = /^[a-zA-Z0-9 \.]{3,100}$/;
            var regexUsername = /^[a-zA-Z0-9]{5,12}$/;
            var regexPassword = /^[a-zA-Z_0-9]{5,12}$/;
            var regexEmail = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;


            if (!regexPhone.test(_phone.value)) {
                $('.warning').show().html('Phone number must be 11 digits');
                toast("Phone number invalid!");
                return false;
            } else if (!regexName.test(_fullname.value)) {
                $('.warning').show().html('Username must be 5-12 characters and(or) digits long');
                toast("Name invalid!");
                return false;
            } else if (!regexEmail.test(_email.value)) {
                $('.warning').show().html('Email should be a standard, acceptable email');
                toast("Email invalid!");
                return false;
            } else if (!regexPassword.test(_password.value)) {
                $('.warning').show().html('Password must be 5-12 characters and(or) digits long');
                toast("Password invalid!");
                return false;
            } else {
                registerUser(0,_fullname.value, _password.value,_fullname.value, _email.value, _phone.value,"","email")
            }
           
       } 
    return(
        <div className="register-page page-container" id=" " className="col-md-12" style={{marginTop:"10%", display:"block"}}>

        <div id="landing-page-banner">
            <img width="150 " height="150 " className="center-block " src="src/icons/logo 192.png " />
        </div>

        <form id="register-form" onSubmit={handleRegister} action=" " method="post " style={{marginTop:"-35px"}}>
            <p style={{display:"none", width:"90%"}} className="alert alert-warning center-block text-center warning"></p>
            <input ref={input => _fullname = input} style={{backgroundColor:"white",border:"1px solid #cccccc"}} autoComplete="off" id="username-input" name="username" type="text" className="center-block" placeholder="Fullname " />
            <input ref={input => _phone = input} style={{backgroundColor:"white",border:"1px solid #cccccc"}} autoComplete="off" id="phone-input" name="phone" type="number" className="center-block" placeholder="Phone number " />
            <input ref={input => _email = input} style={{backgroundColor:"white",border:"1px solid #cccccc"}} autoComplete="off" id="email-input-2" name="email" type="email" className="center-block" placeholder="email " />

            <input ref={input => _password = input} style={{backgroundColor:"white",border:"1px solid #cccccc"}}  autoComplete="off" id="password-input-2" name="password" type="password" className="center-block" placeholder="password" />
            <button type="submit" className="landing-page-btn center-block text-center" id="email-login-btn" style={{width:"80%",border:"none",height:44,boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)"}} href="#facebook ">Register</button>
        </form>
        <p><Link id="dont-have-account-btn " style={{color:"#333333"}} className="text-center center-block" to="login"><span style={{fontSize:13,marginRight:5}} className="glyphicon glyphicon-arrow-left"></span>Back to homepage</Link></p>

        </div>
    )
}
module.exports = Register;