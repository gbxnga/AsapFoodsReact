import NavComponent from '../components/NavComponent'
import PropTypes from 'prop-types'
import { NavLink,Link } from 'react-router-dom'
const HomeComponent = ({openNav, closeNav, history,props}) => {
    
    return (
    <div>
    <NavComponent closeNav={closeNav} hide={true}/>
    
    <div className="home-page page-container" style={{marginTop:0,display:"block",height:"100%", position:"absolute",top:0, width:"100%"}}>
    <span id="go-back-btn" className="glyphicon glyphicon-menu-hamburger" style={{color:"#FF4C00",display:"block",padding:5,margin: 3,zoom: 1.6,position: "absolute"}} onClick={()=>openNav()}></span>
    <div style={{height:300, margin:"30% auto", width:300}}>
        <img width="200" height="200" className="center-block" src="src/icons/logo 192.png" />
        <Link  to="kitchens" id="place-order-link" style={{color: "white", backgroundColor:"#FF4C00",padding:10,margin:"90px auto",border:"3px solid #FF4C00",width:220,borderRadius:30}} className="bt center-block text-center">PLACE ORDER!</Link >
    </div>
    <div className="container-fluid">
        

    </div>
    </div>
    </div>
    )
}
HomeComponent.propTypes = {
    openNav : PropTypes.func,
    closeNav : PropTypes.func
}

module.exports = HomeComponent;