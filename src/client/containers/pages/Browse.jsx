import React from 'react'
import { observer } from 'mobx-react'

@observer(["state"]) // Only required if you use or change the state outside fetchData
export default class Browse extends React.Component {
    static fetchData({state, query}){
        //state.app.title = 'Browse'
        //state.browse.data = 'Loading...'
        return new Promise((resolve)=>{
            setTimeout(() => {
                state.browse.data = `fetchData : Hello data waited for ${query.wait}ms ( date.now: ${Date.now()} )`
                resolve()
            }, parseInt(query.wait));
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