import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
 

import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import { logger, saver, auth, handlerMiddleware } from '../middlewares'

import user from '../reducers/user'
import cart from '../reducers/cart'
import kitchens from '../reducers/kitchens'
import plates from '../reducers/plates'

import { routerReducer } from 'react-router-redux';

const reducers = combineReducers({ user, cart, kitchens, plates });

const defaultState = {
    user: {
        isLoggedIn : false,
        details: { }
    },
    cart: 0,
    kitchens:[],
    plates:[] 
}


export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware( history );

const getMiddleware = _ =>  applyMiddleware( myRouterMiddleware, logger, saver, auth, createLogger(), handlerMiddleware )

const state = localStorage['redux-storee'] ? JSON.parse(localStorage['redux-storee']) : defaultState ;

const createStoreWithMiddleware =  composeWithDevTools( getMiddleware() )( createStore );

export default ( initialState = defaultState ) => createStoreWithMiddleware(reducers, state)