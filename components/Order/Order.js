import Plate from '../Plate/Plate'
const Order = ({order={}}) =>
{
    let plates = JSON.parse(order.content).data
    console.log(plates)
    let myObj = plates
            
    plates = $.map(myObj, function(value, index) {
        return [value];
    });

    let lineClassWaitingStyle = {
        stroke: "rgba(162, 164, 163, 0.37)",
        strokeWidth:5
    }
    let cicle1circle2WaitingFill = 'rgba(162, 164, 163, 0.37)'
return(
<div className="view-order-page" style={{marginTop:70}}>


<div className="modal fade" id="orderModal" role="dialog">
    <div className="modal-dialog modal-lg">
        <div className="modal-content">
            <div className="modal-header" style={{backgroundColor: "#FF4C00",color:"white"}}>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title" style={{color:"white"}}>Order contents</h4>
            </div>

            <div id="order-content-details" style={{maxHeight: 400,overflow: "scroll"}} className="modal-body">
                    {
                        
                        plates.map(plate=><Plate key={plate.id} deleteBtn={false} plate={plate}/>)
                    }
            </div>
            <div className="modal-footer">
                <button id="view-order-close-btn" type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>


<div className="col-md-12">
    <div style={{boxShadow:"0 3px 10px rgba(0,0,0,0.1), 0 3px 4px rgba(0,0,0,0.1)", backgroundColor:"white",padding:15,borderRadius:3}}>

        <ul className="list-unstyled">
            <li><strong>Name:</strong> <span id="view-order-name">{order.fullname}</span></li>
            <li><strong>Phone:</strong> <span id="view-order-phone">{order.phone}</span></li>
            <li><strong>Address:</strong> <span id="view-order-address">{order.address}</span></li>
            <li><strong>Payment:</strong> <span id="view-order-payment">{order.payment}</span></li>
            <li><strong>Status:</strong> <span id="view-order-status" className="badge badge-danger">{order.order_status}</span></li>
            <button id="view-items-btn" style={{border:"none",marginTop:15,backgroundColor:"#ff5e1a"}} type="button" className="btn btn-info btn-sm" data-toggle="modal" data-target="#orderModal">View Items</button>

        </ul>

    </div>

</div>
<div className="col-md-12">
    <div className="Timeline">

        <svg height="5" width="100">
        <line x1="0" y1="0" x2="200" y2="0" style={{stroke:"#FF4C00",strokeWidth:5}} />
        Sorry, your browser does not support inline SVG.
      </svg>

        <div className="event1">

            <div id="bubble1" className="event1Bubble">
                <div className="eventTitle">waiting</div>
            </div>
            <svg height="20" width="20">
             <circle cx="10" cy="11" r="5" fill="#FF4C00" />
           </svg>
            <div id="view-order-date-created" className="time">{order.created_at_ago}</div>

        </div>

        <div id="waiting-position" className="order-position">

        </div>

        <svg height="5" width="250">
        <line className="lines" id="line1"  x1="0" y1="0" x2="300" y2="0" style={{stroke:`${(order.order_status == "picked" || order.order_status == "delivered") ? "#FF4C00"
                                                                                            :(order.order_status=="waiting") ? 'rgba(162, 164, 163, 0.37)' 
                                                                                            : ""
                                                                                          }`
                                                                                ,strokeWidth:5}} />
        Sorry, your browser does not support inline SVG.
      </svg>



        <div className={`event2 ${(order.order_status == 'waiting') ? "futureGray":""}`}>

            <div id="bubble2" className={`event2Bubble ${(order.order_status == 'waiting') ? "futureOpacity":""}`}>
                <div className="eventTitle">Picked</div>
            </div>
            <svg height="20" width="20">
          <circle className="circles" id="circle1" cx="10" cy="11" r="5" fill={`${(order.order_status == "picked" || order.order_status == "delivered") ? "#FF4C00" :"rgba(162, 164, 163, 0.37)" }`} />
          </svg>
            <div id="view-order-date-picked" className="time2">{
                (order.order_status == 'picked' || order.order_status == 'delivered') ? order.date_picked_ago : ""
            }</div>
        </div>

        <svg height="5" width="50">
        <line className="lines" id="line2"  x1="0" y1="0" x2="50" y2="0" style={{stroke:`${( order.order_status == "delivered") ? "#FF4C00"
                                                                                            :(order.order_status == "picked" ||order.order_status=="waiting") ? 'rgba(162, 164, 163, 0.37)' 
                                                                                            : ""
                                                                                          }`
                                                                                ,strokeWidth:5}} />
        Sorry, your browser does not support inline SVG.
      </svg>

        <div id="picked-position" className="order-position">

        </div>


        <svg height="5" width="150">
        <line className="lines" id="line3"  x1="0" y1="0" x2="150" y2="0" style={{stroke:`${(order.order_status == "delivered") ? '#FF4C00'
                                                                                            :'rgba(162, 164, 163, 0.37)'
                                                                                          }`
                                                                                ,strokeWidth:5}} />
        Sorry, your browser does not support inline SVG.
      </svg>
        <div className={`event3 ${(order.order_status == 'waiting') ? "futureGray":""}`}>
            <div id="bubble3" className={`event1Bubble ${(order.order_status == 'waiting') ? "futureOpacity":""}`}>
                <div className="eventTitle">Delivered</div>
            </div>
            <svg height="20" width="20">
          <circle className="circles" id="circle2" cx="10" cy="11" r="5" fill={`${(order.order_status == "delivered") ? '#FF4C00':'rgba(162, 164, 163, 0.37)'}`} />
          </svg>
            <div id="view-order-date-delivered" className="time">{
                (order.order_status == 'waiting') ? "" : 
                (order.order_status == 'picked') ? "" : order.date_delivered_ago
            } </div>
        </div>
        <svg height="5" width="50">
      <line className="lines" id="line4"  x1="0" y1="0" x2="50" y2="0" style={{stroke:`${(order.order_status == "delivered") ? '#FF4C00'
                                                                                            :'rgba(162, 164, 163, 0.37)'
                                                                                          }`
                                                                                ,strokeWidth:5}} /> 
      </svg>
        <div id="delivered-position" className="order-position">

        </div>

      <svg height="20" width="42">
        <line x1="1" y1="0" x2="1" y2="20" style={{stroke:`${(order.order_status == 'delivered')?"#FF4C00":'rgba(162, 164, 163, 0.37)'}`,strokeWidth:2}} /> 
        <circle cx="11" cy="10" r="3" fill={`${(order.order_status == 'delivered')?"#FF4C00":'rgba(162, 164, 163, 0.37)'}`} />  
        <circle cx="21" cy="10" r="3" fill="#FF4C00" />  
        <circle cx="31" cy="10" r="3" fill="#FF4C00" />    
        <line x1="41" y1="0" x2="41" y2="20" style={{stroke:"#FF4C00",strokeWidth:2}} /> 
      </svg>



    </div>
</div>
<div className="col-md-12">
    <div style={{backgroundColor:"white",borde:"1px solid #e2e6e9",boxShadow:"0 3px 10px rgba(0,0,0,0.1), 0 3px 4px rgba(0,0,0,0.1)",marginBottom:70,border:"none"}} className="table">
        
        <div className="table-row">
            <div className="table-col right "><strong>Grand Total</strong></div>
            <div id="view-order-grandtotal" className="table-col left "><strong>&#8358;{order.total}</strong></div>
        </div>
    </div>
</div>
</div>
)
}

module.exports = Order;