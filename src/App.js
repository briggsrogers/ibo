import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import "./App.scss";

import About from './component/About';
import Directory from './component/Directory';
import Navigation from './component/Navigation';

import { getContent } from 'utils/data-helpers.js';

class App extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
       content: null,
    }
  }
  

  componentDidMount(){
    //Call Airtable for 
    //string content (about section, featured etc)
    getContent((data) => {

      let dataById = {};

      data.records.forEach( (item) => {
        dataById[item.fields.key] = item.fields;
      });

      this.setState({
        content: dataById,
      });
    });
  }

  render() {

    let { content } = this.state;

    return (
      <Router>
        <div className="App">
        <Navigation/>
        <Switch>
          <Route exact path="/">
            <Directory content={content}/>
          </Route>
        </Switch>
       
        </div>
      </Router>
      
      )
  }
}

export default App;
