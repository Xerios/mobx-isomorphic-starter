import React from 'react'
import Menu from '../components/Menu.jsx'
import { Switch, Route } from 'react-router'

import Home from '../pages/Home.jsx'
import Browse from '../pages/Browse.jsx'
import About from '../pages/About.jsx'
import NotFound from '../pages/NotFound.jsx'

export const routes = [
  { path: '/',
    exact: true,
    component: Home,
  },
  { path: '/browse',
    exact: true,
    component: Browse,
    loadData: Browse.loadData,
  },
  { path: '/about',
    exact: true,
    component: About
  },
  { 
    component: NotFound
  },
]

var menuData = [
  {title: "Home", to:"/"},
  {title: "Browse", to: { pathname: "/browse", search: '?1000'}},
  {title: "About", to:"/about"},
  {title: "Not Found", to:"/this_url_does_not_exist"},
]

export default class App extends React.Component {
    render(){
        return <div>
            <Menu data={menuData} />

            <Switch>
                {routes.map((route, i) => (
                <Route key={i} {...route}/>
                ))}
            </Switch>
        </div>
    }
}
