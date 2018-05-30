import constants from '../../constants/constants';
const KitchenBanner = ({kitchen}) =>
    <div style={{backgroundColor:"white",boxShadow:"0 3px 10px rgba(0, 0, 0, 0.1)",border:"1px solid #e2e6e9", height:275, borderRadius:10,paddingBottom:15,margin:"15px 0"}}>
        <img style={{width:"100%",borderTopLeftRadius:10,borderTopRightRadius:10}} height="180" src={`${constants.site}/src/images/${kitchen.description}-in.jpeg`} />
        <div className="col-xs-12">
            <h3 style={{marginTop:15}}>{kitchen.kitchen}</h3>
            <address style={{fontSize:14}}>{kitchen.address}</address>
        </div>
    </div>

module.exports = KitchenBanner;