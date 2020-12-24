import React, {Component} from 'react'
import Header from './Parts/Header/header'
import Menu from './Parts/Menu/menu'
import MessageViewer from './Parts/MessageViewer/messageViewer'


class Messager extends Component {
    constructor(){
        super()

        this.menu = React.createRef()
        this.messager = React.createRef()
    }

    render(){
        return (
            <div id = "messager">
                <Header menu = {this.toggleMenu} user = {this.props.user} />
                <Menu ref = {this.menu} currentUser = {this.props.user} />
                <MessageViewer ref = {this.messager} user = {this.props.user} />
                {/* MESSAGE POST INPUT*/}
            </div>
        )
    }

    toggleMenu = () => {
        this.menu.current.toggle()
    }

} 


export default Messager