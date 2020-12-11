import React, {Component} from 'react'
import {pages} from '../../App' 
import './login.css'


class Login extends Component{

    url = null;

    constructor(){
        super();
        this.state = {
            username: '',
        }

        // this.init()
    }

    /*async init(){
        const jsonData = await fetch('../../../../ProgramData/data.json')
            .then(response =>  response.json())

        console.log(jsonData)
        
        

        this.url = "localhost:4000"
    }*/

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
                        onBlur = {this.fieldBlur}
                        onKeyUp = {this.fieldEnter}></input>
                    <button onClick = {this.submit}>Login</button>
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

    submit =  async () => {
        let user = {
            name: document.getElementById('login-container').querySelector('input').value
        }

        
        let res = await fetch('http://localhost:4000/users', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .catch(err => {
                console.log('Catching error')
                console.log(err)
            })
            

        console.log(res)
    }

}

export default Login