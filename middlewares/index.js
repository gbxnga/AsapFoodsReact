

import browserHistory from 'history';
import { push } from 'redux-little-router'
import createHandlerMiddleware from 'redux-handler-middleware';
//import {FETCH_POST_FAILURE, FETCH_POSTS_FAILURE} from 'constants/blog';

export const handlerMiddleware = createHandlerMiddleware([{
    actions: ["LOGIN_USER_SUCCESSFUL"],
    afterHandler: (store, action) => {
        if(action.type == "LOGIN_USER_SUCCESSFUL"){
            //browserHistory.replace({pathname: '/'})  
            store.dispatch(push('/profile')) 
            
        }
    }
}]);


export const auth = store => next => action => {
    let result
    let state

    state = store.getState();
    console.log(state)
    
    if (action.type == "LOGIN_USER_SUCCESSFUL") {
        console.log('sending u to dashboad');
        store.dispatch(push('/profile')) 
        action = {
            ...action, 
            afterHandler: (action) => {
                browserHistory.replace({pathname: '/'});
            }
        }
    }
    if (action.type != "LOGIN_USER_SUCCESSFUL" && action.type != "LOGIN_USER_FAILED" && !state.user.isLoggedIn)
    {
        
        console.log('You are logged outt')
    }
    else
    {
        console.log(store)
        console.log('You are logged in')
    }
    result = next(action)
}

export const logger = store => next => action => {
    let result
    
    console.groupCollapsed("dispatching", action.type)
    console.log('prev state', store.getState())
    console.log('action', action)
    result = next(action)
    console.log('next state', store.getState())
    console.groupEnd()
}

export const saver = store => next => action => {
    localStorage['redux-store'] = JSON.stringify(store.getState())
    return next(action)
}