import React from "react";
import Fuse from "fuse.js";

import SearchResult from "./SearchResult";

import "./SearchUnit.scss";

//import ReactGA from 'react-ga';

class SearchUnit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      category: "",
      categorizedResults: [],
      searchResults: [],
    };

    this.searchInput = React.createRef(this.searchInput);
    this.categorySelect = React.createRef(this.categorySelect);

    //Binding
    this.handleDropDownChange = this.handleDropDownChange.bind(this);
    this.searchEntries = this.searchEntries.bind(this);
  }

  componentDidMount() {
    //this.searchInput.current.focus();
    this.filterEntries("All");
  }

  componentDidUpdate(prevProps) {
    //When data arrives
    if (prevProps.entries.length !== this.props.entries.length) {
      this.filterEntries("All");
    }

    //If we get a new seed cat
    if (prevProps.seedCategory !== this.props.seedCategory) {
      this.filterEntries(this.props.seedCategory);

      this.categorySelect.current.value = this.props.seedCategory;

      //Set search bar to focus
      //this.searchInput.current.focus();
      this.searchInput.current.click();
      this.searchInput.current.value = "";
    }
  }

  generateOptions() {
    let { categories } = this.props;
    let optionsGroup = [];

    categories.forEach((item, index) => {
      optionsGroup.push(
        <option key={index} value={item}>
          {item}
        </option>
      );
    });

    return optionsGroup;
  }

  generateResults() {
    let { searchResults } = this.state;
    let resultsGroup = [];

    for (let i in searchResults) {
      let item = searchResults[i].item
        ? searchResults[i].item
        : searchResults[i];

      resultsGroup.push(<SearchResult key={i} item={item.fields} />);
    }
    
    if(searchResults.length === 0){
      resultsGroup.push(<div className="NoResultsPlaceHolder"><p>{`Hmm, we couldn't find anything for "${this.searchInput.current.value}". Know a business that's missing? Add them today.`}</p></div> );
    }
    return resultsGroup;
  }

  handleDropDownChange(e) {
    let { value } = e.target;

    //this.setState({ category: value });

    this.filterEntries(value);

    //Set search bar to focus
    this.searchInput.current.focus();
    this.searchInput.current.click();
  }

  filterEntries(value) {
    let { entries } = this.props;
    let categorizedResults = [];

    //If all, use all entries
    if (value === "All") {
      this.setState({ categorizedResults: entries, searchResults: entries });
      return;
    }

    categorizedResults = entries.filter((item) => {
      return item.fields.Category === value;
    });

    this.setState({
      categorizedResults,
      searchResults: categorizedResults,
    });
  }

  searchEntries(e) {
    let { categorizedResults } = this.state;

    let { value } = this.searchInput.current;

    if (value.length < 2) {
      //Set to all in cat
      this.setState({ searchResults: categorizedResults });
      return;
    }

    const options = {
      includeScore: false,
      keys: ["fields.Name", "fields.Description", "fields.Title"],
      threshold: 0.5,
    };

    const fuse = new Fuse(categorizedResults, options);
    const newResults = fuse.search(value);

    this.setState({ searchResults: newResults });
  }

  render() {
    let { isSearchMode } = this.props;
    let { searchResults } = this.state;
    let resultNoun = searchResults.length === 1 ? "result" : "results";

    return (
      <div className="SearchUnit">
        <div className="SearchBarContainer">
          <select
            name="categories"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={this.handleDropDownChange}
            ref={this.categorySelect}
          >
            <option value="All">All</option>

            {this.generateOptions()}
          </select>
          <input
            ref={this.searchInput}
            type="text"
            placeholder="Search names, products or services"
            onKeyUp={this.searchEntries}
          />
        </div>
        {isSearchMode ? (
          <div className="ResultsContainer">
            {searchResults.length > 0 ? (
              <div className="ResultsEyebrow">
                <h4>{`${searchResults.length} ${resultNoun}`}</h4>
              </div>
            ) : null}
            {this.generateResults()}
          </div>
        ) : null}
      </div>
    );
  }
}

export default SearchUnit;
