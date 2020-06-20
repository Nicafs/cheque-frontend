import React, { useEffect } from "react";
import { connect } from 'react-redux';

import {Container, Grid} from '@material-ui/core';

import TableCustom from '../../core/components/table/tableCustom';
import Filters from '../../core/components/filters/filters';
import { find, filter } from '../../redux/operacao/operacao.actions';
import { find as findClient } from '../../redux/client/client.actions';
import DialogCheque from './dialog-cheque/dialog-cheque.component';

function Operacoes({ findOperacoes, data, filteredData, filterSubmit, selectClient, clients }) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const filters = [
    { type: 'date', name: 'data_ini_cadastro', label: 'Data Inicial de Cadastro', validators: '', value: null, size: 4 },
    { type: 'date', name: 'data_ini_aprovacao', label: 'Data Inicial de Aprovação', validators: '', value: null, size: 4 },
    { type: 'date', name: 'data_ini_quitacao', label: 'Data Inicial de Quitação', validators: '', value: null, size: 4 },
    { type: 'date', name: 'data_final_cadastro', label: 'Data Final de Cadastro', validators: '', value: null, size: 4 },
    { type: 'date', name: 'data_final_aprovacao', label: 'Data Final de Aprovação', validators: '', value: null, size: 4 },
    { type: 'date', name: 'data_final_quitacao', label: 'Data Final de Quitação', validators: '', value: null, size: 4 },
    { type: 'dialog', name: 'client_id', label: 'Cliente', validators: '', value: '', selects: clients, size: 12, 
      name_disable: 'client_name', value_disable: '', open: handleClickOpen },
    { type: 'number', name: 'cheque_numero', label: 'Documento/Cheque', validators: '', value: '', size: 6 },
    { type: 'select', name: 'situacao', label: 'Situação', validators: '', value: '', selects:
    [{value:'todas', description: '1 - Todas'},
     {value:'analise', description: '2 - Em Análise'},
     {value:'aprovado', description: '3 - Aprovado'},
     {value:'quitado', description: '4 - Quitado'} ], size: 6 }
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
    findOperacoes();
    selectClient();
  }, [findOperacoes, selectClient]);

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
        
        <DialogCheque open={open} handleClose={handleClose}></DialogCheque>
      </Grid>

      {filteredData ?
        (<TableCustom data={filteredData} columns={columns} linkTo='/operacoes/crud' isEditable='true' />)
        : ''}
    </Container >
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.operacoes.data,
    filteredData: state.operacoes.filteredData,
    bancos: state.bancos.data,
    clients: state.clients.data,
  };
}

const mapDispatchToProps = dispatch => ({
  filterSubmit: (data) => dispatch(filter(data)),
  findOperacoes: () => dispatch(find()),
  selectClient: () => dispatch(findClient())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Operacoes);
