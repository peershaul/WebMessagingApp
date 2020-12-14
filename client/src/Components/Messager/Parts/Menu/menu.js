import React, { Component } from 'react'

class Menu extends Component {
    constructor(){
        super()
        this.menu = React.createRef()
        this.state = {
            users: [],
        }
        this.rendered = false;
    }

    componentDidMount(){
        this.updateUsers();
        this.toggle()
    }

    render(){
        return(
            <div className = "menu" ref = {this.menu}>
                
            </div>
        )
    }

    updateUsers = () => {

        fetch('http://localhost:4000/users/', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({users: data})
            })
            .catch(err => {
                console.log('Catching error')
                console.log(err)
            })
    }

    toggle = () => {
        const menu = this.menu.current
        menu.classList.toggle('active')
    }

}

export default Menu 