import React from 'react'
import logo from '../img/logo.png'
class Header extends React.Component{
  render(){
      return (
          <div className="header-wrap">
            <img src={logo} alt="logo"/>
            <span className="caption">React-music</span>
          </div>
      )
  }
}

export default Header