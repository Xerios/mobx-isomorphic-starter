import React from 'react'
import Link from 'react-router/lib/Link'

export default class Menu extends React.Component {
    render() { 
        const menuNodes = this.props.data.map((item, i) => (
            <Link key={i} 
                    to={this.props.prefix + item.path}  
                    className={this.props.current===item.path ? "active":null} 
                    onlyActiveOnIndex={item.path===''}  
                    activeClassName={"active"} >
            {item.title}
            </Link>
        ))

        return (<nav className={this.props.className}>
                    {menuNodes}
                </nav>)
    }
}