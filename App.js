import React from 'react'
import {render} from 'react-dom' 
import PropTypes from 'prop-types'

import { HashRouter, Route, Switch, NavLink, browserHistory, Redirect,withRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/lib/integration/react';
import { BrowserRouter } from 'react-router-dom';

import 'jquery/src/jquery';
import 'bootstrap/dist/js/bootstrap';

import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";

import toast from './modules/toast'

import  './modules/offline'
import 'font-awesome/css/font-awesome.css';
import styles from './src/css/main.css'

import 'babel-polyfill';

window.React = React


import Login from './components/Login/'
import Home from './components/Home'
import Kitchens from './components/Kitchens'
import ItemsContainer from './components/container/ItemsContainer'
import CheckoutContainer from './components/Checkout'
import ProfileContainer from './components/container/ProfileContainer'
import Register from './components/Register'
import OrderContainer from './components/container/OrderContainer'
import ContactUs from './components/ContactUs'

import { connect, Provider } from 'react-redux'
import user from './reducers/user'


//import storeFactory from './factories/store'
import {
    CREATE_PLATE_API,
} from './constants/api'
  
//export default storeFactory
//const store = storeFactory(true)
import {persistor, store} from './factories/store' 


class App extends React.Component {

    
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
                    <Route exact  path="/" component={Home} />
                    
                    <Route  path="/login" component={Login} />
                    
                    <Route  path="/register" component={Register} />
                    
                     
                    
            
                
                    <Route  path="/kitchens" component={Kitchens}/>                
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
const LoadingView = ({}) => 
<div>Loading</div>
const AppWithRouter = withRouter(props => <App {...props}/>);
console.log(store.getState())
/**
 * PersistGate is a PureComponent, so children doesn't rerender, 
 * when location changed with react-router-dom
 */
const PersistGateWithRouter = withRouter(PersistGate);
render (
    
    <BrowserRouter>
        <Provider store={store}>
            <PersistGateWithRouter loading={<LoadingView />} persistor={persistor}>
                <AppWithRouter store={store} />
            </PersistGateWithRouter>
        </Provider>
    </BrowserRouter>
    
    ,
    document.getElementById('react-container')
)
