import React from 'react'
import { connect } from 'mobx-connect'

import Menu from '../components/Menu.jsx'

var menuData = [
  {title: "Home", path:""},
  {title: "Browse", path:"Browse"},
  {title: "About", path:"about"},
  {title: "Not Found", path:"this_url_doesnt_exist"},
]

@connect
export default class App extends React.Component {
    render(){
        return <div>
            <Menu prefix='/' data={menuData} />
            {this.props.children}
        </div>
    }
}
