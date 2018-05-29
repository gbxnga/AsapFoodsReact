import constants from '../../constants/constants';
const Plate = ({deletePlate=f=>f,plate, deleteBtn=true}) =>{

    
    const items =    $.map(plate.items, (item) => { return [item] })
    return(
    <div id={`plate_${plate.id}`} data-plate-id={plate.id} className={`media-con plate-container-class plate_${plate.id}`} style={{boxShadow: "0 3px 10px rgba(0,0,0,0.1), 0 3px 4px rgba(0,0,0,0.1)",borderRadius:3, marginBottom:15,padding:15, backgroundColor:"white",paddingTop:7}}>
        <img style={{marginTop:0}} width="25" height="25" src={`${constants.site}/src/images/tray.png`}/>
        {(deleteBtn) ? <span id={`btn_delete_plate_${plate.id}`} onClick={()=>deletePlate()} data-plate-id={`${plate.id}`} className="glyphicon glyphicon-trash delete-plate-btn" style={{display:"block",cursor:"pointer",float:"right", padding:"4px 1px", zoom:"130%"}}></span>:""}

        <p>Kitchen: {plate.kitchen}</p>
        {(items.length == 0) ? "No item" : items.map((item) => 
            <div className="media" style={{height:40}} id="">
            <div className="media-left">
                <a href="#"></a>
            </div>
            <div className="media-body">
                <h1 className="media-heading">{item.name}</h1>
                <div className="lower-order-details">
                    <div className="lower-order-details-left">
                        <p style={{marginTop:-10,marginBottom:"-10px"}}>Quantity : {item.quantity}</p>
                        <p>Price : &#8358;{item.price}</p>
                        </div>
                            <div className="lower-order-details-right">
                            <p style={{textAlign:"right",marginTop:"-10px"}}> Total : &#8358;{item.item_total}</p>
                        </div>
                    </div>
                </div>
            </div>

        )
        }
        <input type="text" className="sub_total_value valid" value={plate.sub_total} hidden="hidden"/>
    </div>
    )
}

module.exports = Plate;