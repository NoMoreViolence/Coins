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
      results: [], // 코인들의 정보가 들어가게 되는 곳
      searchkey: '' // 검색시 글자 들어가는 곳
    };
    this.handleChange = this.handleChange.bind(this);
  }

  // 전체 코인의 받는 메소드
  Coins = async coin => {
    this.setState({
      fetching: true // requesting..
    });

    const post = await Call.GetAll();

    this.setState({
      results: post.data.result,
      fetching: false
    });
    console.log(this.state.results);
  };

  // 처음 로딩되었을 때 코인 정보 출력 실행
  componentDidMount() {
    this.Coins();
  }

  handleChange(e) {
    this.setState({
      searchkey: e.target.value
    });
  }

  render() {
    const lists = data => {
      data.sort();

      data = data.filter(info => {
        return (
          info.symbol
            .toLowerCase()
            .indexOf(this.state.searchkey.toLowerCase()) > -1
        );
      });

      return data.map((info, i) => {
        return <ListForm symbol={info.symbol} name={info.name} key={i} />;
      });
    };

    return (
      <div>
        <div className="SearchContainer">
          <input
            type="text"
            placeholder="Input Your Coin Initial"
            value={this.state.searchkey}
            onChange={this.handleChange}
          />
        </div>
        <div className="List">{lists(this.state.results)}</div>
      </div>
    );
  }
}

export default List;
