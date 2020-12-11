import React, {Component} from 'react'


class Messager extends Component {
    constructor(){
        super()
        this.state = {
            messages: [],
            user: {
                name: 'peershaul'
            },
        }
    }

    render(){
        return (
            <div>
                <header>
                    <h3 className = 'username'>{this.state.user.name}</h3>
                </header>
                <div className = 'messages-conatiner'>
                    <div className = 'message sent'>
                        <p>hello world</p>
                        <span className = 'time'>12:40 PM</span>
                    </div>
                </div>
                <div className = 'message-field'>
                    <input type = 'text' placeholder = 'write a message'></input>
                    <button className = 'send'>Send</button>
                </div>
            </div>
        )
    }
} 


export default Messager