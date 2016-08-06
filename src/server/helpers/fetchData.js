/**
 * Execute fetchData methods for each component
 * @param renderProps
 * @param state - contains our state
 * @param store - contains our actions
 * @returns {Promise} - returns a promise
 */
export default (renderProps, state, store) => {
    const params = renderProps.params

    const fetchDataMethods = renderProps.components.filter(c => c.fetchData).map(c => c.fetchData)

    return Promise.all(fetchDataMethods.map(method => method({ state, store, params })))
}
