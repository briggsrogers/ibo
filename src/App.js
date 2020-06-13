import React from "react";
import "./App.scss";

import Directory from './component/Directory';

//import ReactGA from 'react-ga';

class App extends React.Component {

  componentDidMount() {
    // Track
    // ReactGA.initialize('UA-165438248-1');
    // ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    return (
      <div className="App">
        <Directory/>
      </div>
      )
  }
}

export default App;
