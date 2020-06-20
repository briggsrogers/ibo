import React from "react";
import ReactMarkdown from "react-markdown";
import "./About.scss";

//import ReactGA from 'react-ga';

class About extends React.Component {
  constructor(props) {
    super(props);
    console.log('About', this.props);
  }
  
  render() {
    
    return (
      <div>
          {
            this.props.content ? (
              <div className="About">
                 <div className="Accent"/>
                <ReactMarkdown source={this.props.content.about.content} />
              </div>
            ) : null
          }
       </div>   
      )
  }
}

export default About;
