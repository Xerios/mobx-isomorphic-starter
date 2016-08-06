const { observable, extendObservable, toJS } = require('mobx')

// Default state structure
let defaultState =  observable({
    app: {
        title: 'Mobx Isomorphic Starter',
        description : 'Here goes description',
        host: ''
    },
    browse: {
        data : ''
    }
})

// Export an instance of our state ( function so that we don't re-use same object for every session )
module.exports = (state) => {
    return process.env.IS_CLIENT === true ? extendObservable(defaultState, state) : toJS(defaultState)
}