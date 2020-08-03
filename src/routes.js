import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./core/services/auth.service";

import HomePage from './pages/homepage/homepage.component';
import Login from './pages/login/login.component';
import Clientes from './pages/clientes/clientes.component';
import ClienteTabs from './pages/clientes/crud/cliente-tabs.component';
import Bancos from './pages/bancos/bancos.component';
import CrudBanco from './pages/bancos/crud/banco-crud.component';
import Cheques from './pages/cheques/cheques.component';
import CrudCheque from './pages/cheques/crud/cheque-crud.component';
import Operacoes from './pages/operacoes/operacoes.component';
import CrudOperacao from './pages/operacoes/crud/operacao-crud.component';
import HistoricoOperacoes from './pages/historico-operacoes/historico-operacoes.component';
import Relatorio from './pages/relatorio/relatorio.component';
import User from './pages/user/user.component';
import CrudUser from './pages/user/crud/user-crud.component';
import Configuracao from './pages/configuracao/configuracao.component';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = ({history}) => (
    <Switch>
      <PrivateRoute  exact path='/' component={HomePage} />
      <PrivateRoute  exact path='/home' component={HomePage} />
      <PrivateRoute  exact path='/clientes' component={Clientes} />
      <PrivateRoute  exact path='/clientes/crud' component={ClienteTabs} />
      <PrivateRoute  exact path='/clientes/crud/:id' component={ClienteTabs} />
      <PrivateRoute  exact path='/bancos' component={Bancos} />
      <PrivateRoute  exact path='/bancos/crud' component={CrudBanco} />
      <PrivateRoute  exact path='/bancos/crud/:id' component={CrudBanco} />
      <PrivateRoute  exact path='/cheques' component={Cheques} />
      <PrivateRoute  exact path='/cheques/crud' component={CrudCheque} />
      <PrivateRoute  exact path='/cheques/crud/:id' component={CrudCheque} />
      <PrivateRoute  exact path='/operacoes' component={Operacoes} />
      <PrivateRoute  exact path='/operacoes/crud' component={CrudOperacao} />
      <PrivateRoute  exact path='/operacoes/crud/:id' component={CrudOperacao} />
      <PrivateRoute  exact path='/historicoOperacoes' component={HistoricoOperacoes} />
      <PrivateRoute  exact path='/user' component={User} />
      <PrivateRoute  exact path='/user/crud' component={CrudUser} />
      <PrivateRoute  exact path='/user/crud/:id' component={CrudUser} />
      <PrivateRoute  exact path='/relatorio' component={Relatorio} />
      <PrivateRoute  exact path='/configuracao' component={Configuracao} />
      <Route path='/login' component={Login} />
      <Redirect from="*" to="/" />
    </Switch>
);

export default Routes;
