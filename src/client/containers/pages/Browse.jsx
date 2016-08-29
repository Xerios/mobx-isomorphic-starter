import React from 'react'
import { inject, observer } from 'mobx-react'

@inject("state") @observer
export default class Browse extends React.Component {
    static fetchData({state}){
        state.app.title = 'Browse'
        state.browse.data = 'Loading...'
        return new Promise((resolve)=>{
            setTimeout(() => {
                state.browse.data = 'fetchData : Hello data '+ Date.now()
                resolve()
            }, 1000);
        })
    }
    render() {
        return <section>
            <h1>Browse</h1>
            <p>This is delayed page example, executed on server and client alike</p>
            <p>Try refreshing and you'll see it takes 1 second to load this page, while changing routes on the client remains async</p>
            <p>{this.props.state.browse.data}</p>
        </section>
    }
}