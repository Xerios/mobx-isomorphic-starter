import React from 'react'
import Menu from '../components/Menu.jsx'
import Match from 'react-router/Match'
import Miss from 'react-router/Miss'

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

            <Match exactly pattern="/"   component={requireAsync('Home')}/>
            <Match pattern="/browse"     component={requireAsync('Browse')}/>
            <Match pattern="/about"      component={requireAsync('About')}/>
            <Miss  component={requireAsync('NotFound')}/>
        </div>
    }
}
