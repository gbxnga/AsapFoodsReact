import React from 'react';
import toast from '../../modules/toast'
import { connect } from 'react-redux'
import { user } from '../../reducers'
import registerUser from '../../actions/registerUser'
import { Link } from 'react-router-dom'


 

const mapStateToProps = state => { return user } ;

const mapDispatchToProps = dispatch => ({
    registerUser(id, username, password, fullname,  email, phone, address, type) {
        return registerUser(id, username, password, fullname,  email, phone, address, type, dispatch)
    }
});

class Register extends React.Component {

    constructor(){
        super()
        this.state = {
            loading: false 
        }
        this.fullnameInput = React.createRef();
        this.passwordInput = React.createRef();
        this.emailInput = React.createRef();
        this.phoneInput = React.createRef();
        this.phoneInput2 = React.createRef();

        this.handleRegister = this.handleRegister.bind(this)
        this._registerUser = this._registerUser.bind(this)
    }
    

    async _registerUser( id, username, password, fullname,  email, phone, address="", type="email"){


        const { registerUser } = this.props

        try {

            this.setState({loading:true})

            const { success, message } = await registerUser(id, username, password, fullname,  email, phone, address, type)

            if(success){
                toast(`Regisstration Successful!`)
            }
            else{
                toast(message)
            }
            this.setState({loading:false})

        }
        catch(error){
            toast(`An Error Occured!`)
            console.error(error)
            this.setState({loading:false})
        }
        

    }
    
        
    handleRegister (e) {
       
           e.preventDefault() 

            const fullname = this.fullnameInput.value
            const password = this.passwordInput.value
            const phone = this.phoneInput.value
            const phone2 = this.phoneInput2.value 
            const email = this.emailInput.value



            var regexPhone = /^\d{11}$/;
            var regexName = /^[a-zA-Z0-9 \.]{3,100}$/;  
            var regexPassword = /^[a-zA-Z_0-9]{5,12}$/;
            var regexEmail = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;


            if (!regexPhone.test(phone)) {
                $('.warning').show().html('Phone number must be 11 digits');
                toast("Phone number invalid!");
                return false;
            } else if (!regexName.test(fullname)) {
                $('.warning').show().html('Username must be 5-12 characters and(or) digits long');
                toast("Name invalid!");
                return false;
            } else if (!regexEmail.test(email)) {
                $('.warning').show().html('Email should be a standard, acceptable email');
                toast("Email invalid!");
                return false;
            } else if (!regexPassword.test(password)) {
                $('.warning').show().html('Password must be 5-12 characters and(or) digits long');
                toast("Password invalid!");
                return false;
            } else if (phone !== phone2){
                $('.warning').show().html('Your phone number and confirmation phone number do not match');
                toast("Phone numbers do not match")
                return;

            } 
            else {
                this._registerUser(0, fullname, password, fullname, email, phone, "", "email" )
            }
           
       } 

    render(){

        const { loading } = this.state
    
        return(
            <div className="register-page page-container" id=" " className="col-md-12" style={{marginTop:"10%", display:"block"}}>

            <div id="landing-page-banner">
                <img width="150 " height="150 " className="center-block " src="src/icons/logo 192.png " />
            </div>

            <form id="register-form" onSubmit={this.handleRegister} action=" " method="post " style={{marginTop:"-35px"}}>
                <p style={{display:"none", width:"90%"}} className="alert alert-warning center-block text-center warning"></p>
                <input ref={input => (this.fullnameInput = input)}  style={styles.inputStyle} autoComplete="off" id="username-input" name="username" type="text" className="center-block" placeholder="Fullname " />
                <input ref={input => (this.phoneInput = input)}  style={styles.inputStyle} autoComplete="off" id="phone-input" name="phone" type="number" className="center-block" placeholder="Phone number " />
                <input ref={input => (this.phoneInput2 = input)}  style={styles.inputStyle} autoComplete="off" id="phone-input-2" name="phone2" type="number" className="center-block" placeholder="Confirm phone number " />
                <input ref={input => (this.emailInput = input)}  style={styles.inputStyle} autoComplete="off" id="email-input-2" name="email" type="email" className="center-block" placeholder="email " />

                <input ref={input => (this.passwordInput = input)}  style={styles.inputStyle}  autoComplete="off" id="password-input-2" name="password" type="password" className="center-block" placeholder="password" />
                <button type="submit" disabled={loading} className="landing-page-btn center-block text-center" id="email-login-btn" style={styles.registerButton} href="#facebook ">
                { loading ? 
                        <span> <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i> Loading...</span>
                        : 
                        'Register'
                    }
                </button>
            </form>
            <p><Link id="dont-have-account-btn " style={{color:"#333333"}} className="text-center center-block" to="login"><span style={{fontSize:13,marginRight:5}} className="glyphicon glyphicon-arrow-left"></span>Back to homepage</Link></p>

            </div>
        )
    }
}

const styles = {
    inputStyle: {
        backgroundColor:"white",
        border:"1px solid #cccccc"
    },
    registerButton: {
        width:"80%",
        border:"none",
        height:44,
        boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)"
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);