import React, { Component } from 'react';
import toast from '../../modules/toast';

export default class Form extends Component{

constructor(props) {
    super(props)
    this.state = {

        replaceItemIfUnavailable: true,
        cancleItemIfUnavailable: false,
        cancleOrderIfUnavailable: false,
        payOnline: true,
        payOnDelivery: false
    }
    this.userInput = React.createRef();
    this.userPhone = React.createRef();
    this.userAddress = React.createRef();
    this.handleProcessOrder = this
        .handleProcessOrder
        .bind(this);
    this.onRadioChanged = this
        .onRadioChanged
        .bind(this);
}
onRadioChanged(option = 1) {
    switch (option) {

        case 1:
            this.setState({replaceItemIfUnavailable: true, cancleItemIfUnavailable: false, cancleOrderIfUnavailable: false});
            break;
        case 2:
            this.setState({replaceItemIfUnavailable: false, cancleItemIfUnavailable: true, cancleOrderIfUnavailable: false});
            break;
        case 3:
            this.setState({replaceItemIfUnavailable: false, cancleItemIfUnavailable: false, cancleOrderIfUnavailable: true});
            break;

    }
}

handleProcessOrder(e) {
    e.preventDefault();

    const name = this.userName.value;
    const phone = this.userPhone.value;
    const address = this.userAddress.value;

    let regexPhone = /^\d{11}$/;
    let regexName = /^[a-zA-Z0-9 ]{3,100}$/;
    let regexAddress = /^[a-zA-Z0-9 ,\.\-]{3,100}$/;

    if (!regexPhone.test(phone)) {
        $('.warning')
            .show()
            .html('Phone number must be 11 digits');
        toast("Phone number invalid!");
        return false;
    } else if (!regexName.test(name)) {
        $('.warning')
            .show()
            .html('Username must be 5-12 characters and(or) digits long');
        toast("Name invalid!");
        return false;
    } else if (!regexAddress.test(address)) {
        $('.warning')
            .show()
            .html('Address must be 3-100 characters and(or) digits long');
        toast("Address invalid!");
        return false;
    } else if ($("#selectArea").val() == "none") {
        toast("Please select the area!");
        return false;

    } else {
        this
            .props
            .processOrder();
    }
}

