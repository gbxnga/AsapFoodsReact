import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';

import logger from '../middlewares/logger'
import saver from '../middlewares/saver'
import auth from '../middlewares/auth'
import user from '../reducers/user'
import cart from '../reducers/cart'
import kitchens from '../reducers/kitchens'
import plates from '../reducers/plates'

const state = {
    user: {
        isLoggedIn : false,
        details: {

        }
    },
    cart: 0,
    kitchens:[],
    plates:[]
}
const storeFactory = (initialState=state) =>

    applyMiddleware(logger, saver, auth)(createStore)(
        combineReducers({user,cart,kitchens,plates}),
        (localStorage['redux-store']) ?
            JSON.parse(localStorage['redux-store']) :
            state
    )


module.exports = storeFactory;