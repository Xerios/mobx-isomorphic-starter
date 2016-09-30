import { action } from 'mobx'
// Place your client side actions here
// I was thinking of separating client and server actions but we'll go with this for now

// Note: Keep these functions stateless as they might get shared across different sessions

export default {

    // Here goes your functions
    // test: () => console.log('test action executed succesfully')

    // This test function is called from fetchData on Browse page, takes in state and time-to-wait, then after the delay it changes the state
    test: action(function(state, wait){

        console.log("Action test")
        
        // fetchData requires a Promise returned so that server knows it has to wait for a response before serving the page
        return new Promise((resolve)=>{
            setTimeout(() => {
                state.browse.data = `fetchData : Hello data waited for ${wait}ms ( date.now: ${Date.now()} )`
                resolve()
            }, wait)
        })
    })
}