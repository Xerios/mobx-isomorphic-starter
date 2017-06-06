import React from 'react'
import { Provider } from 'mobx-react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'

import fetchData from './helpers/fetchData'

import Html from '../client/containers/shared/Html.jsx'
import App from '../client/containers/App.jsx'

import createState from '../client/state'

// Handles page rendering ( for isomorphic / server-side-rendering too )
//----------------------
export default (req, res) => {

    // Create state to transfer
    const state = createState()
    
    // Set host variable to header's host
    state.host = req.headers.host

    // context for <ServerRouter>, it's where we keep the
    // results of rendering for the second pass if necessary
    const context = {}

    const markup = ReactDOMServer.renderToString(
        <Provider state={state} >
            <Html>
                <StaticRouter location={req.url} context={context} >
                    <App/>
                </StaticRouter>
            </Html>
        </Provider>)

    if (context.url) {
        // Somewhere a `<Redirect>` was rendered
        redirect(301, context.url)
        //res.writeHead(301, { Location: result.redirect.pathname })
        //res.end()
    } else {
        // we're good, send the response
        res.status(200).send('<!DOCTYPE html>\n' + markup)

        /*return fetchData(renderProps, state, store).then(() => {
            return res.status(200).send('<!DOCTYPE html>\n' + content)
        }).catch((err) => {
            res.status(400).send('400: An error has occured : ' + err)
        })*/
    }
}