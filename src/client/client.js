import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'

import { BrowserRouter, Route } from 'react-router-dom'

import createState from './state'

import App from './containers/App.jsx'

// Import our styles ( for webpack )
import './assets/css/index.scss'

// Initialize stores & inject server-side state into front-end
const state = createState(window.__STATE)

var ignoreFirstLoad = true
function onRouterUpdate() {
    if (ignoreFirstLoad){
        ignoreFirstLoad=false
        return
    }
    console.log(window.location.pathname)
    /*let params = this.state.params;
    let query = this.state.location.query;

    this.state.components.filter(c => c.fetchData).forEach(c => {
        c.fetchData({ state, params, query })
    })*/
}

class TrackPageView extends React.Component {
    componentWillMount() { onRouterUpdate() }
    componentWillUpdate() { onRouterUpdate() }
    render() { return <Route children={this.props.children}/> }
}

// Render HTML on the browser
render(<BrowserRouter><TrackPageView><Provider state={state}><App/></Provider></TrackPageView></BrowserRouter>, document.getElementById('root'))