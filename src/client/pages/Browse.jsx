import React from 'react'
import { inject, observer } from 'mobx-react'
import url from 'url'

@inject(["state"]) @observer
export default class Browse extends React.Component {
    static loadData({state, requestUrl}){
        let getQueryTime = url.parse(requestUrl).query // http://localhost:5400/browse?1000  <--- gets the "1000" part which we use as delay

        return new Promise((resolve)=>{
            setTimeout(() => {
                state.browse.data = `loadData : Hello data waited for ${getQueryTime}ms ( date.now: ${Date.now()} )`
                resolve()
            }, parseInt(getQueryTime));
        })
    }
    componentDidMount() { 
        if (!this.props.state.browse.data){
            Browse.loadData({state: this.props.state, requestUrl: window.location.href})
        }
    }
    render() {
        return <section>
            <h1>Browse</h1>
            <p>This is delayed page example, executed on server and client alike</p>
            <p>Try refreshing and you'll see it takes 1 second to load this page, while changing routes on the client remains async</p>
            <p>{this.props.state.browse.data || 'Loading...'}</p>
        </section>
    }
}