import axios from 'axios';

// 모든 코인의 이름 받을 때
export function GetAll() {
  return axios.get('https://api.cryptowat.ch/assets');
}

// 코인별 마켓 정보 받을 때
export function GetCoin(coin) {
  return axios.get(`https://api.cryptowat.ch/assets/${coin}`);
}

// 코인 별 가격 정보
export function GetPriceOfCoin(market, exchange) {
  return axios.get(
    `https://api.cryptowat.ch/markets/${market}/${exchange}/summary`
  );
}
