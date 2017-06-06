import React from 'react'
import Menu from '../components/Menu.jsx'
import { Route, Switch } from 'react-router'

var menuData = [
  {title: "Home", to:"/"},
  {title: "Browse", to: { pathname: "/browse", query: {wait:1000}}},
  {title: "About", to:"/about"},
  {title: "Not Found", to:"/this_url_doesnt_exist"},
]

function requireAsync(main) {
    return require('./pages/' + main + '.jsx')
}

export default class App extends React.Component {
    render(){
        return <div>
            <Menu data={menuData} />

            <Switch>
                <Route exactly path="/"   component={requireAsync('Home')}/>
                <Route path="/browse"     component={requireAsync('Browse')}/>
                <Route path="/about"      component={requireAsync('About')}/>
                <Route component={requireAsync('NotFound')}/>
            </Switch>
        </div>
    }
}
