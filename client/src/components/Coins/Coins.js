import axios from 'axios';

export function getCoins() {
  return axios.get('https://api.cryptowat.ch/assets');
}

export function SearchCoins(/* initial */) {
  // return axios.get('https://api.cryptowat.ch/assets/' + initial);
}
