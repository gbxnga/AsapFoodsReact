import React from 'react'
import PropTypes from 'prop-types'

import NavComponent from './NavComponent'
import Header from './presentation/Header'

class ComponentWithHeader extends React.Component {

    render() {
        const {openNav, closeNav} = this.context

        const {Component, headerTitle} = this.props

        return (
            <div>
                <NavComponent closeNav={closeNav}/>
                <Header title={headerTitle} openNav={openNav}/>
                <Component/>
            </div>
        )
    }

}

ComponentWithHeader.contextTypes = {
    store: PropTypes.object,
    openNav: PropTypes.func,
    closeNav: PropTypes.func
}

module.exports = ComponentWithHeader