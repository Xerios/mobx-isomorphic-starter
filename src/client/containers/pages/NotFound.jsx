import React from 'react'
//import { observer } from 'mobx-react'

//@observer(["state"]) // Only required if you use or change the state outside fetchData
export default class NotFound extends React.Component {
    static fetchData({state}){
        state.app.title = 'Not found'
    }
    render() {
        return <h1>Not Found</h1>
    }
}