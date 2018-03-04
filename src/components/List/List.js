import React, { Component } from 'react';
import * as Call from './../Call/Call';
import ListForm from './../ListForm/ListForm';
import './List.css';

class List extends Component {
  constructor(props) {
    super(props);
    // initializes component state
    this.state = {
      fetching: false, // 요청이 끝났으면 false
      results: []
    };
  }

  Coins = async coin => {
    this.setState({
      fetching: true // requesting..
    });

    const post = await Call.GetAll();
    console.log(post.data.result);

    this.setState({
      results: post.data.result,
      fetching: false
    });
  };

  componentDidMount() {
    this.Coins();
  }

  render() {
    return (
      <div>
        <div className="SearchContainer">
          <input type="text" placeholder="Input Your Coin Initial" />
        </div>
        <div className="List">
          {this.state.results.map((info, i) => {
            return <ListForm symbol={info.symbol} name={info.name} key={i} />;
          })}
        </div>
      </div>
    );
  }
}

export default List;
