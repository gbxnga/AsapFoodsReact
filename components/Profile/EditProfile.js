import toast from '../../modules/toast'
const EditProfile = ({user={},logoutUser=f=>f, updateProfile=f=>f}) => {
    let _username, _password, _name, _address, _phone, _email
        
    const handleUpdate = e => {
   
       e.preventDefault() 
       var regexPhone = /^\d{11}$/;
       var regexName = /^[a-zA-Z0-9 ]{3,100}$/;
       var regexAddress = /^[a-zA-Z0-9 ,\.\-]{3,100}$/;
       var regexUsername = /^[a-zA-Z0-9]{5,12}$/;
       var regexPassword = /^[a-zA-Z_0-9]{5,12}$/;
       var regexEmail = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;


       if (!regexPhone.test(_phone.value)) {
           $('.warning').show().html('Phone number must be 11 digits');
           toast("Phone number invalid!");
           return false;
       } else if (!regexName.test(_name.value)) {
           $('.warning').show().html('Username must be 5-12 characters and(or) digits long');
           toast("Name invalid!");
           return false;
       } else if (!regexEmail.test(_email.value)) {
           $('.warning').show().html('Email should be a standard, acceptable email');
           toast("Email invalid!");
           return false;
       } else if (!regexPassword.test(_password.value) && user.details.auth_type == "email") {
           $('.warning').show().html('Password must be 5-12 characters and(or) digits long');
           toast("Password invalid!");
           return false;
       }
       else if (!regexAddress.test(_address.value)) {
            $('.warning').show().html('Address must be 3-100 characters and(or) digits long');
            toast("Address invalid!");
            return false;
       } else {
            updateProfile(user.details.id, _name.value, _password.value, _phone.value,_email.value, _address.value, user.details.auth_token)
       }
   } 
   const inputStyle = {
       borderRadius:"0px"
   }

   return (
        <div className="profile-page page-container" style={{display:"block"}}>


        <div className="container">
            <div className="ro">

            <p style={{display:"none", width:"100%"}} className="alert alert-warning center-block text-center warning"></p>
                <div id="" style={{marginTop:20,borderTop:"3px solid #FF4C00",marginBottom:15,padding:"30px 15px",backgroundColor:"white",boxShadow:"0 3px 10px rgba(0,0,0,0.1), 0 3px 4px rgba(0,0,0,0.1)"}} className="col-md-12">
                        <form id="update_profile_form" method="post" action="controller/customercontroller.php" onSubmit={handleUpdate}>
                        <input type="text" hidden="hidden" name="_METHOD" value="PUT"/>
                        <div className="form-group">
                            <label for="fullname">fullname</label>
                            <input style={inputStyle} className="form-control" ref={input => _name = input} type="text" defaultValue={user.details.name} name="fullname" id="profile-name"/>
                        </div>
                        <div className="form-group">
                            <label for="phone">Phone:</label>
                            <input style={inputStyle} className="form-control" type="number" ref={input => _phone = input} defaultValue={user.details.phone} name="phone" id="profile-phone"/>
                        </div>
                        <div className="form-group">
                            <label for="email">Email:</label>
                            <input style={inputStyle} className="form-control" type="email" ref={input => _email = input} defaultValue={user.details.email} name="email" id="profile-email"/>
                        </div>
                        <div className="form-group" style={{display: (user.details.auth_type == "email") ? "block":"none"}}>
                            <label for="password">Password:</label>
                            <input style={inputStyle} className="form-control" type="password" ref={input => _password = input} name="password" id="pwd"/>
                        </div>
                        <div className="form-group">
                            <label for="address">Delivery Address:</label>
                            <textarea style={inputStyle} className="form-control" defaultValue={user.details.address} name="address" ref={input => _address = input} id="profile-address"></textarea>
                        </div>

                        <button id="submit_edit_profile" style={{width:"124px"}} type="submit" className="btn btn-success btn-sm">UPDATE PROFILE</button>

                        </form>
                </div>
            </div>
        </div>
        </div>
   )

}

module.exports = EditProfile;