# Isomorphic + React + Mobx Clean Starter project

The goal of this project is to provide a starting base for an mobx react project with isomorphism and SEO compabilities ( meta tags change ).

Based on nightwolfz/mobx-starter, except that it's cleaner and simplified.

Features:
+ Simplified flexible isomorphic system ( fetchData )
+ Document title and description change
+ CSS and SCSS compilation
+ MongoDB
+ Hot reload for development ( page auto-refresh )
+ Decorators for accessing actions and state
+ Battle-tested ( see UnityList.com )

![Preview](preview.png)

Setting up isomorphic components is as easy as this :
````js
@connect
export default class Browse extends React.Component {
    // Executed on client and server ( server waits for Promise to be resolved )
    //-----------------------------------
    static fetchData({state}){
        state.app.title = 'Browse' // Change document title
        state.browse.data = 'Loading...' // You can add a loader for the client side rendering

        // Return a promise so that server waits until it's done before serving the page
        return new Promise((resolve)=>{
            setTimeout(() => {
                state.browse.data = 'fetchData : Hello data '+ Date.now()
                resolve()
            }, 1000);
        })
    }
    // Render
    //-----------------------------------
    render() {
        const {state} = this.context
        return <section>
            <h1>Browse</h1>
            <p>This is delayed page example, executed on server and client alike</p>
            <p>Try refreshing and you'll see it takes 1 second to load this page, while changing routes on the client remains async</p>
            <p>{state.browse.data}</p>
        </section>
    }
}
````

## How to run
````
    node index.js
````

If you want to run production build on your development machine, use cross-env ( `npm install cross-env -g` )
````
    cross-env NODE_ENV=production node ./index.js
````
## Requirements

* Node 6 or Node 4

## Depencencies

* Express + express-router
* React + react-router
* Mongoose
* Babel
* Webpack
* Sass/SCSS loaders

## Goals

I needed a fully isomorphic website where most important data is shared through out the whole application.
So I made this simplified, bloatware-free code for starting a new isomorphic project.

We have one main state object that's observable and all react components decorated with `@connect` have access to it ( though this.context ).

All the rendering is efficiently taken care by [MobX](https://github.com/mobxjs/mobx)


# F.A.Q.

##### How to add mongoose models ?
---
1. Goto `src/server/models`
2. Add `[Name].js`
3. Goto `src/helpers/database`
4. Add a new line under `export const Account` 
5. Require your model like this `import {Account} from './src/helpers/database`


##### How do I make my components isomorpic?
---
Check if you added the `static fetchData({state}){` static function properly to your component.

##### My isomorphic component is acting strange / isn't waiting until the request has been done
---
Verify if your `fetchData` is returning a Promise and resolve is executed once all required data is fetched.


##### My components are not updating!
---
Make sure you added the `@connect` decorator to your component.


##### My stateless component doesn't have access to this.context !
---
You cannot use decorators on stateless components.
You should instead wrap your component like this:

```js
const MyStatelessComponent = connect(function(props, context) {
  return <p>{context.state.something} !</p>
})
````

##### Should I use @connect on all components ?
---
`@connect` only enhances the component you are decorating, not the components used inside it.
So usually all your components should be decorated.
Don't worry, this is not inefficient, in contrast, more observer components make rendering more efficient.

##### Should I use @observer on @connect'ed components ?
---
`@connect` already adds `@observer` automatically, no need to add it again.


##### The propType of an observable array is object
---
Observable arrays are actually objects, so they comply to propTypes.object instead of array.


##### Where can I find a more complex starter ?
---
Check out nightwolfz's implementation ! 
[https://github.com/nightwolfz/mobx-starter](https://github.com/nightwolfz/mobx-starter)

##### Where can I find more help ?
---
`@connect` uses the amazing library [MobX](https://github.com/mobxjs/mobx), go check out their
[wiki page](https://mobxjs.github.io/mobx/best/pitfalls.html) for more information!



## Author
Sam Megidov