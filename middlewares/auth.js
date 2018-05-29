/*function authMiddleware({getState, dispatch}) {
    return (next) => (action) => {
        if (typeof action === 'object' && action.hasOwnProperty('type')) {
            if (action.type === LOGIN_SUCCESS) {
                next(action); // send it to next so identity will be set

                // get current route
                const state = getState();
                let path = '/dashboard';

                if (typeof state['router'] === 'object' && typeof state['router']['route'] === 'object' && null !== state['router']['route']) {
                    if (state.router.route.name === 'login' && typeof state.router.route.query['to'] === 'string') {
                        path = state.router.route.query.to;
                    }
                }

                return next(actions.transitionTo(path));
            }
        }

        return next(action);
    };
}*/
const auth = store => next => action => {
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
module.exports = auth;