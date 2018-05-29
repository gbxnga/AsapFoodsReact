import React from 'react'
import {render} from 'react-dom' 
import PropTypes from 'prop-types'

import { HashRouter, Route, Switch, NavLink, browserHistory, Redirect,withRouter } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import 'jquery/src/jquery';
import 'bootstrap/dist/js/bootstrap';

import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
//import style2 from 'bootstrap/dist/css/bootstrap';
//import url('/node_modules/bootstrap/dist/css/bootstrap.css');
//import SwipeableRoutes from "react-swipeable-routes";
import axios from "axios";

import toast from '../modules/toast'

import  '../modules/offline'
import 'font-awesome/css/font-awesome.css';
import styles from '../dist/src/css/main.css'
//import styles2 from 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css'

window.React = React

//window.bootstrap = bootstrap

import loginUser from '../actions/loginUser'
import LoginContainer from '../components/container/LoginContainer'
import HomeContainer from '../components/container/HomeContainer'
import KitchensContainer from '../components/container/KitchensContainer'
import ItemsContainer from '../components/container/ItemsContainer'
import CheckoutContainer from '../components/container/CheckoutContainer'
import ProfileContainer from '../components/container/ProfileContainer'
import RegisterContainer from '../components/container/RegisterContainer'
import OrderContainer from '../components/container/OrderContainer'
import ContactUs from '../components/presentation/ContactUs'

//import PageTransition from 'react-router-page-transition';

import { connect } from 'react-redux'
import user from '../reducers/user'


import storeFactory from '../factories/store'
import C from '../constants/constants'
  
//export default storeFactory
const store = storeFactory(true)


class App extends React.Component {

    getChildContext() {
         
        return {
            store: this.props.store,
            openNav: ()=>{
                $('#mySidenav').animate({
                    "margin-left": "+0"
                }, 10, function() {
                    $('#cover').show();
                });

            },
            closeNav: (done=f=>f)=>{
                $('#cover').hide();
                $('#mySidenav').animate({
                    "margin-left": "-80%"
                }, 10);
                done();

            },
            createPlate: ()=>{
                $('#create-plate-form button').attr("disabled", "disabled").html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>');

                
                var formData = new FormData();
                const {user} = this.props.store.getState()

                formData.append("token", user.details.auth_token);

                let array = $('#create-plate-form').serializeArray()

                let new_array = array.map((element, index, {length})=>{

                    formData.append(element.name, element.value);
                })
            
                axios.post(`${C.CREATE_PLATE_API}`, formData)
                  .then(response => {
                    console.log(response)
                    return response
                  })
                  .then(json => {
                    if (json.data.success)
                    {
                        toast('Items added!')
                        this.props.history.push('../../checkout')
                    }
                    else
                    {
                        toast('Failed to add items')
                    }
                    $("#create-plate-form button").removeAttr("disabled").html('<span class="glyphicon glyphicon-plus"></span> Add Items to Plate');
                  })
                  .catch((error) => {
                      console.log(` ${error}`)
                      $("#create-plate-form button").removeAttr("disabled").html('<span class="glyphicon glyphicon-plus"></span> Add Items to Plate');
                  });
            }
        }
    }
    /*componentWillMount() {
        if (!this.props.authenticated) {
          this.props.history.push('/signin');
        }
      }
  
      componentWillUpdate(nextProps) {
        if (!nextProps.authenticated) {
          this.props.history.push('/signin');
        }
      }*/
      componentDidMount(){
        console.log('Updated!')

      }
    componentWillMount() {
        
        this.unsubscribe = store.subscribe(
            () => this.forceUpdate()
        )

        
        
    }
    componentWillUpdate()
    {
        if (!store.getState().user.isLoggedIn)
        {
            console.log('App Component: You are not logged in')
            console.log(this.props)
        }
    }


    componentWillUnmount() {
        this.unsubscribe()
    }


    render() {
        const { user } = store.getState()
        // const sortedColors = [...colors].sort(sortFunction(sort))
        if (!user.isLoggedIn && !this.props.location.pathname.endsWith('/login') && !this.props.location.pathname.endsWith('/register')) {
            console.log('you are not loggedin and are not visiting login or register, so go to login pagee')
            this.props.history.push("/login")
        }
        if (user.isLoggedIn && (this.props.location.pathname.endsWith('/login') || this.props.location.pathname.endsWith('/register'))) {
            console.log('you are either going to login or register but youre logged inn')
            
            this.props.history.push("/")
        }
        return (
            
            
                <Switch> 
                    <div id="main">
                    <Route exact  path="/" component={HomeContainer} />
                    
                    <Route  path="/login" component={LoginContainer} />
                    
                    <Route  path="/register" component={RegisterContainer} />
                    
                     
                    
            
                
                    <Route  path="/kitchens" component={KitchensContainer}/>                
                    <Route  path="/kitchen/:id/:name" component={ItemsContainer}/>
                    
                    
            
                
                    <Route  path="/checkout" component={CheckoutContainer} />
            
                
                    <Route  path="/profile" edit={false} component={ProfileContainer} />
                    <Route  path="/edit-profile" edit={true} component={ProfileContainer} />
            
                
                    <Route  path="/contact-us" component={ContactUs} />
                    <Route  path="/my-orders" component={OrderContainer} />
                    <Route  path="/view-order/:ref" component={OrderContainer} />

                    
                    
                    </div>
                </Switch>
                    
            
   
        )
    }

}
App.propTypes = {
    store: PropTypes.object.isRequired
}
App.childContextTypes = {
    store: PropTypes.object.isRequired,
    openNav: PropTypes.func,
    logoutUser: PropTypes.func,
    closeNav: PropTypes.func,
    createPlate: PropTypes.func
}
const AppContainer = withRouter(props => <App {...props}/>);
console.log(store.getState())
render (
    
    <BrowserRouter>
        <AppContainer store={store} />
    </BrowserRouter>
    
    ,
    document.getElementById('react-container')
)
