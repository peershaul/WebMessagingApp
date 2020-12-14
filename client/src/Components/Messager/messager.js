import React, {Component} from 'react'
import Header from './Parts/Header/header'
import Menu from './Parts/Menu/menu'


class Messager extends Component {
    constructor(){
        super()
        this.state = {
            messages: [],
            user: {
                name: 'peershaul'
            },
        }

        this.menu = React.createRef()
    }

    render(){
        return (
            <div id = "messager">
                <Header menu = {this.menu.current} />
                <Menu ref = {this.menu} />
                {/* MESSAGE VIEWER*/}
                {/* MESSAGE POST INPUT*/}
            </div>
        )
    }
} 


export default Messager