import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { userGet, logout, isAuthenticated } from "../../core/services/auth.service";

import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PersonIcon from '@material-ui/icons/Person';
import { ReactComponent as Logo } from '../../assets/logo.svg';

import './header.styles.scss';

const sair = (history) => {
  try {
    logout();
    history.push("/login");
  } catch {

  }
};

const Header = ({history}) => (
  <header className='headerApp'>
    <div className='sistema-container'>
        <Link className='logo-container' to='/'>
            <Logo className='logo' />
        </Link>

        <h1> Sistema de Verificação <br/> de Crédito </h1>
    </div>

    { isAuthenticated() ?
      <>
        <div className="nome-container">
            <span>Olá <strong>{ userGet() }</strong> ! </span>
        </div>

        <div className='options'>
          {/* <Link className='option' to='/config'>
            Configurações
          </Link> */}

          <Button variant="contained" color="primary" startIcon={<PersonIcon />} onClick={() => history.push('/configuracao')}>
            Configuração
          </Button>

          <Button variant="contained" color="secondary" startIcon={<PersonIcon />} onClick={() => history.push('/user')}>
            Usuários
          </Button>

          <Button variant="contained" color="default" startIcon={<HighlightOffIcon />} onClick={() => sair(history)}>
            SAIR
          </Button>
        </div>
      </>
    : null }
  </header>
);

export default withRouter(Header);
