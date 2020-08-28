import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { isEqual, parse, parseISO, format } from 'date-fns';

import {Container, Grid} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';

import TableCustom from '../../core/components/table/tableCustom';
import Filters from '../../core/components/filters/filters';
import { find, filter } from '../../redux/historico-operacoes/historico-operacoes.actions';
import DialogOperacao  from './dialog-operacao.component';

function HistoricoOperacoes({ findHistoricoOperacoes, data, filteredData, filterSubmit }) {
  const [open, setOpen] = useState(false);
  const [idOperacao, setIdOperacao] = useState(0);

  const filters = [
    { type: 'date', name: 'data_operacao', label: 'Data de Operação', validators: '', value: null, size: 3 },
    { type: 'text', name: 'user.name', label: 'Nome do Usuário', validators: '', value: '', size: 4 },
    { type: 'text', name: 'client.name', label: 'Cliente', validators: '', value: '', size: 5 }
  ]

  const columns =  [
    { label: 'Data de Operação', field: 'data_operacao', type: 'date' },
    { label: 'Operação', field: 'id', type: 'text' },
    { label: 'Nome do Usuário', field: 'user.name', type: 'compost' },
    { label: 'Cliente', field: 'client.name', type: 'compost' },
    { label: 'Total Líquido', field: 'total_liquido', type: 'money' },
  ]


  useEffect(() => {
    findHistoricoOperacoes();
  }, [findHistoricoOperacoes]);

  const handleSubmit = (filtersSubmit) => {
    filteredData = data;

    filtersSubmit.map(filter => {
      if (filter.value) {
        console.log("Teste 16");
          let splitName = filter.name;
          if(filter.name) {
            splitName = filter.name.split('.');
          }
          console.log("Teste 26");

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

  const handleClickOpen = (id) => {
    setIdOperacao(id);
    setOpen(true);
  };


  const handleClose = async () => {
    setOpen(false);
  };

  const customActions = [
    { ariaLabel: 'Operacao', onClick: (row) => handleClickOpen(row.id), icon: VisibilityIcon },
  ]

  return (
    <Container className="HistoricoOperacoes">
      <Grid item md={12}>
        <Filters filters={filters} handleSubmit={handleSubmit} label="Buscar Hitório de Operações"
                 linkPrev='/' className="form" flgCreate={true} />
      </Grid>

      {filteredData ?
        (<TableCustom data={filteredData} columns={columns} customActions={customActions} />)
        : null}

       <DialogOperacao open={open} handleClose={handleClose} id={idOperacao}></DialogOperacao>
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
