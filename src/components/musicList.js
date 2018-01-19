import React from 'react'
import {MUSIC_LIST} from '../config/config'
import { HashRouter as Router, NavLink  } from 'react-router-dom'
import PubSub from 'pubsub-js'

class MusicList  extends  React.Component{
  constructor(){
    super();
    this.state={
      currentIndex:sessionStorage.getItem("currentActive")
    }
  }
  changeIndex=(index)=>{
    this.setState({
      currentIndex:index
    });
    sessionStorage.setItem("currentActive",index)
  };
  componentDidMount(){
    console.log(23)
    PubSub.subscribe("changeIndex",(msg,data)=>{
      console.log(data)
    })
  }
  render(){
    let music=MUSIC_LIST.map((el,index)=>(
        <li key={index}>
          <Router>
            <NavLink  to={`/music/${el.id}`} target="_blank" className={`${this.state.currentIndex===index?"active":''}`} onClick={()=>this.changeIndex(index)} >{el.title}-------------------{el.artist}</NavLink >
          </Router>
        </li>
    ));
    return(
        <div className="musicListWrap">
          <h3>歌曲列表:</h3>
          <ul>{music}</ul>
        </div>
    )
  }
}

export default MusicList
