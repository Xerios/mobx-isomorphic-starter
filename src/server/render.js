import React from 'react'
import { Provider } from 'mobx-react'
import ReactDOMServer from 'react-dom/server'
import { ServerRouter } from 'react-router'
import createServerRenderContext from 'react-router/createServerRenderContext'

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
    state.app.host = req.headers.host

    // context for <ServerRouter>, it's where we keep the
    // results of rendering for the second pass if necessary
    const context = createServerRenderContext()

    // get the result
    const result = context.getResult()


    const createMarkup = (req, context) => {
        return ReactDOMServer.renderToStaticMarkup(
            <Provider state={state} >
                <Html>
                    <ServerRouter location={req.url} context={context} >
                        <App/>
                    </ServerRouter>
                </Html>
            </Provider>)
    }

    let markup  = createMarkup(req, context)

    console.log(result)
    // the result will tell you if it redirected, if so, we ignore
    // the markup and send a proper redirect.
    if (result.redirect) {
        res.writeHead(301, { Location: result.redirect.pathname })
        res.end()
    } else {
        // the result will tell you if there were any misses, if so
        // we can send a 404 and then do a second render pass with
        // the context to clue the <Miss> components into rendering
        // this time (on the client they know from componentDidMount)
        if (result.missed) {
            res.writeHead(404)
            markup = createMarkup(req, context)
        }
        console.log(result)
        res.write('<!DOCTYPE html>\n');
        res.write(markup)
        res.end()
        /*return fetchData(renderProps, state, store).then(() => {
            return res.status(200).send('<!DOCTYPE html>\n' + content)
        }).catch((err) => {
            res.status(400).send('400: An error has occured : ' + err)
        })*/
    }
}