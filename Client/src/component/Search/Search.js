import React, { Component } from "react";
import SearchBar from "./SearchBar";

import "./Search.css";

class Search extends Component {
  state = {
    profilesdb: [],
    isValid: false,
    postLoading: true,
  };

  render() {
    console.log(this.props.value)
    return (
      <React.Fragment>
        <div className="app">
          
          <SearchBar
            placeholder="Search By College or Domain Name... "
            value={this.props.value}
            logo={this.getLogoHandler}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Search;
