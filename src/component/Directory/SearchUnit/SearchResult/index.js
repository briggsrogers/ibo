import React from "react";
import "./SearchResult.scss";

//import ReactGA from 'react-ga';
import igLogo from '../../../../assets/images/ig.png';

class SearchResult extends React.Component {
  
  render() {
    let { item } = this.props;
    return (
      <div className="SearchResult">
        <div className="SearchInfo">
          <h4 className="Name">{item.Name}</h4>
          <span className="Title">{item.Title}</span>
          { 
            item.Location ? (
              <span className="Location">{item.Location}</span>
            ) : null
          }
         
          <p>{item.Description}</p>
          { 
            item.Website ? (
              <a href={item.Website} rel="noopener noreferrer" target="_blank">Website</a>
            ) : null
          }
        </div>
        <div className="CTAContainer">

          {
            item.Instagram ? (
              <a href={`https://www.instagram.com/${item.Instagram}`} target="_blank" rel="noopener noreferrer">
                <img src={igLogo} alt=""/>
              </a>
            ) : null
          }
          
        </div>
        
      </div>
      )
  }
}

export default SearchResult;
