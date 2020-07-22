import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { isEqual, parse, parseISO, format } from 'date-fns';

import {Container, Grid} from '@material-ui/core';

import TableCustom from '../../core/components/table/tableCustom';
import Filters from '../../core/components/filters/filters';
import { find, filter } from '../../redux/historico-operacoes/historico-operacoes.actions';

function HistoricoOperacoes({ findHistoricoOperacoes, data, filteredData, filterSubmit }) {

  const filters = [
    { type: 'date', name: 'data_operacao', label: 'Data de Operação', validators: '', value: null, size: 2 },
    { type: 'text', name: 'user.nome', label: 'Nome do Usuário', validators: '', value: '', size: 5 },
    { type: 'text', name: 'client.name', label: 'Cliente', validators: '', value: '', size: 5 }
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
        const splitName = filter.name.split('.');

        filteredData = filteredData.filter(d =>  {
          if(filter.type === 'text') {
            return splitName.length > 1 ? d[splitName[0]][splitName[1]].toUpperCase().includes(filter.value.toUpperCase())
            : d[filter.name].toUpperCase().includes(filter.value.toUpperCase());
          }

          if(filter.type === 'date') {
            const dateCompare = parse(format(filter.value, 'MM/dd/yyyy'), 'MM/dd/yyyy', new Date());
            return splitName.length > 1 ? isEqual(parseISO(d[splitName[0]][splitName[1]]), dateCompare) ? true : false
            : isEqual(parseISO(d[filter.name]), dateCompare) ? true : false;
          }

          return d[filter.name] === filter.value;
        })

        console.log("filteredData:", filteredData);
      }
      return filteredData;
    })

    filterSubmit(filteredData);
  }

  return (
    <Container className="HistoricoOperacoes">
      <Grid item md={12}>
        <Filters filters={filters} handleSubmit={handleSubmit} label="Buscar Hitório de Operações"
                 linkPrev='/' className="form" flgCreate={true} />
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
