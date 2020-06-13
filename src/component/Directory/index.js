import React from "react";
import "./Directory.scss";

import PageContainer from '../PageContainer';

import bgvideo from '../../assets/videos/ibo-bg-r1.mp4';

import { getEntries } from "../../utils/data-helpers";

//import ReactGA from 'react-ga';

class Directory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allEntries: [],
      relevantEntries: [],
    };

    // Binding
    this.setEntries = this.setEntries.bind(this);
  }

  componentDidMount() {
    // Track
    // ReactGA.initialize('UA-165438248-1');
    // ReactGA.pageview(window.location.pathname + window.location.search);

    getEntries((data) => {
      this.setEntries(data);
    });
  }

  setEntries(entries) {
    this.setState({
      allEntries: entries,
      relevantEntries: entries,
    });
  }

  updateRelavent(entries) {

    if(entries.length > 0){
      this.setState({
        relevantEntries: entries,
        selectedEntry: entries[0],
        selectedIndex: 0,
        haveResults: true
      });
    }
    else{
      this.setState({
        haveResults: false,
      })
    }
  }

  render() {
    return (
      <div className="Directory">
        <PageContainer>
          <div className="Wrapper">
            <div className="VideoWrapper">
              <video autoPlay playsInline muted loop src={bgvideo}></video>
            </div>
          </div>
        </PageContainer>
      </div>
      )
  }
}

export default Directory;
