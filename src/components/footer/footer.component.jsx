import React from 'react';

import { ReactComponent as Logo } from '../../assets/logo.svg';
import { Box, Hidden } from '@material-ui/core';

import './footer.styles.scss';

const Footer = () => (
  <footer className='footer'>
    {/* Título */}
    
    <Hidden smUp>
        <Logo className='logo' />

        <Box display="flex" flexDirection="column" className="txt-center">
            <span> Sistema de Controle de Cheques </span>
            <h2>©2020 Nicollas Santos</h2>
            <span>Todos os Direitos Reservados </span>
            <small>v.1.0.0</small>
        </Box>
    </Hidden>
    
    <Hidden xsDown>
      <div className="logo-container">
        <Logo className='logo' />

        <div>
            <h3>Cheque</h3>
            <span> Sistema de Controle de cheques </span>
        </div>
      </div>

      {/* Licença do Sistema */}
      <div className="txt-center">
          <h2>©2020 Nicollas Santos</h2>
          <span>Todos os Direitos Reservados </span>
      </div>

      {/* Versão do sistema */}
      <small className="txt-end">v.1.0.0</small>
    </Hidden>
  </footer>
);

export default Footer;