import React from "react";
import "./PageContainer.scss";

//import ReactGA from 'react-ga';

class PageContainer extends React.Component {
  
  render() {
    return (
      <div className="PageContainer">
        {this.props.children}
      </div>
      )
  }
}

export default PageContainer;
