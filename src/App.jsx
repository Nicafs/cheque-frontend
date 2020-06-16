import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import { history } from './core/helpers/history';
import { PrivateRoute } from './core/components/privateRoute';
import { alertActions } from './redux/alert/alert.actions';

import HomePage from './pages/homepage/homepage.component';
import { Login } from './pages/login/login.component';
import Clientes from './pages/clientes/clientes.component';
import CrudCliente from './pages/clientes/crud/cliente-crud.component';
import Bancos from './pages/bancos/bancos.component';
import CrudBanco from './pages/bancos/crud/banco-crud.component';
import Cheques from './pages/cheques/cheques.component';
import CrudCheque from './pages/cheques/crud/cheque-crud.component';
import Operacoes from './pages/operacoes/operacoes.component';
import Historico from './pages/historico/historico.component';
import Relatorio from './pages/relatorio/relatorio.component';

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
    <div className="all-container app-background">
      <Header />

      <div className="main-container">
      { alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>  }
        <Router history={history}>
          <Switch>
            <PrivateRoute exact path='/' component={HomePage} />
            <PrivateRoute exact path='/clientes' component={Clientes} />
            <PrivateRoute exact path='/clientes/crud' component={CrudCliente} />
            <PrivateRoute exact path='/clientes/crud/:id' component={CrudCliente} />
            <PrivateRoute exact path='/bancos' component={Bancos} />
            <PrivateRoute exact path='/bancos/crud' component={CrudBanco} />
            <PrivateRoute exact path='/bancos/crud/:id' component={CrudBanco} />
            <PrivateRoute exact path='/cheques' component={Cheques} />
            <PrivateRoute exact path='/cheques/crud' component={CrudCheque} />
            <PrivateRoute exact path='/cheques/crud/:id' component={CrudCheque} />
            <PrivateRoute exact path='/operacoes' component={Operacoes} />
            <PrivateRoute exact path='/historico' component={Historico} />
            <PrivateRoute exact path='/relatorio' component={Relatorio} />
            <Route path='/login' component={Login} />
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </div>

      <Footer />
    </div>
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