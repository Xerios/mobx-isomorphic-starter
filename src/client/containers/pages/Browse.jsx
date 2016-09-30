import React from 'react'
import { action } from 'mobx'
import { observer } from 'mobx-react'

@observer(["state"]) // Only required if you use or change the state outside fetchData 
// @observer(["state", "actions"]) // For instance "actions" doesn't need to be injected if you only use it in fetchData
export default class Browse extends React.Component {
    @action static fetchData({state, actions, query}){
        state.app.title = 'Browse'
        state.browse.data = 'Loading...'
        return actions.test(state, parseInt(query.wait)) // see client/actions.js file, this basically returns a promise with a timeout
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