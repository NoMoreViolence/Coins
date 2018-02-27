import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
  render() {
    return (
      <div className="SearchContainer">
        <input type="text" placeholder="Input Your Coin Initial" />
      </div>
    );
  }
}

export default Search;
