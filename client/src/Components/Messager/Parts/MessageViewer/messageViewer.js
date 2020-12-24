import React, { Component } from 'react'
import './messageViewer.css'


class MessageViewer extends Component {


    render(){
        return(
            <div id = 'message-viewer'>
                <Message data = {{
                    id: 1,
                    sent: true,
                    content: 'Hello World',
                    time: '12:00 AM'
                }} />
                <Message data = {{
                    id: 2, 
                    sent: false,
                    content: 'Hello Back!',
                    time: '12:30 PM'
                }} />
            </div>
        )
    }
}


class Message extends Component{

    render(){

        const data = this.props.data


        return(
            <div className = 'message'>
                <div className = {data.sent? 'sent' : 'not-sent'}>
                    <span className = 'content'>{data.content}</span>
                    <span className = 'time'>{data.time}</span>
                </div>
            </div>
        )
    }
}



export default MessageViewer