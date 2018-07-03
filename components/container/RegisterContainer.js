import React, {
    Component
} from 'react'
import Register from '../presentation/Register'
import {
    connect
} from 'react-redux'
import user from '../../reducers/user'
import registerUser from '../../actions/registerUser'
import C from '../../constants/constants';
import toast from '../../modules/toast'
import {
    Link
} from 'react-router-dom'
import axios from "axios";
class RegisterContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            password: '',
            email: '',
            phone: '',
            validationCode:'',
            isValidatingPhoneNumber: false,
            warning: '',
            loading: false

        }
        this.textInput = React.createRef();
        this._registerUser = this._registerUser.bind(this)
        this._validateParameters = this._validateParameters.bind(this)
        this._sendValidationCode = this._sendValidationCode.bind(this)
        this._validateSentCode = this._validateSentCode.bind(this)


    }
    
    _sendValidationCode(phone, name) {

        let formData = new FormData();

        formData.append("phone", phone);
        formData.append("name", name);

        axios.post(C.VALIDATE_PHONE_NUMBER_API, formData)
            .then(response => {
                console.log(response)
                return response
            })
            .then(json => {
                if (json.data.success) {
                    this.setState({
                        isValidatingPhoneNumber: true
                    })
                    $("#register-form button").removeAttr("disabled").html('Complete Registration');
                    
                }
                else{
                    toast(`Couldn't send code to ${phone}`)
                    $("#register-form button").removeAttr("disabled").html('Register');
                }
                
            })
            .catch((error) => {
                //return false
                toast('An Error Occured! Please try again')
                $("#register-form button").removeAttr("disabled").html('Register');
                console.log(`${formData} ${error}`)
            });
    }

    _validateSentCode(e) {

        e.preventDefault()
        $('#register-form button').attr("disabled", "disabled").html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>');


        const {name, password, email, phone, validationCode} = this.state
        //const validationCode = this.textInput 

        let formData = new FormData();

        formData.append("code", validationCode);
        formData.append("phone", phone);

        axios.post(C.VALIDATE_SENT_CODE_API, formData)
            .then(response => {
                console.log(response)
                return response
            })
            .then(json => {
                if (json.data.success) {
                    // register the user
                    this.props.registerUser(0,name, password,name, email, phone,"","email")
                }
                else{
                    toast(`Couldn't validate code`)
                }
                $("#register-form button").removeAttr("disabled").html('Complete Registration');
            })
            .catch((error) => {
                //return false
                toast('An Error Occured! Please try again')
                console.log(`${formData} ${error}`)
                $("#register-form button").removeAttr("disabled").html('Complete Registration');
            });



    }
    _registerUser(e) {
        e.preventDefault()
        $('#register-form button').attr("disabled", "disabled").html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>');
        const {
            name,
            password,
            email,
            phone
        } = this.state

        if (!this._validateParameters(name, password, email, phone)) {
            $("#register-form button").removeAttr("disabled").html('Register');
            return
        };

        //this.setState({loading:true})
        this._sendValidationCode(phone, name)


        //registerUser(0,name, password,name, email, phone,"","email")

    }

    _validateParameters(name, password, email, phone) {

        var regexPhone = /^\d{11}$/;
        var regexName = /^[a-zA-Z0-9 \.]{3,100}$/;
        var regexAddress = /^[a-zA-Z0-9 \.]{3,100}$/;
        var regexUsername = /^[a-zA-Z0-9]{5,12}$/;
        var regexPassword = /^[a-zA-Z_0-9]{5,12}$/;
        var regexEmail = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;


        if (!regexPhone.test(phone)) {
            this.setState({
                warning: 'Phone number must be 11 digits'
            });
            toast("Phone number invalid!");
            return false;
        } else if (!regexName.test(name)) {
            this.setState({
                warning: 'Username must be 5-12 characters and(or) digits long'
            });
            toast("Name invalid!");
            return false;
        } else if (!regexEmail.test(email)) {
            this.setState({
                warning: 'Email should be a standard, acceptable email'
            });
            toast("Email invalid!");
            return false;
        } else if (!regexPassword.test(password.value)) {
            this.setState({
                warning: 'Password must be 5-12 characters and(or) digits long'
            });
            toast("Password invalid!");
            return false;
        } else
            return true
    }
    _handleChange(inputName, e) {
        console.log(inputName, e.target.value);

        switch (inputName) {
            case 'name':
                this.setState({
                    name: e.target.value
                })
                break;
            case 'phone':
                this.setState({
                    phone: e.target.value
                })
                break;
            case 'password':
                this.setState({
                    password: e.target.value
                })
                break;
            case 'email':
                this.setState({
                    email: e.target.value
                })
                break;
            case 'validationCode':
                this.setState({
                    validationCode: e.target.value
                })
                break;

        }
    }


    render(){
        /*return(

                <Register registerUser={registerUser}/>
            
        )*/
        //let _code;
        const {name, password, phone, email, isValidatingPhoneNumber, validationCode, warning} = this.state
        
       
        console.log(JSON.stringify(this.state))
        return(
            (isValidatingPhoneNumber) ?

            <div className="register-page page-container" id=" " className="col-md-12" style={{marginTop:"10%", display:"block"}}>
    
            <div id="landing-page-banner">
                <img width="150 " height="150 " className="center-block " src="src/icons/logo 192.png " />
            </div>
    
            <form id="register-form" onSubmit={e => this._validateSentCode(e)} action=" " method="post " style={{marginTop:"-35px"}}>
                <p style={{display:"none", width:"90%"}} className="alert alert-warning center-block text-center warning"></p>
                <p style={{display:"block", width:"90%"}} className="alert alert-info center-block text-center warning">Enter the 5 digit code sent to <strong>{phone}</strong></p>

                <input style={{backgroundColor:"white",border:"1px solid #cccccc",display:"none"}} id="code-input" name="codee"  type="text" className="center-block" placeholder="Validation Code " />
                <input onChange={this._handleChange.bind(this, 'validationCode')} value={validationCode} style={{backgroundColor:"white",border:"1px solid #cccccc"}} id="code-input" name="code" type="text" className="center-block" placeholder="Validation Code " />
                <button type="submit" className="landing-page-btn center-block text-center" id="email-login-btn" style={{width:"80%",border:"none",height:44,boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)"}} href="#facebook ">Complete Registration</button>
            </form>
            <p><Link id="dont-have-account-btn " style={{color:"#333333"}} className="text-center center-block" to="login"><span style={{fontSize:13,marginRight:5}} className="glyphicon glyphicon-arrow-left"></span>Back to homepage</Link></p>
    
            </div>
            :
            <div className="register-page page-container" id=" " className="col-md-12" style={{marginTop:"10%", display:"block"}}>
    
            <div id="landing-page-banner">
                <img width="150 " height="150 " className="center-block " src="src/icons/logo 192.png " />
            </div>
    
            <form id="register-form" onSubmit={e => this._registerUser(e)} action=" " method="post " style={{marginTop:"-35px"}}>
                <p style={{display:"none", width:"90%"}} className="alert alert-warning center-block text-center warning">{warning}</p>
                <input onChange={this._handleChange.bind(this, 'name')} style={{backgroundColor:"white",border:"1px solid #cccccc"}} defaultValue={name} autoComplete="off" id="username-input" name="username" type="text" className="center-block" placeholder="Fullname " />
                <input onChange={this._handleChange.bind(this, 'phone')}  defaultValue={phone} style={{backgroundColor:"white",border:"1px solid #cccccc"}} autoComplete="off" id="phone-input" name="phone" type="number" className="center-block" placeholder="Phone number " />
                <input onChange={this._handleChange.bind(this, 'email')} defaultValue={email} style={{backgroundColor:"white",border:"1px solid #cccccc"}} autoComplete="off" id="email-input-2" name="email" type="email" className="center-block" placeholder="email " />
    
                <input onChange={this._handleChange.bind(this, 'password')} defaultValue={password} style={{backgroundColor:"white",border:"1px solid #cccccc"}}  autoComplete="off" id="password-input-2" name="password" type="password" className="center-block" placeholder="password" />
                <button type="submit" className="landing-page-btn center-block text-center" id="email-login-btn" style={{width:"80%",border:"none",height:44,boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)"}} href="#facebook ">Register</button>
            </form>
            <p><Link id="dont-have-account-btn " style={{color:"#333333"}} className="text-center center-block" to="login"><span style={{fontSize:13,marginRight:5}} className="glyphicon glyphicon-arrow-left"></span>Back to homepage</Link></p>
    
            </div>
        )
    }
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
                registerUser(id,username, password,name, email, phone, address,type,dispatch)
            }
        })
)(RegisterContainer)
//module.exports = RegisterContainer;