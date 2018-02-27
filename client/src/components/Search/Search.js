import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
  render() {
    const { onKeyPress } = this.props;

    return (
      <div className="SearchContainer">
        <input
          type="text"
          placeholder="Input Your Coin Initial"
          onKeyPress={onKeyPress}
        />
      </div>
    );
  }
}

export default Search;
