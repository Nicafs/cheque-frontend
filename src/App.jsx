import React from 'react';
import { BrowserRouter } from "react-router-dom";

import { connect } from 'react-redux';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import './App.css';

import Routes from "./routes";
import { history } from './core/helpers/history';
import { alertActions } from './redux/alert/alert.actions';

import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';

class App extends React.Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
        // clear alert on location change
        this.props.clearAlerts();
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <BrowserRouter>
        <div className="all-container app-background">
          <Header />

          <div className="main-container">
            { alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>  }

            <Routes history={history}/>
          </div>

          <Footer />
        </div>
        
      <ToastContainer autoClose={2000} />
      </BrowserRouter>
    )}
}

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };
