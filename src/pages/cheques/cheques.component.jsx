import React, { useEffect } from "react";
import { connect } from 'react-redux';

import {Container, Grid} from '@material-ui/core';

import TableCustom from '../../core/components/table/tableCustom';
import Filters from '../../core/components/filters/filters';
import { find, filter } from '../../redux/cheque/cheque.actions';

function Cheques({ findCheque, data, filteredData, filterSubmit }) {

  const filters = [
    { type: 'text', name: 'emitente', label: 'Emitente', validators: '', value: null },
    { type: 'number', name: 'numero', label: 'Número', validators: '', value: null },
    { type: 'text', name: 'situacao', label: 'Situação', validators: '', value: null },
    { type: 'date', name: 'data_vencimento', label: 'Data de Vencimento', validators: '', value: null },
    { type: 'date', name: 'data_quitacao', label: 'Data de Quitação', validators: '', value: null }
  ]

  const columns =  [
    { title: 'Agência', field: 'agencia' },
    { title: 'Conta', field: 'conta' },
    { title: 'Número', field: 'numero', type: 'numeric' },
    { title: 'Situação', field: 'situacao' },
    { title: 'Dias', field: 'dias', type: 'numeric' },
    { title: 'Data de Vencimento', field: 'data_vencimento', type: 'date' },
    { title: 'Data de Quitação', field: 'data_quitacao', type: 'date' },
    { title: 'Valor de Operação', field: 'valor_operacao', type: 'numeric' },
    { title: 'Valor de Encargos', field: 'valor_encargos', type: 'numeric' },
    { title: 'Emitente', field: 'emitente' },
  ]

  useEffect(() => {
    findCheque();
  }, [findCheque]);

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
    <Container className="Cheques">
      <Grid item md={12}>
        <Filters filters={filters} handleSubmit={handleSubmit} title="Buscar Cheque"
                 linkTo='/cheques/crud' linkPrev='/' className="form" />
      </Grid>

      {filteredData ?
        (<TableCustom data={filteredData} columns={columns} linkTo='/cheques/crud' isEditable='true' />)
        : null}
    </Container >
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.cheques.data,
    filteredData: state.cheques.filteredData
  };
}

const mapDispatchToProps = dispatch => ({
  filterSubmit: (data) => dispatch(filter(data)),
  findCheque: () => dispatch(find())
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cheques);
