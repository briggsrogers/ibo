import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import "./App.scss";

import Directory from './component/Directory';

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="App">
       
        <Switch>
          <Route exact path="/">
            <Directory/>
          </Route>
        </Switch>

        </div>
      </Router>
      
      )
  }
}

export default App;
