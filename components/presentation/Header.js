import { Link } from 'react-router-dom'
import constants from '../../constants/constants';
const Header = ({title='ASAPFoods',openNav=f=>f, showBack=false}) => 
    <header className="shadow" style={{heigh:100, display:"block",boxShadow:" 0 3px 5px rgba(57, 63, 72, 0.3)"}}>
        <div id="left"><img style={{zoom:"85%",marginTop:5}} className="invert" width="40" height="40" onClick={()=> (showBack) ? window.history.back() : openNav()} src={`${constants.site}/src/${(showBack) ? 'icons/back':'images/menu'}.png`} /></div>
        <div id="center" style={{textAlign:"center",width:"60%"}}>
            <h4 id="header-title" style={{lineHeight:1.5,fontSize:18}}>{title}</h4>
        </div>
        {(!showBack) ? 
        <div className="pulse" id="right">
            <Link to="checkout">
                <svg style={{marginTop:2}} width="40" height="40" viewBox="0 0 22 19" xmlns="http://www.w3.org/2000/svg">
                <title>BAD20536-6E04-4FF9-869D-9299F4FB724D</title><path d="M.785 2.123h2.249l3.204 11.04a.78.78 0 0 0 .758.548h9.847a.789.789 0 0 0 .72-.449l3.583-7.85a.726.726 0 0 0-.066-.71.79.79 0 0 0-.653-.336H9.547c-.432 0-.785.336-.785.747 0 .412.353.748.784.748h9.677l-2.903 6.355H7.585L4.38 1.176a.78.78 0 0 0-.759-.548H.785C.353.628 0 .964 0 1.375c0 .412.353.748.785.748zM6.25 18.97c.982 0 1.78-.76 1.78-1.695s-.798-1.695-1.78-1.695c-.98 0-1.778.76-1.778 1.695 0 .934.798 1.694 1.779 1.694zm11.117 0h.13a1.808 1.808 0 0 0 1.216-.587 1.64 1.64 0 0 0 .432-1.233c-.065-.922-.915-1.632-1.896-1.57-.98.062-1.713.885-1.648 1.807.065.884.837 1.582 1.766 1.582z" fill="#FFF" fillRule="evenodd"></path>
                </svg>
            </Link>
            
        </div> :
        <span></span>
        }
    </header>


module.exports = Header;