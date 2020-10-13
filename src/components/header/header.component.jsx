import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { userGet, logout, isAuthenticated } from "../../core/services/auth.service";

import { Box, Button, Hidden, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PersonIcon from '@material-ui/icons/Person';
import { ReactComponent as Logo } from '../../assets/logo.svg';

import './header.styles.scss';

function Header({history}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const sair = (history) => {
    try {
      logout();
      history.push("/login");
    } catch {
  
    }
  };
  
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <header className='headerApp'>
      <Box  display="flex" 
            flexDirection='row'
            justifyContent='space-between'
            alignItems="center" width="100%">
        <div className='sistema-container'>
            <Link className='logo-container' to='/'>
                <Logo className='logo' />
            </Link>

            <Hidden smDown>
              <h1> Sistema de Verificação <br/> de Crédito </h1>
            </Hidden>
        </div>

        
        <Hidden mdUp>
          <Box display="flex" flexDirection="column">
            <h1> Sistema de Verificação <br/> de Crédito </h1>
            { isAuthenticated() ? 
              <span className="txt-center">Olá <strong>{ userGet() }</strong> ! </span> 
            : null }
          </Box>

          { isAuthenticated() ? 
            <>
              <MenuIcon onClick={handleClickMenu} aria-controls="menu-header"/> 
              
              <Menu
                id="menu-header"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
                <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
                <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
              </Menu>
            </>
          : null }
        </Hidden>

        { isAuthenticated() ?
          <Hidden smDown>
            <span>Olá <strong>{ userGet() }</strong> ! </span>

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
          </Hidden>
        : null }
      </Box>
    </header>
  );
};


export default withRouter(Header);
