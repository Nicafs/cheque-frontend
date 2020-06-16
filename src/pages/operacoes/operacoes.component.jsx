import React, { useEffect } from "react";
import { connect } from 'react-redux';

import {Container, Grid} from '@material-ui/core';

import TableCustom from '../../core/components/table/tableCustom';
import Filters from '../../core/components/filters/filters';
import { find, filter } from '../../redux/operacao/operacao.actions';

function Operacoes({ findOperacao, data, filteredData, filterSubmit }) {

  const filters = [
    { type: 'date', name: 'data_ini_cadastro', label: 'Data Inicial de Cadastro', validators: '', value: null },
    { type: 'date', name: 'data_final_cadastro', label: 'Data Final de Cadastro', validators: '', value: null },
    { type: 'date', name: 'data_ini_aprovacao', label: 'Data Inicial de Aprovação', validators: '', value: null },
    { type: 'date', name: 'data_final_aprovacao', label: 'Data Final de Aprovação', validators: '', value: null },
    { type: 'date', name: 'data_ini_quitacao', label: 'Data Inicial de Quitação', validators: '', value: null },
    { type: 'date', name: 'data_final_quitacao', label: 'Data Final de Quitação', validators: '', value: null },
    { type: 'select', name: 'client', label: 'Cliente', validators: '', value: null },
    { type: 'number', name: 'cheque_numero', label: 'Documento/Cheque', validators: '', value: null },
    { type: 'select', name: 'situacao', label: 'Situação', validators: '', value: null }
  ]

  const columns =  [
    { title: 'Data de Operação', field: 'data_operacao', type: 'date' },
    { title: 'Total Operação', field: 'total_operacao', type: 'money' },
    { title: '% ao mês', field: 'percentage', type: 'numeric' },
    { title: 'Situação', field: 'situacao' },
    { title: 'Total Encargos', field: 'total_encargos', type: 'money' },
    { title: 'Outros Acréscimos', field: 'total_acrescimos', type: 'money' },
    { title: 'Total Líquido', field: 'total_liquido', type: 'money' },
  ]

  useEffect(() => {
    findOperacao();
  }, [findOperacao]);

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
    <Container className="Operacoes">
      <Grid item md={12}>
        <Filters filters={filters} handleSubmit={handleSubmit} title="Buscar Operações"
                 linkTo='/operacoes/crud' linkPrev='/' className="form" />
      </Grid>

      {filteredData ?
        (<TableCustom data={filteredData} columns={columns} linkTo='/operacoes/crud' isEditable='true' />)
        : null}
    </Container >
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.operacoes.data,
    filteredData: state.operacoes.filteredData
  };
}

const mapDispatchToProps = dispatch => ({
  filterSubmit: (data) => dispatch(filter(data)),
  findOperacoes: () => dispatch(find())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Operacoes);
