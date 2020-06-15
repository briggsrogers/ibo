import React from "react";
import Fuse from "fuse.js";

import SearchResult from './SearchResult';

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

    //Binding
    this.handleDropDownChange = this.handleDropDownChange.bind(this);
    this.searchEntries = this.searchEntries.bind(this);
  }

  componentDidMount() {
    this.searchInput.current.focus();
  }

  componentDidUpdate(prevProps) {
    //When data arrives
    if (prevProps.entries.length !== this.props.entries.length) {
      this.filterEntries('All');
    }

    //If we get a new seed cat
    if (prevProps.seedCategory !==this.props.seedCategory){
      this.filterEntries(this.props.seedCategory);
      
      //Set search bar to focus
      this.searchInput.current.focus();
      this.searchInput.current.click();
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

      resultsGroup.push(
        
          <SearchResult key={i} item={item.fields} />
        
      );
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
      this.setState({ categorizedResults: entries, searchResults: [] });
      return;
    }

    categorizedResults = entries.filter((item) => {
      return item.fields.Industry === value;
    });

    this.setState({
      categorizedResults,
      searchResults: categorizedResults
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
      keys: ["fields.Name", "fields.Description"],
      threshold: .5,
    };

    const fuse = new Fuse(categorizedResults, options);
    const newResults = fuse.search(value);

    this.setState({ searchResults: newResults });
  }

  render() {

    let { isSearchMode } = this.props;

    return (
      <div className="SearchUnit">
        <div className="SearchBarContainer">
          <select
            name="categories"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={this.handleDropDownChange}
          >
            <option value="All">All</option>

            {this.generateOptions()}
          </select>
          <input
            ref={this.searchInput}
            type="text"
            placeholder="Search..."
            onKeyUp={this.searchEntries}
          />
        </div>
        {
          isSearchMode ? (
            <div className="ResultsContainer">{this.generateResults()}</div>
          ) : null
        }   
      </div>
    );
  }
}

export default SearchUnit;
