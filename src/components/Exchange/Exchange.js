import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// 로딩바
import OverlayLoader from 'react-loading-indicator-overlay/lib/OverlayLoader';
import * as Call from './../Call/Call';
import './Exchange.css';
// Form
import ExchangeForm from './../ExchangeForm/ExchangeForm';

class Select extends Component {
  constructor(props) {
    super(props);

    // initializes component state
    this.state = {
      fetching: false, // 요청이 끝났으면 false
      exchange: [], // 코인의 마켓 정보가 들어가게 되는 곳
      pasturl: '/' + this.props.match.params.CoinName,
      show: false
    };
  }

  Coins = async (coin, market) => {
    // 요청중...
    this.setState({
      fetching: true,
      show: true
    });

    // 선택 코인의 모든 데이터 받음
    let unprocessed = await Call.GetCoin(coin);
    // 선택 코인의 거래 가능 거래소 데이터로 좁힘
    unprocessed = unprocessed.data.result.markets.base;

    let matchedMarket = []; // 최종 검색 결과 담는 배열
    // 거래 가능 거래소 중 사용자가 검색한 거래소 에서 거래 가능한 교환 종목을 추림
    for (let index = 0; index < unprocessed.length; index++) {
      // 사용자가 알고 싶은 거래소일 경우
      if (unprocessed[index].exchange === market) {
        const temp = {
          exchange: unprocessed[index].exchange, // 거래소 이름
          pair: unprocessed[index].pair // 거래 단위
        };
        matchedMarket.push(temp);
      }
    }

    // 각 마켓의 코인 가격 호출 api 활용해서 데이터 집어넣음
    for (let index = 0; index < matchedMarket.length; index++) {
      // api 호출
      let temp = await Call.GetPriceOfCoin(
        matchedMarket[index].exchange,
        matchedMarket[index].pair
      );
      // 가격 정보 저장
      temp = temp.data.result.price;
      // 가격 정보 삽입
      matchedMarket[index].price = temp;
    }

    // setState
    this.setState({
      fetching: false,
      show: false,
      exchange: matchedMarket
    });
    console.log(this.state.exchange);
  };

  componentDidMount() {
    this.Coins(
      this.props.match.params.CoinName,
      this.props.match.params.Market
    );
  }

  render() {
    const exchange = data => {
      return data.map((DATA, i) => {
        return <ExchangeForm event={DATA.pair} price={DATA.price} key={i} />;
      });
    };

    return (
      <div className="exchange-container">
        <div className="exchange-buttons">
          <NavLink to={this.state.pasturl}>
            <button>Previous Page</button>
          </NavLink>
          <NavLink to="/">
            <button>Go Back To Home</button>
          </NavLink>
        </div>

        <div className="exchange-initial">
          <NavLink to={this.state.pasturl}>
            <button>{this.props.match.params.CoinName}</button>
          </NavLink>
        </div>
        <div className="exchange-market-name">
          {this.props.match.params.Market}
        </div>
        <OverlayLoader
          color={'red'} // default is white
          loader="ScaleLoader" // check below for more loaders
          text="Loading... Please wait!"
          active={this.state.show}
          backgroundColor={'white'} // default is black
          opacity="1" // default is .9
        >
          <div className="exchange-view">
            <div className="exchange-view-info">
              <div className="exchange-view-info-exchange">Exchange</div>
              <div className="exchange-view-info-price">Price</div>
            </div>
            {exchange(this.state.exchange)}
          </div>
        </OverlayLoader>
      </div>
    );
  }
}

export default Select;
