import React from 'react'
import { NavLink } from 'react-router-dom'

export default class Menu extends React.Component {
    render() { 
        const menuNodes = this.props.data.map((item, i) => (
            <NavLink key={i} 
                    to={item.to} 
                    strict={false}>
            {item.title}
            </NavLink>
        ))

        return (<nav className={this.props.className}>{menuNodes}</nav>)
    }
}