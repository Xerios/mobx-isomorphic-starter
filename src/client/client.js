import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'

import { BrowserRouter } from 'react-router-dom'


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
    //console.log("Page changed, executing fetchData")
    let params = this.state.params;
    let query = this.state.location.query;

    this.state.components.filter(c => c.fetchData).forEach(c => {
        c.fetchData({ state, params, query })
    })
}


// Render HTML on the browser
function renderRouter() {
    render(<Provider state={state} ><BrowserRouter onUpdate={onRouterUpdate}>
                
                    <App/></BrowserRouter>
                </Provider>
            ,
    document.getElementById('root'))
}

renderRouter()