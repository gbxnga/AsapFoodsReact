export const auth = store => next => action => {
    let result
    let state

    state = store.getState();
    console.log(state)
    if (action.type != "LOGIN_USER_SUCCESSFUL" && action.type != "LOGIN_USER_FAILED" && !state.user.isLoggedIn)
    {
        console.log('You are logged out')
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