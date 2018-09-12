import { NavLink,Link } from 'react-router-dom'

import ComponentWithHeader from '../componentWithHeader'
export default _ => {
    
    return (
        <ComponentWithHeader 
        headerProps={{
            title:"",
            showBack:false,
            
        }}
        hideHeader={true}
        Component={ () => <div className="home-page page-container" style={{marginTop:0,display:"block",height:"100%", position:"absolute",top:0, width:"100%"}}>
        
        <div style={{height:300, margin:"30% auto", width:300}}>
            <img width="150" height="150" className="center-block" src="src/icons/logo 192.png" />
            <Link  to="kitchens" id="place-order-link" style={{color: "white", backgroundColor:"#FF4C00",padding:10,margin:"90px auto",border:"3px solid #FF4C00",width:220,borderRadius:30}} className="bt center-block text-center">PLACE ORDER!</Link >
        </div>
        <div className="container-fluid">
            
    
        </div>
        </div>}
    />
    
    )
} 