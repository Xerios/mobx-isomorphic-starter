import React from 'react'
import { Link } from 'react-router'

export default class Menu extends React.Component {
    render() { 
        const menuNodes = this.props.data.map((item, i) => (
            <Link key={i} 
                    to={item.to} 
                    activeOnlyWhenExact={item.to==='/'}  
                    activeClassName={"active"} >
            {item.title}
            </Link>
        ))

        return (<nav className={this.props.className}>
                    {menuNodes}
                </nav>)
    }
}