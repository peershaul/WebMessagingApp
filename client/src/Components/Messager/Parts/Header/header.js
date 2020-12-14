import React, { Component } from 'react'
import './header.css'


class Header extends Component {

    constructor(){
        super()
    }

    render(){
        console.log(this.props.menu)
        return(
            <div id = 'header'>
                <div className = 'username'>Username</div>
                <div className = 'navicon active'
                onClick = {this.naviconClick}>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }


    naviconClick = event => {
        const navicon = event.target.closest('.navicon')
        navicon.classList.toggle('active')
    }
}

export default Header