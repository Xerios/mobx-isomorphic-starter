import React from 'react'
import { render } from 'react-dom'
import { Router, RouterContext, browserHistory } from 'react-router'

import Context from './containers/shared/Context.jsx'
import routes from './routes'
import createState from './state'

import autorun from './autorun.js'

// Import our styles
require('./assets/css/index.scss')

// Initialize stores & inject server-side state into front-end
const state = createState(window.__STATE)
const context = {
    state,
    store:{}
}

// Setup autorun ( for document title change )
autorun(state)

// Wrap RouterContext with Context for state transfer ( required for mobx-connect )
function createElement(props) {
    return <Context context={context}>
        <RouterContext {...props} />
    </Context>
}

var ignoreFirstLoad = true
function onRouterUpdate() {

    if (ignoreFirstLoad){
        ignoreFirstLoad=false
        return
    }
    //console.log("Page changed, executiung fetchData")
    this.state.components.filter(c => c.fetchData).forEach(c => c.fetchData({ state, store: context.store }))
}


// Render HTML on the browser
function renderRouter() {
    render(<Router history={browserHistory}
                render={createElement}
                onUpdate={onRouterUpdate}
                routes={routes(context)}/>,
    document.getElementById('root'))
}

renderRouter()

//if (module.hot) module.hot.accept()
