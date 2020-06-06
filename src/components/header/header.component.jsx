import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/logo.svg';

import './header.styles.scss';

const Header = () => (
  <header className='header'>
    <div className='sistema-container'>
        <Link className='logo-container' to='/'>
            <Logo className='logo' />
        </Link>

        <h1> Sistema de Verificação <br/> de Crédito </h1>
    </div>

    <div className="nome-container">
        <span>Olá <strong>{ 'Nicollas Santos' }</strong> ! </span>
        <span className="mat-small">Seu último acesso foi em
            { '10/05/2020 15:40' }</span>
    </div>

    <div className='options'>
      <Link className='option' to='/config'>
        Configurações
      </Link>

      <Link className='option' to='/shop'>
        SAIR
      </Link>
    </div>
  </header>
);

export default Header;