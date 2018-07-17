export default store => next => action => {
    localStorage['redux-store'] = JSON.stringify(store.getState())
    return next(action)
}