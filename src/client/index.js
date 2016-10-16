import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'

import Router from 'react-router/BrowserRouter'


import createState from './state'

import autorun from './autorun.js'

import App from './containers/App.jsx'

// Import our styles ( for webpack )
require('./assets/css/index.scss')

/*
// Initialize stores & inject server-side state into front-end
const state = createState(window.__STATE)

// Setup autorun ( for document title change )
autorun(state)

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
    render(<Router onUpdate={onRouterUpdate}>
                <Provider state={state} >
                    <App/>
                </Provider>
            </Router>,
    document.getElementById('root'))
}

renderRouter()*/