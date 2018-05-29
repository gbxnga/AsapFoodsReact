import Login from '../presentation/Login'
import { connect } from 'react-redux'
import user from '../../reducers/user'
import loginUser from '../../actions/loginUser'
const LoginContainer = connect(
    (state, props) => {
  
        return {
            user : user
        }
    },
    (dispatch) =>
        ({
            loginUser(username, pass) {
                loginUser(username,pass, dispatch)
            }
        })
)(Login)

module.exports = LoginContainer;