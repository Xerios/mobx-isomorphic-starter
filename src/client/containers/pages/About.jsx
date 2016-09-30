import React from 'react'
import { action } from 'mobx'
import { observer } from 'mobx-react'

@observer(["state"]) // Only required if you use or change the state outside fetchData
export default class About extends React.Component {
    @action static fetchData({state}){
        state.app.title = 'About'
    }
    render() {
        return <section>
            <h1>About</h1>
            <p><img src='/public/avatar.jpg' /></p>
            <p>Created by Sam Megidov, inspired by nightwolfz's mobx-starter</p>
            <p>
                <a href="https://github.com/Xerios/mobx-isomorphic-starter" target="_blank">
                    https://github.com/Xerios/mobx-isomorphic-starter
                </a>
            </p>
        </section>
    }
}