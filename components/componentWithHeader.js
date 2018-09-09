import React from 'react'
import PropTypes from 'prop-types'

import NavComponent from './NavComponent'
import Header from './presentation/Header'

class ComponentWithHeader extends React.Component {


    render() {

        const {Component, headerProps } = this.props

        return (
            <div>
                <NavComponent />
                <Header {...headerProps} />
                <Component/>
            </div>
        )
    }

}

module.exports = ComponentWithHeader