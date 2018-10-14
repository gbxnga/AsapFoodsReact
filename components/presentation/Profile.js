import { Link } from 'react-router-dom'
import PushComponent from '../PushComponent'
const Profile = ({ user={},logoutUser=f=>f, updateProfile=f=>f}) => {
        


   return (
        <div className="profile-page page-container" style={{display:"block"}}>


        <div className="container">
            <div className="ro">
                <div id="" style={{marginBottom:15,padding:"30px 15px",backgroundColor:"white",boxShadow:"0 3px 10px rgba(0,0,0,0.1), 0 3px 4px rgba(0,0,0,0.1)"}} className="col-md-12">
                    <img className="center-block" src="src/icons/profile.png" width="80" height="80"/>
                    <p style={{padding:15}} className="text-center customerName">{user.details.name}</p>
                    
                    <Link to='edit-profile' id="edit_profile_btn" style={{width:100}} className="btn btn-success btn-sm center-block"><span className="fa fa-pencil-square-o"></span>Edit Profile</Link>
                </div>
                <div id="" style={{marginBottom:15,padding:"30px 15px",backgroundColor:"white",boxShadow:"0 3px 10px rgba(0,0,0,0.1), 0 3px 4px rgba(0,0,0,0.1)"}} className="col-md-12">
                    <Link to="/my-orders" style={{color:"black"}}><strong>Mr orders</strong><br/>
                    <p> You have <span className="num-orders">{user.details.orders}</span> orders</p></Link>
                    <hr/>
                    <strong>Delivery Addresses: </strong><br/>
                    <p id="prof-address"> {user.details.address}</p>
                    <hr/>
                    <strong style={{marginBottom:15}}>User Information: </strong><br/>
                    <p style={{marginTop:10}}> <strong>Name:</strong> <span id="prof-name">{user.details.name}</span></p>
                    <p><strong>Phone:</strong> <span id="prof-phone">{user.details.phone}</span></p>
                    <p> <strong>E-mail:</strong> <span id="prof-email">{user.details.email} </span></p>

                    <PushComponent />
                </div>
                <div onClick={()=>logoutUser()} id="" style={{display:"block",padding:"30px 15px",marginBottom:15,backgroundColor:"white",boxShadow:"0 3px 10px rgba(0,0,0,0.1), 0 3px 4px rgba(0,0,0,0.1)"}} className="text-center col-md-12">
                    <button className="btn btn-danger"><span className="fa fa-sign-out"></span>Logout</button>

                </div>
            </div>
        </div>
        </div>
   )

}

module.exports = Profile;