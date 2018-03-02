import axios from "axios";

export function GetAll() {
  return axios.get("https://api.cryptowat.ch/assets");
}

export function GetCoin(coin) {
  return axios.get(`https://api.cryptowat.ch/assets/${coin}`);
}
