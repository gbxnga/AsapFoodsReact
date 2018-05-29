import {NavLink, Redirect, Link} from 'react-router-dom'
const OrderList = ({orders=[]}) => {
    return (
        <div style={{marginTop:70}}>
        {(orders.length < 1) ?
        
        <p>No orders</p>
        

        :
        orders.map(order => 
        <div className="col-md-12" style={{backgroundColor:"white",boxShadow:"0 3px 10px rgba(0,0,0,0.1), 0 3px 4px rgba(0,0,0,0.1)",borderRadius:3,marginBottom:15}}>
            <div className="row">
                <p className="col-md-12" style={{padding:15}}>
                <span className="pull-left">ID: {(order.transaction_ref) ? (order.transaction_ref).toUpperCase() : "none"}</span>

                <span className={`pull-right text-${(order.order_status == 'picked') ? "warning"
                                                        : (order.order_status == 'waiting') ? "danger"
                                                            :  (order.order_status == 'delivered') ? "success" : "info"}`}><strong>{order.order_status.toUpperCase()}</strong></span>
                </p>
                <div className="col-md-12">
                    <hr/>
                </div>
                <p className="col-md-12" style={{padding:15,marginTop:"-15px"}}>
                    <span className="pull-left">Total</span>
                    <span className="pull-right">&#8358;{order.total}</span>
                </p>
                <p className="col-md-12">
                    <span className="pull-left">DATE</span>
                    <span className="pull-right">{order.timeAgo}</span>
                </p>
                <div className="col-md-12">
                    <hr/>
                </div>
                <p className="col-md-12" style={{padding:15,marginTop:"-15px"}}>
                {(order.order_status != "delivered") ?
                    <span className="text-center"><Link to={`view-order/${order.transaction_ref}`} className="center-block text-center">TRACK &VIEW ORDER DETAILS</Link></span>
                    : ""
                }
                </p>
            </div>
            

        </div>
        )
        }
        </div>
        
    )
}

module.exports = OrderList;
