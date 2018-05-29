import React from 'react'
import PropTypes from 'prop-types'
import HomeComponent from '../HomeComponent'
import { Redirect } from 'react-router-dom';

class HomeContainer extends React.Component
{
    constructor(props)
    {
        super(props)
        //const { store } = this.context
        
        
    }
    

    render(){
        const {openNav, closeNav, store} = this.context

        return(
            
            <HomeComponent history={this.props.history} closeNav={closeNav} openNav={openNav}/>
        )
    }
    

}
HomeContainer.contextTypes = {
    store: PropTypes.object,
    openNav: PropTypes.func,
    closeNav: PropTypes.func
}

module.exports = HomeContainer;