import React from 'react'
import { contextTypes } from 'mobx-connect'

/**
 * Top level component that wraps everything (router, i18n, app)
 * providing an entry point for the store and state references
 * @class Context
 * @returns {Object}
 */
class Context extends React.Component {
    static childContextTypes = contextTypes

    getChildContext() {
        return this.props.context
    }
    render() {
        return this.props.children
    }
}

export default Context