    render(){

        const { 
            transaction_ref="",
            verifyingCoupone=false,
            processingRequest=false,
            delivery_charge=0, 
            grand_total=0, 
            sub_total=0,
            user={}, 
            processOrder=f=>f, 
            verifyCoupone=f=>f, 
            _updateAreaCharge=f=>f } = this.props
        
        const { cancleItemIfUnavailable, cancleOrderIfUnavailable, replaceItemIfUnavailable, payOnDelivery, payOnline } = this.state

        return (<form style={{fontSize:14}} id="place_order_form" action="mail.php" method="POST" >
        <div style={{height:360,paddingBottom:15,border:"1px solid #e2e6e9",borderTop:"3px solid #FF4C00",boxShadow: "0 3px 10px rgba(0,0,0,0.1), 0 3px 4px rgba(0,0,0,0.1)",borderRadius:3, marginBottom:15, marginTop:15, backgroundColor:"white"}}>
            <div id="additional-comment-div" style={{marginTop:15}}>
                
                    <input type="text" hidden="hidden" name="auth_token" value="" id="auth_token_id" />
                    <input type="text" hidden="hidden" name="transaction_ref" value={`${transaction_ref}`} id="transaction_ref" />
                    <input type="text" hidden="hidden" name="transaction_total" value="" id="transaction_total" />
                    <input autoComplete="off" ref={input => (this.userName = input)}   defaultValue={`${user.details.name}`} id="checkout-names" style={{fontSize:14}} name="name" className="center-block" type="text" placeholder="Name" />
                    <input autoComplete="off" ref={input => (this.userPhone = input)}  defaultValue={`${user.details.phone}`}  id="checkout-phone" style={{fontSize:14}} name="phone" className="center-block" type="text" placeholder="Phone Number" />
                    <textarea id="checkout-address" ref={input => (this.userAddress = input)}  defaultValue={`${user.details.address}`}  placeholder="Address" name="address" className="center-block" style={{height:80, padding:10,width:"90%",fontSize:14, border:"none",borderBottom:"1px solid #cccccc"}}/>
                    
                    <select id="selectArea" onChange={_updateAreaCharge} name="area" style={styles.selectAreaInput}><option value="none">Select Area</option>
                        <option value="southGate">South gate</option>
                        <option value="northGate">North gate</option>
                    </select>
                    <input autoComplete="off"   style={{fontSize:14,marginLeft:20}} name="comment" className="center-block" type="text" placeholder="Additional Comment..." />
                    
                    <div className="col-md-12" style={{marginLeft: 5,paddingBottom: 15}}><input id="coupone" autoComplete="off" style={{fontSize:14,float: "left",width: "50%"}} name="discount" className="center-block" type="text" placeholder="Discount Code(if any).."/>
                            <button disabled={verifyingCoupone} id="verify-coupone-btn" type="button" onClick={verifyCoupone} className="btn btn-sm" style={styles.verifyCouponeButton}>
                            {
                                verifyingCoupone ?
                                <span> <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i> Verifying...</span>:
                                "USE CODE"
                            } 
                            
                            </button>
                    </div>
                
            </div>
        </div>
        <div style={{backgroundColor:"white",boxShadow: "0 3px 10px rgba(0,0,0,0.1), 0 3px 4px rgba(0,0,0,0.1)",border:"none"}} className="table">
            <div className="table-row" style={{height:46}}>
                <div className="table-col right" style={{width:"76%"}}>Replace item(s) if unavailable</div>
                <div className="table-col left" style={{width:"23%"}}>
                    <ul style={{margin:0,width:"50%"}} className="tg-list">
                        <li className="tg-list-item">


                            <input onChange={()=>this.onRadioChanged(1)} autoComplete="off" name="replace_item" className="tgl tgl-ios" id="cb2" value="1" type="radio" checked={replaceItemIfUnavailable}/>
                            <label style={{float:"left"}} className="tgl-btn" htmlFor="cb2"></label>
                            <span style={{fontSize:"110%",marginLeft:15}}></span>
                        </li>
                    </ul>
                </div>

            </div>
            <div className="table-row" style={{height:46}}>
                <div className="table-col right" style={{width:"76%"}}>Cancel item(s) if unavailable</div>
                <div className="table-col left" style={{width:"23%"}}>
                    <ul style={{margin:0,width:"50%"}} className="tg-list">
                        <li className="tg-list-item">

                            <input onChange={()=>this.onRadioChanged(2)}  autoComplete="off" name="replace_item" className="tgl tgl-ios" id="cb1" value="2" type="radio" checked={cancleItemIfUnavailable} />
                            <label style={{float:"left"}} className="tgl-btn" htmlFor="cb1"></label>
                            <span style={{fontSize:"110%",marginLeft:15}}></span></li>
                    </ul>
                </div>

            </div>
            <div className="table-row" style={{height:46}}>
                <div className="table-col right" style={{width:"76%"}}>Cancel order if item(s) unavailable</div>
                <div className="table-col left" style={{width:"23%"}}>
                    <ul style={{margin:0,width:"50%"}} className="tg-list">
                        <li className="tg-list-item">

                            <input onChange={()=>this.onRadioChanged(3)}  autoComplete="off" name="replace_item" className="tgl tgl-ios" id="cb5" value="3" type="radio" checked={cancleOrderIfUnavailable} />
                            <label style={{float:"left"}} className="tgl-btn" htmlFor="cb5"></label>
                            <span style={{fontSize:"110%",floa:"left",marginLeft:15}}></span></li>
                    </ul>
                </div>

            </div>
        </div>


        <div id="processed-order-details" className="center-block" style={{width:"100%",height:"auto"}}>
            <div style={{backgroundColor:"white",border:"1px solid #e2e6e9",boxShadow:"0 3px 10px rgba(0,0,0,0.1), 0 3px 4px rgba(0,0,0,0.1)",marginBottom:70}} className="table ">
                <div className="table-row">
                    <div className="table-col right">
                        Sub Total
                    </div>
                    <div id="subtotal_td" className="table-col left "><strong>&#8358;{sub_total}</strong></div>

                </div>
                <div className="table-row">
                    <div className="table-col right ">Delivery Charge</div>
                    <div id="delivery_td" className="table-col left "><strong>&#8358;{delivery_charge}</strong></div>
                </div>
                <div className="table-row">
                    <div className="table-col right "><strong>Grand Total</strong></div>
                    <div id="grandtotal_td" className="table-col left "><strong>&#8358;{grand_total}</strong></div>
                </div>
                <div className="table-row">
                    <div className="table-col right">Pay Online</div>
                    <div className="table-col left">
                        <ul className="tg-list">
                            <li style={{margin:0,width:"100%"}} className="tg-list-item">

                                <input onChange={()=>this.setState({payOnline:true,payOnDelivery:false})} autoComplete="off" name="pay_online" className="tgl tgl-ios" id="cb3" value="1" type="radio" checked={payOnline} />
                                <label style={{float:"right"}} className="tgl-btn" htmlFor="cb3"></label>
                                <span style={{fontSize:"110%",marginLeft:15}}></span>
                            </li>
                        </ul>
                    </div>

                </div>
                <div className="table-row">
                    <div className="table-col right">Pay On Delivery</div>
                    <div className="table-col left">
                        <ul className="tg-list">
                            <li style={{margin:0,width:"100%"}} className="tg-list-item">

                                <input onChange={()=>this.setState({payOnline:false,payOnDelivery:true})} autoComplete="off" name="pay_online" className="tgl tgl-ios" id="cb4" value="0" type="radio" checked={payOnDelivery} />
                                <label style={{float:"right"}} className="tgl-btn" htmlFor="cb4"></label>
                                <span style={{fontSize:"110%",marginLeft:15}}></span>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
        


        <div>
            <div id="create-plate-form-container">
                <button disabled={processingRequest} className="center-block" type="button" onClick={this.handleProcessOrder} href="" style={{width:"100%",height:39,border:"none",borderRadius:0}} id="place-order-btn">
                {processingRequest ?
                <span> <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i> Processing...</span> :
                "Place Order"
                }
                
                </button>
            </div>
        </div>
    </form>
    )
    }

}



const styles = {

    verifyCouponeButton: {
        float: "right",
        backgroundColor:"#FF4C00",
        border:"1px solid #FF4C00",
        color:"white",
        width: "45%",
        marginTop: 7,
        padding: 7,height:34,outline:"none"
    },
    selectAreaInput: {
        padding:  10,
        borderColor:"#FF4C00",
        borderWidth:1,
        margin:  15,
        marginBottom:0,
        height:  50,
        width: "92%",
        float:  "left",
        color:"#666",
        backgroundColor:"white"
    }
}
 
