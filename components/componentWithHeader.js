import React from 'react'
import PropTypes from 'prop-types'

import SideBar from './SideBar'
import Header from './Header';

class ComponentWithHeader extends React.Component {


    render() {

        const {Component, headerProps } = this.props

        return (
            <div>
                <SideBar />
                <Header {...headerProps} />
                <Component {...this.props}/>
            </div>
        )
    }

}

module.exports = ComponentWithHeader