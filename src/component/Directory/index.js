import React from "react";
import CountUp from "react-countup";
import "./Directory.scss";

import PageContainer from "../PageContainer";
import Spinner from "../Spinner";

import { getEntries, getFeatured } from "../../utils/data-helpers";
import SearchUnit from "./SearchUnit";
import About from "../About";

const ICON_ROOT = "https://ibo-assets.s3-eu-west-1.amazonaws.com/icons/";
const VIDEO_SRC =
  "https://ibo-assets.s3-eu-west-1.amazonaws.com/video/ibo-bg.mp4";

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
    this.setFeatured = this.setFeatured.bind(this);
    this.setSearchMode = this.setSearchMode.bind(this);

    //Ref
    this.CountUp = React.createRef(this.CountUp);
  }

  componentDidMount() {
    // Track
    // ReactGA.initialize("G-2HHY5QRFXT");
    // ReactGA.pageview(window.location.pathname + window.location.search);

    getEntries((data) => {
      this.setEntries(data);
    });

    getFeatured((data) => {
      this.setFeatured(data);
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

  setSearchMode(e, value) {
    e.stopPropagation();
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
          <img
            src={`${ICON_ROOT}${item
              .toLowerCase()
              .replace(" & ", "%26")
              .replace(" ", "")}.png`}
            alt=""
          />
          {item}
        </span>
      );
    });

    return optionsGroup;
  }

  setFeatured(featured) {
    this.setState({
      featured: featured,
    });
  }

  generateFeatureLinks() {
    let { featured } = this.state;
    let featuredGroup = [];

    featured.records.forEach((item, index) => {
      featuredGroup.push(<span key={index}>{item.name}</span>);
    });

    return featuredGroup;
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
          {!awaitingData ? (
            <div
              className="Wrapper"
              data-searchmode={searchMode}
              onClick={(e) => this.setSearchMode(e, false)}
            >
              <div className="WrapperInner">
                <div className="VideoWrapper">
                  <video
                    autoPlay
                    playsInline
                    muted
                    src={VIDEO_SRC}
                  ></video>
                </div>

                <div
                  className="Welcome"
                  onClick={(e) => this.setSearchMode(e, false)}
                >
                  <div className="Accent"></div>
                  <h1>
                    <CountUp start={100} end={allEntries.length} delay={0} />
                    {` Irish black-owned businesses.`}
                  </h1>
                </div>

                <div
                  className="SearchContainer"
                  onClick={(e) => this.setSearchMode(e, true)}
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

                  {/* <div className="CategoriesEyebrow">
                    <h4>Featured</h4>
                  </div> */}

                  {/* <div className="FeaturedLinksContainer">
                    {this.generateFeatureLinks()}
                  </div> */}
                </div>
              </div>
              <About content={this.props.content} />
              <div className="FooterContainer">
                <a
                  href="https://instagram.com/irishblackowned"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="IGLinkOut"
                >
                  @irishblackowned
                </a>
                <footer>
                  <p>&copy; Copyright 2020 | IBO</p>
                  <br />
                </footer>
              </div>
            </div>
          ) : <Spinner/>}
        </PageContainer>
      </div>
    );
  }
}

export default Directory;
