import React from "react";
import "./Navigation.scss";

import logo from '../../assets/images/ibo-logo-wht.png';

import {
  Link
} from "react-router-dom";

//import ReactGA from 'react-ga';

class About extends React.Component {
  
  render() {
    return (
      <div className="NavContainer">
            <div className="LogoContainer">
              <img src={logo} alt=""/>
            </div>

            <div className="NavItems">
              <div className="Item">
                <Link to="/">Directory</Link>
              </div>
              <div className="Item">
                <Link to="/about">About IBO</Link>
              </div>
            </div>
          </div>
      )
  }
}

export default About;
