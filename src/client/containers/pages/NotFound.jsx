import React from 'react'
import { inject, observer } from 'mobx-react'

@inject("state") @observer
export default class NotFound extends React.Component {
    static fetchData({state}){
        state.app.title = 'Not found'
    }
    render() {
        return <h1>Not Found</h1>
    }
}