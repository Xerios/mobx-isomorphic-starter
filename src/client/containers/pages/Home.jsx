import React from 'react'
import { connect } from 'mobx-connect'

@connect
export default class Home extends React.Component {
    static fetchData({state}){
        state.app.title = 'Home'
    }
    render() {
        return <section>
            <h1>Home</h1>
            <p>Welcome to the fastest website in the universe !</p>
        </section>
    }
}