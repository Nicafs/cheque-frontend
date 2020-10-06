import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import store from './redux/store';

import './index.css';
import { App } from './App';

// setup fake backend
import { configureFakeBackend } from './core/helpers/fake-backend';
configureFakeBackend();

ReactDOM.render(
    <Provider store={store}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );