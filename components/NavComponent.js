import React from 'react'
import { connect } from 'react-redux'
import user from '../reducers/user'
import logoutUser from '../actions/logoutUser'
import { NavLink, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import PushComponent from './PushComponent'
import constants from '../constants/constants';


const mapStateToProps = state => {
    return {
        
      user: state.user
      
    }
};
const mapDispatchToProps = dispatch => ({
    logoutUser() {
        return logoutUser(dispatch)
    }
})

class NavComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            hidden: (props.hide) ? props.hide : true 
        }
    }
    componentDidMount(){
        //console.log(this.context.store.getState())
    }
    componentWillUnmount(){
        //const {closeNav} = this.context
        //const done = this.deferUnmount();
        console.log('closing nav')
        //this.context.closeNav(done);
    }

    /*
     * It will be invoked when the properties have been changed by the parent, 
     * and those changed properties can be used to modify the state internally:
     * When the parent component, HiddenMessages, changes the property for hide, 
     * componentWillReceiveProps allows us to update the state.
    */
    componentWillReceiveProps(nextProps) {
        this.setState({hidden: nextProps.hide})
    }

    closeNav(done=f=>f){
        $('#cover').hide();
        $('#mySidenav').animate({
            "margin-left": "-80%"
        }, 10);
        done();

    }
    
    render(){
        const {hidden} = this.state
        
        const {logoutUser} = this.props
        const {user} = this.props
        
    return(
        <div>
        <div onClick={()=>this.closeNav()} id="cover" style={{display:"none"}}>

        </div>
        <div id="load" style={{display:"none"}}>
            <div id="loading-image" className="loader">
                <svg viewBox="0 0 32 32" width="32" height="32">
                <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
                </svg>
            </div>
        </div>
    
        <div id="mySidenav" style={{opacity:0.86,background: "linear-gradient(to bottom right,#ff4c00,#ff5e1a, #ff7033)",zIndex:100000000000000000000,width:"80%",marginLeft:"-80%"}} className="sidenav mySidenav shadow">
    
            <div style={{color:"white",height: 150,width:"100%",padding:"10px 30px"}}>
                <img src={`${constants.site}/src/icons/profile5.png`} width="50" height="50" style={{borderRadius:30,float: "left",clear: "right",marginRight: 10,marginTop:  20}} />
                <span style={{float: "left",clear:"both", marginTop:15}} className="customerName text-center">{user.details.name}</span>
            </div>
            <div style={{height:30,backgroundColor:"white",padding:"5px 15px 5px 35px", backgroundColor:"#e64500"}}>
                <span style={{color:"white"}} className="pull-left">Orders</span>
                <span style={{backgroundColor:"white", color:"red"}} className="pull-right badge badge-pill badge-default num-orders">{user.details.orders || 0}</span>
            </div>
    
    
    
            <Link to="./" style={{marginTop:40}}><img style={{marginRight:10,marginLeft:10}} src={`${constants.site}/src/icons/home3.png`} width="45" height="40" />
                <span style={{color:"white"}}>Home</span></Link>
    
            <Link to="profile"><img style={{marginLeft:5,marginRight:10}} src={`${constants.site}/src/icons/profile3.png`} width="50" height="60" />
                <span style={{color:"white"}}>Profile</span></Link>
            <Link to="my-orders"><img style={{marginRight:5}} src={`${constants.site}/src/icons/orders3.png`} width="60" height="60" />
                <span style={{color:"white"}}>Orders</span></Link>
            <Link to="contact-us"><img style={{marginRight:10}} src={`${constants.site}/src/icons/support3.png`} width="55" height="55" />
                <span style={{color:"white"}}>Contact Us</span></Link>
    
            
    
    
            <Link onClick={()=>logoutUser()} to="/" style={{color:"white"}} >
                <span style={{fontSize: "200%",marginTop:15,padding:10,marginRight:20,color:"#cc3d00"}} className="glyphicon glyphicon-log-out"></span><span style={{position:  "relative",top: "-8"}}>Logout</span></Link>
    
        </div>
        </div>
    )
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( NavComponent )