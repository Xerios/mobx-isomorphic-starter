/**
 * Execute fetchData methods for each component
 * @param renderProps
 * @param state - contains our state
 * @returns {Promise} - returns a promise
 */
export default (renderProps, state, actions) => {
    const params = renderProps.params
    const query = renderProps.location.query

    const fetchDataMethods = renderProps.components.filter(c => c.fetchData).map(c => c.fetchData)

    return Promise.all(fetchDataMethods.map(method => method({ state, actions, query, params })))
}
