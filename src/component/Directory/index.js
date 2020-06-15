import React from "react";
import "./Directory.scss";

import PageContainer from "../PageContainer";

import bgvideo from "../../assets/videos/ibo-bg-r1.mp4";

import { getEntries } from "../../utils/data-helpers";
import SearchUnit from "./SearchUnit";

//import ReactGA from 'react-ga';

class Directory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allEntries: [],
      relevantEntries: [],
      searchMode: false,
      categories: [],
      seedCategory: null
    };

    // Binding
    this.setEntries = this.setEntries.bind(this);
    this.setSearchMode = this.setSearchMode.bind(this);
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

    // Create an array of all categories
    let categories = [];
    entries.forEach( (item) => {
      let cat = item.fields.Industry;
      
      if( cat && categories.indexOf(cat) === -1 ){
        categories.push(cat);
      }
    })

    this.setState({
      allEntries: entries,
      relevantEntries: entries,
      categories,
    });
  }

  updateRelavent(entries) {
    if (entries.length > 0) {
      this.setState({
        relevantEntries: entries,
        selectedEntry: entries[0],
      });
    } else {
      this.setState({
        haveResults: false,
      });
    }
  }

  setSearchMode(value) {
    this.setState({ searchMode: value });
  }

  handleCategoryClick(value){
    this.setState({ seedCategory: value });
  }

  generateCategoryLinks() {
    let { categories } = this.state;
    let optionsGroup = [];

    categories.forEach((item, index) => {
      optionsGroup.push(
        <span onClick = {() => this.handleCategoryClick(item)}>{item}</span>
      );
    });

    return optionsGroup;
  }

  render() {
    let { allEntries, searchMode, categories, seedCategory } = this.state;

    return (
      <div className="Directory">
        <PageContainer>
          <div className="Wrapper" data-searchmode={searchMode}>
            <div className="VideoWrapper">
              <video autoPlay playsInline muted loop src={bgvideo}></video>
            </div>

            <div className="Welcome" onClick={() => this.setSearchMode(false)}>
              <div className="Accent"></div>
              <h1>{`Discover ${allEntries.length} Irish black-owned businesses`}</h1>
            </div>

            <div
              className="SearchContainer"
              onClick={() => this.setSearchMode(true)}
            >
              <SearchUnit entries={allEntries} categories={categories} seedCategory={seedCategory} isSearchMode={searchMode}/>
            </div>
            <div className="CategoryHotlinksContainer" data-active={searchMode}>
              {
                 this.generateCategoryLinks()
              }
            </div>
          </div>
        </PageContainer>
      </div>
    );
  }
}

export default Directory;
