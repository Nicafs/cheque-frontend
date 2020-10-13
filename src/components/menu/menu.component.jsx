import React from 'react';

import MenuItem from './menu-item/menu-item.component';

import { Box } from '@material-ui/core';

import './menu.styles.scss';
import ClientImg from '../../assets/client.jpg';
import BancoImg from '../../assets/banco.jpg';
import OperacoesImg from '../../assets/operacoes_credito.jpg';
import RelatorioImg from '../../assets/relatorio.png';

class Menu extends React.Component {
  constructor() {
    super();

    this.state = {
      sections: [
        {
          title: 'Clientes',
          imageUrl: ClientImg,
          id: 1,
          linkUrl: 'clientes'
        },
        {
          title: 'Bancos',
          imageUrl: BancoImg,
          id: 2,
          linkUrl: 'bancos'
        },
        {
          title: 'Operação de Crédito',
          imageUrl: OperacoesImg,
          id: 3,
          linkUrl: 'operacoes'
        },
        {
          title: 'Histórico',
          imageUrl: RelatorioImg,
          id: 4,
          linkUrl: 'historicoOperacoes'
        },
      ]
    };
  }

  render() {
    return (
      <Box className='menu' 
           flexDirection={{ xs: 'column', sm: 'column', md: 'row' }}>
        {this.state.sections.map(({ id, ...otherSectionProps }) => (
          <MenuItem key={id} {...otherSectionProps} />
        ))}
      </Box>
    );
  }
}

export default Menu;
