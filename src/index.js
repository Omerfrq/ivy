import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext';
import axios from 'axios';
import 'react-notifications/lib/notifications.css';
const baseURL =
  window.location.hostname === 'localhost'
    ? 'https://ivenemesis-api.herokuapp.com'
    : 'https://ivenemesis-api.herokuapp.com';

if (process.env.API) axios.defaults.baseURL = process.env.API;
else axios.defaults.baseURL = baseURL;

ReactDOM.render(
  <GlobalProvider>
    <Router>
      <App />
    </Router>
  </GlobalProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
