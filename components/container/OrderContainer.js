import React from 'react'
import PropTypes from 'prop-types'

import NavComponent from '../NavComponent'
import Header from '../presentation/Header'
import ErrorPage from '../presentation/ErrorPage'
import OrderList from '../presentation/OrderList'
import Order from '../presentation/Order'

import C from '../../constants/constants'
//import {deletePlate, getPlates} from '../../actions/'
import axios from "axios";


import toast from '../../modules/toast'

class OrderContainer extends React.Component
{
    constructor(props)
    {
        super(props)
        
        this.state = {
            orders: [],
            order:{},
            loading: true
        }
    }
    componentWillUnmount(){
        console.log('OrderContainer: im unmounting')
        $('#view-order-close-btn').trigger("click");
    }

    componentDidMount()
    {    
        

        const {plates} = this.context.store.getState()
        $('header #right').attr('data-content', `${plates.length}`);
        const {auth_token} = this.context.store.getState().user.details

        if  (this.props.match.path.endsWith('/view-order/:ref')){
            axios.get(`${C.GET_ORDER_API}/${this.props.match.params.ref}?token=${auth_token}`)
            .then(response => {
              console.log(response)
              return response
            })
            .then(json => {
  
              if (json.data.success) 
              {
                  let myObj = json.data.data
                      
                  /*let array = $.map(myObj, function(value, index) {
                      return [value];
                  });*/
                  this.setState({orders:[],order:myObj, loading:false})
              }
              
              else 
                  toast('Code already used!');
              
              
            })
            .catch((error) => {
                console.log(` ${error}`)
            });
        }
        else
        {
            axios.get(`${C.GET_ORDERS_API}?token=${auth_token}`)
            .then(response => {
                console.log(response)
                return response
            })
            .then(json => {

                if (json.data.success) 
                {
                    let myObj = json.data.data
                        
                    let array = $.map(myObj, function(value, index) {
                        return [value];
                    });
                    this.setState({orders:array,order:{}, loading:false})
                }
                
                else 
                    toast('Code already used!');
                
                
            })
            .catch((error) => {
                console.log(` ${error}`)
            });
        }
    }
    render(display){
        const {orders, order, loading} = this.state
        const {plates, user} = this.context.store.getState()
        const {openNav, closeNav} = this.context
        
        
        return(
            <div>
                <NavComponent closeNav={closeNav}/>
                <Header showBack={(this.props.match.path.endsWith('/view-order/:ref'))}  title={(this.props.match.path.endsWith('/view-order/:ref')) ? "View Order" : "My Orders"} openNav={openNav}/>
                {

                    (loading) ?
                        <div id="load" style={{backgroundColor:"transparent",opacity:0.9}}>
                            <div id="loading-image" class="loader">
                                <svg viewBox="0 0 32 32" width="32" height="32">
                                <circle style={{color:"#FF4C00"}} id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
                                </svg>
                            </div>
                        </div>
                    :
                    (this.props.match.path.endsWith('/view-order/:ref')) ? 
                        <Order order={order}/>
                        //<h3 style={{marginTop:100}}>{order.payment}</h3>
                    :
                    (orders.length == 0 ) ? 
                        <ErrorPage message="No Order Yet!"/>
                    :
                    <div className="orders-page">
                        <div className="container">
                            <OrderList orders={orders}/>
                        </div>

                    </div>
                }
            </div>
        )
    }

}
OrderContainer.contextTypes = {
    store: PropTypes.object,
    openNav: PropTypes.func,
    closeNav: PropTypes.func
}

module.exports = OrderContainer;