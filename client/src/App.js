
import React, { Component} from 'react'
import Login from './Components/Login/login'
import Messager from './Components/Messager/messager'
import './App.css'

class App extends Component{

  constructor(){
    super();
    this.state = {page: pages.message, user: null}
  }

  pageSwitcher(){
    let page = null

    switch(this.state.page){
      case pages.login: 
        page = <Login setter = {this.pageChanger} setUser = {this.setUser} />
        break
      case pages.message:
        page = <Messager setter = {this.pageChanger} user = {this.state.user} />
        break
      default:
        page = <h1>Error page not found, page number: {this.state.page}</h1>
        break
    }

    return page
  }

  render(){

    let page = this.pageSwitcher()
    
    return(<div>{page}</div>)
  }

  pageChanger = (num) => {
    this.setState({page: num})
  }
  
  setUser = user => this.setState({user: user}) 
}

export const pages = {
  login: 0,
  message: 1,
}

export default App;
