import React, {Component} from 'react'
import {pages} from '../../App' 
import './login.css'


class Login extends Component{

    url = null;

    constructor(){

        super();

        this.state = {
            username: ''
        }

        this.errorMessage = React.createRef()
        this.readErrors()
    }


    async readErrors(){
        let resp = await fetch('http://localhost:4000/codes')
            .then(response => response.json())

        this.errorCodes = resp.ErrorCodes 
    }

    render(){
        return(
            <div>
                <div id = 'login-container'>
                    <span>Username</span>
                    <input 
                        type = "text" 
                        name = "username"
                        value = {this.state.username}
                        onChange = {this.fieldChange}
                        onFocus = {this.fieldFocus}
                        onBlur = {this.fieldBlur}></input>
                    <p id = 'error-message' style = {{display: 'none'}}></p>
                    <button className = 'login' onClick = {this.login} >Login</button>
                    <button className = 'sign-up' onClick = {this.create}>Create new user</button>
                </div>
            </div>
        )
    }

    fieldChange = event => {
        const {name, value} = event.target;
        this.setState({[name] : value})
    }

    fieldFocus = event => {
        event.target.closest('#login-container').querySelector('span').classList.add("focus")
    }

    fieldBlur = event => {
        event.target.closest('#login-container').querySelector('span').classList.remove("focus")
    }

    fieldEnter = event => {
        if(event.keyCode === 13){
            event.preventDefault();
            this.submit();
        }
    }

    login =  async () => {
        let name = document.getElementById('login-container').querySelector('input').value 
        
        if(name === null || name === "")
            console.log('Field is empty')
        
        else {

            let res = await fetch('http://localhost:4000/users/' + name, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
                .catch(err => {
                    console.log('Catching error')
                    console.log(err)
                })

            console.log(res)
                
            if(!res.error)
                this.move(res.user)
            else 
                this.errorHandler(res)
        }
    }


    errorHandler = res => {
        let message = null;
        for (let i = 0; i < this.errorCodes.length; i++)
            if(res.code === this.errorCodes[i].code)
                message = this.errorCodes[i].description

        if(message === null)
            message = 'Unknown Error'

        const errorMessage = document.getElementById('error-message')
        errorMessage.style.display = 'block'
        errorMessage.innerHTML = message
    }

    create = async () => {
        let name = document.getElementById('login-container').querySelector('input').value

        if(name === null || name === "")
            console.log('The field is empty')
        
        else {
            let res = await fetch('http://localhost:4000/users/' + name, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .catch(err => {
                    console.log('Catching error')
                    console.log(err)
                })

            if(!res.error)
                this.move(res.user)
            else 
                this.errorHandler(res)
        }
    }


    move = user => {
        this.props.setUser(user)
        this.props.setter(pages.message)
    }

}

export default Login