import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";

import store from "./store";
import axios from 'axios';
// const setupAxios = () => {
//   // axios.defaults.baseURL = 'https://sale-champions-api.herokuapp.com/';
//   axios.defaults.baseURL = 'http://localhost:4000'
//   axios.defaults.headers = {
//     'Cache-Control': 'no-cache,no-store',
//     'Pragma': 'no-cache',
//     'Expires': '0',
//   };
// };
// setupAxios();

//option for alert
// optional configuration

ReactDOM.render(
  <Provider store={store}>

    <App />

  </Provider>,
  document.getElementById("root")

);


