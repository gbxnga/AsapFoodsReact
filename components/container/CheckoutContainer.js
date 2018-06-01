import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import NavComponent from '../NavComponent'
import Header from '../presentation/Header'
import KitchensList from '../presentation/KitchensList'
import PlateList from '../presentation/PlateList'
import CheckoutInfo from '../presentation/CheckoutInfo'
import ErrorPage from '../presentation/ErrorPage'

import getPlates from '../../actions/getPlates'
import deletePlate from '../../actions/deletePlate'
import plates from '../../reducers/plates'
import user from '../../reducers/user'
import C from '../../constants/constants'
//import {deletePlate, getPlates} from '../../actions/'
import axios from "axios";

import {NavLink, Redirect} from 'react-router-dom'
import toast from '../../modules/toast'

class CheckoutContainer extends React.Component
{
    constructor(props)
    {
        super(props)
        
        this.state = {
            showThankYou: false,
            plates: this.props.plates,
            total_amount: 0, 
            payment_method: 'Offline',
            loading:true,
            plates:[],
            area_charge: 150
        }
        this.props = this.props
        this.displayThankYou = this.displayThankYou.bind(this)
        this.payWithPaystack = this.payWithPaystack.bind(this)
        this.processOrder = this.processOrder.bind(this)
        this.submitOrder = this.submitOrder.bind(this)
        this.verifyCoupone = this.verifyCoupone.bind(this)
        this._updateAreaCharge = this._updateAreaCharge.bind(this)
        console.log(this.state)
    }
    componentWillMount()
    {       
        // if kitchens list has not been loaded to app state
        // call getKitchens action
        //console.log(this.context.store.getState())
        let {plates} = this.context.store.getState()
        

        //if (plates.length == 0)
        //{
            let {user} = this.context.store.getState()
            this.props.getPlates(user.details.auth_token, (plates)=>this.setState(
                {
                    ...this.state, plates:plates, loading:false
                }
            ))          
        //}
        //else this.setState({...this.state, loading:false,plates:plates})
        
        
    }
    componentDidUpdate()
    {
        $('header #right').attr('data-content', `${this.state.plates.length}`);
        
    }
    componentWillReceiveProps(){
        console.log('receiving update..')
    }
    displayThankYou(){
        this.setState({showThankYou:true, plates:[]});       
    }
    processOrder() {
        //let json;
        //if (!validateForm('checkout'))
            //return;
           
            const {user} = this.context.store.getState()
            let token = user.details.auth_token
        
        if ($('#cb3').is(':checked')) {
            $('#place-order-btn').attr("disabled", "disabled").html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>');
               
            let code = ( $('#coupone').val() =='' || $('#coupone').val().length < 2 ) ? '1234' : $('#coupone').val() 
            axios.get(`${C.GET_TOTAL_API}/${code}/${$("#selectArea").val()}?token=${token}`)
              .then(response => {
                console.log(response)
                return response
              })
              .then(json => {
    
                if (json.data.success) {
                    var charge = json.data.data;
                    if (charge < 50) charge = 5;

                    // tell paystack to process
                    this.payWithPaystack(charge);
                } 
                else {
                    // 
                    toast('Couldnt get total charge!');
                    //$("#place-order-btn").removeAttr("disabled").html('Place Order');
                    return;
                }
                
                //$("#place-order-btn").removeAttr("disabled").html('Place Order');
              })
              .catch((error) => {
                  console.log(` ${error}`)
                  //$("#place-order-btn").removeAttr("disabled").html('Place Order');
                  toast('Connection Error. Try again');
              });
        } else {
            // pay on delivery - trigger checkout
            // $('#place_order_form').trigger("submit");
            this.submitOrder();
        }
    }
    payWithPaystack(charge) {
        let user = this.context.store.getState().user.details
        console.log(user)
    
        var handler = window.PaystackPop.setup({
            key: 'pk_test_354160b69baa943cd10b0c6f4c5472d57e1a5034',
            email: user.email || 'iamblizzyy@gmail.com',
            amount: charge * 100,
            ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
            metadata: {
                custom_fields: [{
                    display_name: "Mobile Number",
                    variable_name: "mobile_number",
                    value: "+2348012345678"
                }]
            },
            callback: function(response) {
                // check()
                toast('Transaction successful');
                $('#transaction_ref').val(response.reference);
    
                //$('#place_order_form').trigger("submit");
                this.submitOrder();
                
            }.bind(this),
            onClose: function() {
                toast('Transaction was cancelled');
                $("#place-order-btn").removeAttr("disabled").html('Place Order');
                //$('#place_order_form').trigger("submit");
            }
        });
        handler.openIframe();
    }
    //$('#place_order_form').on('submit', function(e) {
    submitOrder(){
        $('#place-order-btn').attr("disabled", "disabled").html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>');
    

        
        var formData = new FormData();
        const {user} = this.context.store.getState()

        formData.append("token", user.details.auth_token);

        let array = $('#place_order_form').serializeArray()

        let new_array = array.map((element, index, {length})=>{

            formData.append(element.name, element.value);
        })

        axios.post(`${C.PROCESS_ORDER_API}?token=${user.details.auth_token}`, formData)
        .then(response => {
          console.log(response)
          return response
        })
        .then(json => {

            if (json.data.success) {
                this.props.clearPlate();
                this.setState({showThankYou:true, plates:[], total_amount: json.data.details.total, payment_method: json.data.details.method, order_number:json.data.details.orderId});
                this.props.incrementOrders()
            }
            else
                toast('We could not process your order');
            
          
          $("#place-order-btn").removeAttr("disabled").html('Place Order');
        })
        .catch((error) => {
            console.log(` ${error}`)
            $("#place-order-btn").removeAttr("disabled").html('Place Order');
            toast('Connection Error. Try again');
        });
    };
    verifyCoupone(){
        $('#verify-coupone-btn').attr("disabled", "disabled").html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>');
    
        let code = ($('#coupone').val() =='') ? 'none' : $('#coupone').val() 
        let {user} = this.context.store.getState()
        axios.get(`${C.VERIFY_COUPONE_API}/${code}?token=${user.details.auth_token}`)
          .then(response => {
            console.log(response)
            return response
          })
          .then(json => {

            if (json.data.response == "1") 
                toast('Valid Code! Value: ₦' + json.data.data);
            
            else if (json.data.response == "2") 
                toast('Code already used!');
            
            else if (json.data.response == "3") 
                toast('Invalid Code!');
            
            $("#verify-coupone-btn").removeAttr("disabled").html('USE CODE');
          })
          .catch((error) => {
              console.log(` ${error}`)
              $("#verify-coupone-btn").removeAttr("disabled").html('USE CODE');
          });
    }
    _updateAreaCharge(area){

        let charge;
        //alert($("#selectArea").val())

        switch($("#selectArea").val()){
            case "none":
                charge = 150
            break;
            case "southGate":
                charge = 100
            break;
            case "northGate":
                charge = 150
            break;
            
            default :
            charge = 100
        }
        this.setState({area_charge:charge})
    }
    render(display){
        const {showThankYou, loading, area_charge} = this.state
        const {plates, user} = this.context.store.getState()
        const {openNav, closeNav} = this.context

        $('header #right').attr('data-content', `${plates.length}`);

        let sub_total=0, delivery_charge =0, grand_total =0
        delivery_charge = plates.length * area_charge
        $.each(plates, (key, value)=>{
            sub_total += value.sub_total;
        })
        let theplates = plates.length;
        do
        {
            if (theplates % 4 == 0)
                delivery_charge -= area_charge;

            theplates--;
        }
        while(theplates>0)
        grand_total = sub_total + delivery_charge
        
        
        return(
            (showThankYou) ? 
            <div className="thank-you-page page-container" id=" " className="col-md-12" style={{marginTop:100, diplay:"block"}}>

            <div id="thank-you-page-banner ">
                <img width="150" height="150" className="center-block " src="src/icons/thankyou.png" />
                <h2 className="text-center ">Thank you!</h2>
                <p className="text-center ">Your order is confirmed and on the way</p>
            </div>

            <div id="processed-order-details " className="center-block " style={{width:"90%",height:"auto"}}>
                <div style={{backgroundColor:"white"}} className="table ">
                    <div className="table-row ">
                        <div className="table-col right ">
                            <strong>Order No</strong>
                        </div>
                        <div className="table-col left" id="thank-you-order-id">{this.state.order_number}</div>

                    </div>
                    <div className="table-row ">
                        <div className="table-col right ">Total Amount</div>
                        <div className="table-col left" id="thank-you-total">&#8358;{this.state.total_amount}</div>
                    </div>
                    <div className="table-row ">
                        <div className="table-col right "></div>
                        <div className="table-col left "></div>
                    </div>
                    <div className="table-row ">
                        <div className="table-col right ">Payment Method</div>
                        <div className="table-col left" id="thank-you-method">{this.state.payment_method}</div>
                    </div>
                </div>
            </div>
            <NavLink to={`view-order/${this.state.order_number}`} id="thank-you-view-order" className="text-center center-block">View order</NavLink>
            <NavLink className="landing-page-btn center-block text-center " style={{backgroundColor:"#FF4C00",clear:"both"}} id="email-login-btn " to="./">FINISH</NavLink>
            </div>
        : (loading) ?
        <div>
        <NavComponent closeNav={closeNav}/>
        <Header title='Checkout' openNav={openNav}/>
        <div id="load" style={{backgroundColor:"transparent",opacity:0.9}}>
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    
        </div>
        </div>
        :
        
        (plates.length == 0 ) ? 
        
        <div>
        <NavComponent closeNav={closeNav}/>
        <Header title='Checkout' openNav={openNav}/>
        <ErrorPage message="Sorry! Your plate is empty"/>
        </div>

        :
            <div>
                <NavComponent closeNav={closeNav}/>
                <Header title='Checkout' openNav={openNav}/>
                <div style={{paddingBottom:75,display:"block"}} className="checkout-page page-container">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <PlateList deletePlate={this.props.deletePlate} user={user} plates={plates}/>
                                <NavLink title="Add more plates" style={{zIndex:10000000,position:"fixed",bottom:45,right:15,marginBottom:45}} to="kitchens"><img style={{borderRadius:20}} width="45" src="src/icons/add_button.png" /></NavLink>
                                <hr/>
                                <form id="verify-coupone-form">
                                    <input type="text" value="" name="coupone_code" hidden="hidden" />
                                </form>
                                <CheckoutInfo _updateAreaCharge={this._updateAreaCharge} verifyCoupone={this.verifyCoupone} grand_total={grand_total} sub_total={sub_total} delivery_charge={delivery_charge} processOrder={this.processOrder} user={user}/>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
CheckoutContainer.contextTypes = {
    store: PropTypes.object,
    openNav: PropTypes.func,
    closeNav: PropTypes.func
}
export default connect(
    (state, props) => { 
        return {
            plates : plates,
            user: user
        }
    },
    dispatch =>
        ({
            getPlates(auth_token, callback) {
                getPlates(auth_token,callback,dispatch)
            },
            deletePlate(auth_token, id){
                deletePlate(auth_token, id, dispatch)
            },
            clearPlate(){
                dispatch({
                    type: C.CLEAR_PLATE
                })
            },
            incrementOrders(){
                dispatch({
                    type: C.INCREMENT_ORDERS
                })
            }
        })
)(CheckoutContainer)

//module.exports = CheckoutContainer;