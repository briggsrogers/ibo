import React from "react";
import CountUp from 'react-countup';
import "./Directory.scss";

import PageContainer from "../PageContainer";

import bgvideo from "../../assets/videos/ibo-bg-r1.mp4";

import { getEntries } from "../../utils/data-helpers";
import SearchUnit from "./SearchUnit";

import ReactGA from "react-ga";

class Directory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      awaitingData: true,
      allEntries: [],
      relevantEntries: [],
      searchMode: false,
      categories: [],
      seedCategory: null,
    };

    // Binding
    this.setEntries = this.setEntries.bind(this);
    this.setSearchMode = this.setSearchMode.bind(this);

    //Ref
    this.CountUp = React.createRef(this.CountUp);
  }

  componentDidMount() {
    // Track
    ReactGA.initialize("G-2HHY5QRFXT");
    ReactGA.pageview(window.location.pathname + window.location.search);

    getEntries((data) => {
      this.setEntries(data);
    });
  }

  setEntries(entries) {
    // Create an array of all categories
    let categories = [];

    entries.forEach((item) => {
      let cat = item.fields.Category;

      if (cat && categories.indexOf(cat) === -1) {
        categories.push(cat);
      }
    });

    this.setState({
      awaitingData: false,
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

  handleCategoryClick(value) {
    this.setState({ seedCategory: value });
  }

  generateCategoryLinks() {
    let { categories } = this.state;
    let optionsGroup = [];

    categories.forEach((item, index) => {
      optionsGroup.push(
        <span key={index} onClick={() => this.handleCategoryClick(item)}>
          {item}
        </span>
      );
    });

    return optionsGroup;
  }

  render() {
    let {
      awaitingData,
      allEntries,
      searchMode,
      categories,
      seedCategory,
    } = this.state;

    return (
      <div className="Directory">
        <PageContainer>
          <div className="Wrapper" data-searchmode={searchMode}>
            {!awaitingData ? (
              <div className="WrapperInner">
                <div className="VideoWrapper">
                  <video autoPlay playsInline muted loop src={bgvideo}></video>
                </div>

                <div
                  className="Welcome"
                  onClick={() => this.setSearchMode(false)}
                >
                  <div className="Accent"></div>
                  <h1>
                  <CountUp start={2} end={allEntries.length} delay={0}/>
                    {` Irish black-owned businesses.`}</h1>
                </div>

                <div
                  className="SearchContainer"
                  onClick={() => this.setSearchMode(true)}
                >
                  <SearchUnit
                    entries={allEntries}
                    categories={categories}
                    seedCategory={seedCategory}
                    isSearchMode={searchMode}
                  />
                </div>
                <div
                  className="CategoryHotlinksContainer"
                  data-active={searchMode}
                >
                  <div className="CategoriesEyebrow">
                    <h4>Categories</h4>
                  </div>

                  <div className="CategoryLinksContainer">
                    {this.generateCategoryLinks()}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </PageContainer>
      </div>
    );
  }
}

export default Directory;
