
import React, {Component} from 'react'
import { connect } from 'react-redux'
import user from '../../reducers/user'
import loginUser from '../../actions/loginUser'
import toast from '../../modules/toast'
import { Link } from 'react-router-dom'

const mapStateToProps = state => { return user } ;

const mapDispatchToProps = dispatch => ({
    loginUser(username, pass) {
        return loginUser(username,pass, dispatch)
    }
});

class Login extends Component {

    constructor(){
        super()
        this.state = {
            loading: false 
        }
        this.userInput = React.createRef();
        this.passwordInput = React.createRef();

        this.handleLogin = this.handleLogin.bind(this)
        this._loginUser = this._loginUser.bind(this)
    }


    async _loginUser(email, pass){


        const { loginUser } = this.props

        try {

            this.setState({loading:true})

            const success = await loginUser(email, pass)

            if(success){
                toast('Login Successful!')
            }
            else{
                toast('Login Failed!')
            }
            this.setState({loading:false})

        }
        catch(error){
            toast('An Error Occured!')
            this.setState({loading:false})
        }
        

    }
        
    handleLogin(e){
            e.preventDefault() 

            const email = this.userInput.value
            const pass = this.passwordInput.value
            

           var regexPassword = /^[a-zA-Z_0-9]{5,12}$/;
           var regexEmail = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;


           if (!regexEmail.test(email)) {
               $('.warning').show().html('Email should be a standard, acceptable email');
               toast("Email invalid!");
               return false;
           } else if (!regexPassword.test(pass)) {
               $('.warning').show().html('Password must be 5-12 characters and(or) digits long');
               toast("Password invalid!");
               return false;
           } else {
               
               this._loginUser(email,pass) 
           }
           
       } 


    render(){

        const { loading } = this.state

        return(
            <div id="" style={{ marginTop: "10%",display:"block" }} className="login-with-page page-container col-md-12">           

            <div style={{paddingBottom:30} }className="" id="landing-page-banner">
                <img width="150" height="150" className="center-block" src="src/icons/logo 192.png" />
            </div>
            <p style={{display:"none", width:"90%"}} className="alert alert-warning center-block text-center warning"></p>
            <form id="login-form" action="" onSubmit={this.handleLogin} method="post">
                <input ref={input => (this.userInput = input)}  style={{backgroundColor:"white",border:"1px solid #cccccc"}} autoComplete="off" id="email-input" name="email" type="text" className="center-block" placeholder="email" />
                <input ref={input => (this.passwordInput = input) } style={{backgroundColor:"white",border:"1px solid #cccccc"}} autoComplete="off" id="password-input" name="password" type="password" className="center-block" placeholder="password" />
                <button type="submit" disabled={loading} style={{height:44,boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",border:"none"}} className="landing-page-btn center-block text-center" id="email-login-btn" href="#facebook">
                    
                    { loading ? 
                        <span> <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i> Loading...</span>
                        : 
                        'Login'
                    }
                </button>
            </form>
            <div className="col-md-12">
                <h1 style={{fontSize:14}}>OR</h1>
            </div>
            <p><Link to="register" style={{marginTop:15}} id="dont-have-account-btn" className="text-center center-block" href="">Dont have an account?</Link></p>

        </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);