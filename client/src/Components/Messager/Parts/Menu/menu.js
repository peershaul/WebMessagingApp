import React, { Component } from 'react'
import './menu.css'

class Menu extends Component {
    constructor(){
        super()
        this.menu = React.createRef()
        this.state = {
            users: [],
        }
        this.rendered = false;
    }

    async componentDidMount(){
        this.updateUsers();
    }

    render(){

        let list = [];
        for(let i = 0; i < this.state.users.length; i++)
        {
            const user = this.state.users[i]
            list.push(<li key = {'us-' + user.name} className = {'user us-' + user.id}>
                <span>{user.name}</span>
            </li>)
        }

        return(
            <div className = "menu active" ref = {this.menu}>
                <ul>
                    {list}
                </ul>
            </div>
        )
    }

    updateUsers = async () => {

        await fetch('http://localhost:4000/users/', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(data => {
                this.setState({users: data})

            })
            .catch(err => {
                console.log('Catching error')
                console.log(err)
            })
        
        this.render()
    }

    toggle = () => {
        this.updateUsers()
        const menu = this.menu.current
        menu.classList.toggle('active')
    }

}

export default Menu 