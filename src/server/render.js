import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { match, RouterContext } from 'react-router'

import fetchData from './helpers/fetchData'

import Context from '../client/containers/shared/Context.jsx'
import Html from '../client/containers/shared/Html.jsx'

import createState from '../client/state'
import routes from '../client/routes'

// Handles page rendering ( for isomorphic / server-side-rendering too )
//----------------------
export default (req, res) => {
    
    // Add state & session data
    const state = createState()
    
    // Set host variable to header's host
    state.app.host = req.headers.host

    // Create context object to transfer
    const context = {
        state: state,
        store: {}
    }

    // Prepare for routing
    let matchRoutes = {
        routes: routes(context),
        location: req.originalUrl
    }

    // Route
    match(matchRoutes, (error, redirectLocation, renderProps) => {
        if (error) return res.status(500).send(error.message)
        if (redirectLocation) return res.redirect(302, redirectLocation.pathname + redirectLocation.handleInput)
        if (!renderProps) return res.status(404).send('404 Not found')
        
        let statusCode = renderProps.routes[1].path !== '*' ? 200 : 404 // Check for "Not Found" page ( in this case we have path "*" ) and use code 404 if that's the case

        return fetchData(renderProps, context.state, context.store).then(() => {
            const content = ReactDOMServer.renderToStaticMarkup(<Context context={context}><Html><RouterContext {...renderProps}/></Html></Context>)
            return res.status(statusCode).send('<!DOCTYPE html>\n' + content)
        })
    })
}