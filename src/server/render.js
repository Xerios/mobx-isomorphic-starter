import React from 'react'
import { Provider } from 'mobx-react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { matchPath } from 'react-router-dom'

import createState from '../client/state'

import App, { routes } from '../client/containers/App.jsx'


// Handles page rendering ( for isomorphic / server-side-rendering )
//----------------------
export default (req, res) => {

    // Create state to transfer
    const state = createState()
    
    // Set host variable to header's host
    state.host = req.headers.host

    const isProd = process.env.NODE_ENV === 'production'
    const bundleURL = isProd ? '/public' : 'http://'+req.headers.host.replace(5400, 8080)
    
    const promises = []
    routes.some(route => {
        const match = matchPath(req.path, route)
        if (match && route.loadData) promises.push(route.loadData({state, requestUrl: req.url}))
        return match
    })

    Promise.all(promises).then(data => {
        // do something w/ the data so the client
        // can access it then render the app
        
        const context = {}
        const renderedBody = ReactDOMServer.renderToString(<StaticRouter location={req.url} context={context}><Provider state={state}><App/></Provider></StaticRouter>)


        if (context.url) {
            // Somewhere a `<Redirect>` was rendered
            redirect(301, context.url)
        } else {
            // we're good, send the response
            const html = `<!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8" />
                    <link href="${bundleURL + '/bundle.css'}" rel="stylesheet"/>

                    <script>window.__STATE = ${JSON.stringify(state, null, isProd ? 0 : 4)};</script>
                </head>
                <body>
                    <div id="root">${renderedBody}</div>
                    <script src="${bundleURL + '/bundle.js'}"></script>
                </body>
            </html>`

            /*return fetchData(renderProps, state, store).then(() => {
                return res.status(200).send('<!DOCTYPE html>\n' + content)
            }).catch((err) => {
                res.status(400).send('400: An error has occured : ' + err)
            })*/
            res.status(200).send(html)
        }
    })
}