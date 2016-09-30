# Isomorphic React + Mobx Starter project

The goal of this project is to provide a starting base for an mobx react project with isomorphism and SEO compabilities ( meta tags change ).

Based on [nightwolfz/mobx-starter](https://github.com/nightwolfz/mobx-starter), except that it's cleaner and simplified.

Features:
+ Simplified flexible isomorphic system ( fetchData )
+ Uses Provider to inject global state into Components
+ Document title, keywords and description change integration
+ CSS and SCSS compilation
+ Hot reload for development ( page auto-refresh )
+ Battle-tested structure ( see [UnityList.com](http://unitylist.com/) )

![Preview](preview.png)

Setting up isomorphic components is as easy as this :
````js
@observer(["state"])
export default class Browse extends React.Component {
    // Executed on client and server ( server waits for Promise to be resolved )
    //-----------------------------------
    static fetchData({state, params}){
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
        return <section>
            <h1>Browse</h1>
            <p>This is delayed page example, executed on server and client alike</p>
            <p>Try refreshing and you`ll see it takes 1 second to load this page, while changing routes on the client remains async</p>
            <p>{this.props.state.browse.data}</p>
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
* Mobx + mobx-react
* Mongoose ( optional )
* Babel
* Webpack
* Sass/SCSS loaders

## Goals

I needed a fully isomorphic website where most important data is shared through out the whole application.
So I made this simplified, bloatware-free code for starting a new isomorphic project.

We have one main state object that's observable and all react components decorated with `@observer(['state'])` have access to it ( though `<Provider />` ).

All the rendering is efficiently taken care by [MobX](https://github.com/mobxjs/mobx)

# F.A.Q.

#### How to add mongoose models ?
1. Goto `src/server/models`
2. Add `[Name].js`
3. Goto `src/helpers/database`
4. Add a new line under `export const Account` 
5. Require your model like this `import {Account} from './src/helpers/database`



#### How do I make my components isomorpic?
Check if you added the `static fetchData({state, params, query}){` static function properly to your component.



#### My isomorphic component is acting strange / isn't waiting until the request has been done
Verify if your `fetchData` is returning a Promise and resolve is executed once all required data is fetched.



#### My components are not updating!
Make sure you added the `@inject("state") @observer` decorator to your component.



#### My stateless component doesn't have access to state !
You cannot use decorators on stateless components.
You should instead wrap your component like this:

````js
const MyStatelessComponent = observer(['state'],function(props, context) {
  return <p>{context.state.something} !</p>
}))
````



#### The propType of an observable array is object
Observable arrays are actually objects, so they comply to propTypes.object instead of array.



#### Where can I find a more complex starter ?
Check out nightwolfz's implementation ! 
[https://github.com/nightwolfz/mobx-starter](https://github.com/nightwolfz/mobx-starter)



## Author
Sam Megidov
