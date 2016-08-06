import React from 'react'
import { connect } from 'mobx-connect'

@connect
export default class NotFound extends React.Component {
    static fetchData({state}){
        state.app.title = 'Not found'
    }
    render() {
        return <h1>Not Found</h1>
    }
}