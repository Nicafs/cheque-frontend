import React from 'react';

import { ReactComponent as Logo } from '../../assets/logo.svg';

import './footer.styles.scss';

const Footer = () => (
    <footer className='footer'>
        {/* Título */}
        <div className="logo-container">
            <Logo className='logo' />

            <div>
                <h3>Cheque</h3>
                <span> Sistema de Controle de cheques </span>
            </div>
        </div>

        {/* Licença do Sistema */}
        <div className="txt-center">

            {/* Versão do sistema */}
            <small className="versionResponsivo">v.1.0.0</small>

            <h2>©2020 Nicollas Santos</h2>
            <span>Todos os Direitos Reservados </span>
        </div>

        {/* Versão do sistema */}
        <small className="txt-end">v.1.0.0</small>
    </footer>
);

export default Footer;