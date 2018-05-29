import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import NavComponent from '../NavComponent'
import Header from '../presentation/Header'
import KitchensList from '../presentation/KitchensList'
import getKitchens from '../../actions/getKitchens'
import kitchens from '../../reducers/kitchens'

class KitchensContainer extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            kitchens: [],
            loading: true
        }
        
    }
    componentWillMount()
    {
        // if kitchens list has not been loaded to store
        // call getKitchens action
        let {kitchens} = this.context.store.getState()
        
        if (kitchens.length == 0)
        {
            let {user} = this.context.store.getState()
            console.log('GETTING KITCHENS FROM SERVER')

            // the state should be reset after the kitchens list is feched from the sever and the store updated
            this.props.getKitchens(user.details.auth_token, (kitchens)=>{console.log('calloing callback now');this.setState({kitchens:kitchens, loading:false})})
            
        }
        else  this.setState({kitchens:kitchens, loading:false}) // load from store and setState
        
        
    }
    componentDidMount()
    {
        console.log(this.props)
        const {plates} = this.context.store.getState()
        $('header #right').attr('data-content', `${plates.length}`);
    }
    render(){
        //const {kitchens} = this.state
        const {openNav, closeNav} = this.context
        const {kitchens,loading} = this.state
        //if (kitchens.length > 0) this.state.loading = false;
        
        return(
            <div>
            <NavComponent closeNav={closeNav}/>
            <Header title='Pick Kitchen' openNav={openNav}/>
            {(loading) ? 
            <div id="load" style={{backgroundColor:"transparent",opacity:0.9}}>
                <div id="loading-image" class="loader">
                    <svg viewBox="0 0 32 32" width="32" height="32">
                    <circle style={{color:"#FF4C00"}} id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
                    </svg>
                </div>
            </div>
            :
            <KitchensList kitchens={kitchens}/>}
            </div>
        )
    }

}
KitchensContainer.contextTypes = {
    store: PropTypes.object,
    openNav: PropTypes.func,
    closeNav: PropTypes.func
}
export default connect(
    (state, props) => { 
        return {
            kitchens : kitchens
        }
    },
    dispatch =>
        ({
            getKitchens(auth_token, callback) {
                getKitchens(auth_token,callback, dispatch)
            }
        })
)(KitchensContainer)
//module.exports = KitchensContainer;

