import React from 'react'
import Header from './header'
import Music from './music'
import MusicList from './musicList'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
class App extends React.Component {
  render() {
    return (
        <div className="app-wrap">
          <Header></Header>
          <Router>
            <Switch>
              <Route exact path="/" component={MusicList}></Route>
              <Route path="/music/:id" component={Music}></Route>
            </Switch>
          </Router>
        </div>
    )
  }
}

export default App
