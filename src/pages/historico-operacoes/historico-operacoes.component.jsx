import React, { useEffect } from "react";
import { connect } from 'react-redux';

import {Container, Grid} from '@material-ui/core';

import TableCustom from '../../core/components/table/tableCustom';
import Filters from '../../core/components/filters/filters';
import { find, filter } from '../../redux/historico-operacoes/historico-operacoes.actions';

function HistoricoOperacoes({ findHistoricoOperacoes, data, filteredData, filterSubmit }) {
  
  const filters = [
    { type: 'text', name: 'data_operacao', label: 'Data de Operação', validators: '', value: '', size: 2 },
    { type: 'text', name: 'user_nome', label: 'Nome do Usuário', validators: '', value: '', size: 5 },
    { type: 'text', name: 'client_name', label: 'Cliente', validators: '', value: '', size: 5 }
  ]

  const columns =  [
    { label: 'Data de Operação', field: 'data_operacao', type: 'date' },
    { label: 'Nome do Usuário', field: 'user.nome', type: 'compost' },
    { label: 'Cliente', field: 'client.name', type: 'compost' },
  ]

  useEffect(() => {
    findHistoricoOperacoes();
  }, [findHistoricoOperacoes]);

  const handleSubmit = (filtersSubmit) => {
    filteredData = data;
    
    filtersSubmit.map(filter => {
      if (filter.value) {
        filteredData = filteredData.filter(d =>  {
          if(filter.type === 'text') return d[filter.name].includes(filter.value);
          return d[filter.name] === filter.value;
        })
      }
      return filteredData;
    })

    filterSubmit(filteredData);
  }

  return (
    <Container className="HistoricoOperacoes">
      <Grid item md={12}>
        <Filters filters={filters} handleSubmit={handleSubmit} title="Buscar Hitório de Operações"
                 linkPrev='/' className="form" />
      </Grid>

      {filteredData ?
        (<TableCustom data={filteredData} columns={columns} />)
        : null}
    </Container >
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.historicoOperacoes.data,
    filteredData: state.historicoOperacoes.filteredData
  };
}

const mapDispatchToProps = dispatch => ({
  filterSubmit: (data) => dispatch(filter(data)),
  findHistoricoOperacoes: () => dispatch(find())
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoricoOperacoes);
