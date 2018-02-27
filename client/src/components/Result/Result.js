import React, { Component } from 'react';
import './Result.css';
// 크립토워치 API
import * as Coins from './../Coins/Coins';
// import ResultForm from './../ResultForm/ResultForm';

class Search extends Component {
  constructor() {
    super();
    // 코인 state 정의
    this.state = {
      result: {},
      fetching: false // 초기값은 요청이 들어오지 않았기 때문에 false 상태로 둔다
    };
  }

  // 전체 코인 정보 받아오는 메소드
  Cryptos = async () => {
    this.setState({
      fetching: true // 요청이 들어오는 중인 상태다
    });

    const coins = await Coins.getCoins();
    console.log(coins);

    const coindata = coins.result;

    this.setState({
      result: coindata,
      fetching: false // 요청이 끝났기 때문에 false로 설정
    });
  };

  // 선택한 코인 정보 받아오는 메소드
  SelectedCryptos = async initial => {
    if (initial == null) {
      console.log('nothing');
    } else {
      const Searchs = await Coins.SearchCoins(initial);
      console.log(Searchs);
    }
  };

  componentDidMount() {
    this.Cryptos();
    this.SelectedCryptos();
  }

  render() {
    return <div className="SearchContainer" />;
  }
}

export default Search;
