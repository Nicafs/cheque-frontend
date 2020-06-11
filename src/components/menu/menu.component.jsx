import React from 'react';

import MenuItem from './menu-item/menu-item.component';

import './menu.styles.scss';

class Menu extends React.Component {
  constructor() {
    super();

    this.state = {
      sections: [
        {
          title: 'Clientes',
          imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
          id: 1,
          linkUrl: 'clientes'
        },
        {
          title: 'Bancos',
          imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
          id: 2,
          linkUrl: 'bancos'
        },
        {
          title: 'Cheques',
          imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
          id: 3,
          linkUrl: 'cheques'
        },
        {
          title: 'Operação de Crédito',
          imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
          size: 'large',
          id: 4,
          linkUrl: 'operacoes'
        },
        {
          title: 'Histórico',
          imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
          id: 5,
          linkUrl: 'historico'
        },
        {
          title: 'Relatório',
          imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
          id: 6,
          linkUrl: 'relatorio'
        }
      ]
    };
  }

  render() {
    return (
      <div className='menu'>
        {this.state.sections.map(({ id, ...otherSectionProps }) => (
          <MenuItem key={id} {...otherSectionProps} />
        ))}
      </div>
    );
  }
}

export default Menu;