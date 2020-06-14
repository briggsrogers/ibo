import React from "react";
import Fuse from "fuse.js";

import "./SearchUnit.scss";

//import ReactGA from 'react-ga';

class SearchUnit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      category: "",
      results: [],
    };

    this.searchInput = React.createRef(this.searchInput);

    //Binding
    this.handleDropDownChange = this.handleDropDownChange.bind(this);
    this.searchEntries = this.searchEntries.bind(this);
  }

  componentDidUpdate(prevProps) {
    //When data arrives
    if(prevProps.entries.length !== this.props.entries.length){
      this.filterEntries('All');
    }
  }

  generateOptions(){
    let { categories } = this.props;
    let optionsGroup = [];

    categories.forEach( (item, index) => {
      optionsGroup.push( <option key={index} value={item}>{item}</option> )
    });

    return optionsGroup;
  }
  
  handleDropDownChange(e) {
    let { value } = e.target;

    this.setState({ category: value });

    this.filterEntries(value);

    //Set search bar to focus
    this.searchInput.current.focus();
    this.searchInput.current.click();
  }

  filterEntries(value) {
    let { entries } = this.props;
    let results = [];

    //If all, use all entries
    if (value === "All") {
      this.setState({ results: entries });
      return;
    }

    results = entries.filter((item) => {
      return item.fields.Industry === value;
    });

    this.setState({ results });
  }

  searchEntries(e) {
    let { entries } = this.props; //All entries
    let { results } = this.state; //Categorized results

    console.log('Searching in', results);

    let { value } = e.target;

    if (value.length < 2) {
      return;
    }

    const options = {
      includeScore: true,
      keys: ["fields.Name", "fields.Description"],
    };

    const fuse = new Fuse(results, options);

    const result = fuse.search(value);
    console.log(result);
  }

  render() {
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

            {
              this.generateOptions()
            }
          </select>
          <input
            ref={this.searchInput}
            type="text"
            placeholder="Bridal specialist"
            onKeyUp={this.searchEntries}
          />
        </div>
      </div>
    );
  }
}

export default SearchUnit;
