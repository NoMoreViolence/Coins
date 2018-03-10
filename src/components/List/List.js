import React, { Component } from 'react';
// 로딩
import OverlayLoader from 'react-loading-indicator-overlay/lib/OverlayLoader';
import * as Call from './../Call/Call';
import ListForm from './../ListForm/ListForm';
import './List.css';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetching: false, // 요청이 끝났으면 false
      results: [], // 코인들의 정보가 들어가게 되는 곳
      searchkey: '', // 검색시 글자 들어가는 곳
      show: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  // 전체 코인의 받는 메소드
  Coins = async coin => {
    this.setState({
      fetching: true, // requesting..
      show: true
    });

    // 크립토워치 API 호출
    const post = await Call.GetAll();

    this.setState({
      results: post.data.result, // 넘겨받은 JSON 데이터 추출 후 state에 넣음
      fetching: false, // finish
      show: false
    });
  };

  // 처음 로딩되었을 때 코인 정보 출력 실행
  componentDidMount() {
    this.Coins();
  }

  // 검색 시 데이터 state에 업데이트
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
            .toLowerCase() // 소문자로
            .indexOf(this.state.searchkey.toLowerCase()) > -1 // 소문자로 검색
        );
      });

      // 코인 정보 출력
      return data.map((info, i) => {
        return <ListForm symbol={info.symbol} name={info.name} key={i} />;
      });
    };

    return (
      <div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Input Your Coin Initial"
            value={this.state.searchkey}
            onChange={this.handleChange}
          />
        </div>
        <OverlayLoader
          color={'red'} // default is white
          loader="ScaleLoader" // check below for more loaders
          text="Loading... Please wait!"
          active={this.state.show}
          backgroundColor={'white'} // default is black
          opacity="1" // default is .9
        >
          <div className="all-coin-list">{lists(this.state.results)}</div>
        </OverlayLoader>
      </div>
    );
  }
}

export default List;
