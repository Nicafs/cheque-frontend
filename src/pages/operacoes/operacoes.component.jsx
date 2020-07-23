import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { isEqual, parse, parseISO, format } from 'date-fns';

import {Container, Grid} from '@material-ui/core';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';

import TableCustom from '../../core/components/table/tableCustom';
import Filters from '../../core/components/filters/filters';
import { find, filter } from '../../redux/operacao/operacao.actions';
import DialogClient from './dialog-cheque/dialog-client.component';
import DialogNotaPromissoria from './dialog-nota-promissoria/dialog-nota-promissoria';

function Operacoes({ findOperacoes, data, filteredData, filterSubmit }) {

  const [open, setOpen] = useState(false);
  const [openNota, setOpenNota] = useState(false);
  const [operacao, setOperacao] = useState();


  useEffect(() => {
    findOperacoes();
  }, [findOperacoes]);

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
      }
      return filteredData;
    })

    filterSubmit(filteredData);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (selected) => {
    setFilters(prevFilters => (prevFilters.map(prevFilter => {
      if (prevFilter.name === 'client_id') return { ...prevFilter, value: selected.id, value_disable: selected.name }
      return prevFilter;
    })))

    setOpen(false);
  };

  const handleClickOpenNota = (selected) => {
    setOperacao(selected);
    setOpenNota(true);
  };

  const handleCloseNota = () => {
    setOpenNota(false);
  };

  const [filters, setFilters] = React.useState([
    { type: 'date', name: 'data_ini_cadastro', label: 'Data Inicial de Cadastro', validators: '', value: null, size: 4 },
    { type: 'date', name: 'data_ini_aprovacao', label: 'Data Inicial de Aprovação', validators: '', value: null, size: 4 },
    { type: 'date', name: 'data_ini_quitacao', label: 'Data Inicial de Quitação', validators: '', value: null, size: 4 },
    { type: 'date', name: 'data_final_cadastro', label: 'Data Final de Cadastro', validators: '', value: null, size: 4 },
    { type: 'date', name: 'data_final_aprovacao', label: 'Data Final de Aprovação', validators: '', value: null, size: 4 },
    { type: 'date', name: 'data_final_quitacao', label: 'Data Final de Quitação', validators: '', value: null, size: 4 },
    { type: 'dialog', name: 'client_id', label: 'Cliente', validators: '', value: '', size: 12,
      name_disable: 'client_name', value_disable: '', open: handleClickOpen },
    { type: 'number', name: 'cheque_numero', label: 'Documento/Cheque', validators: '', value: '', size: 10 },
    { type: 'select', name: 'situacao', label: 'Situação', validators: '', value: '', selects:
    [{value:'todas', description: '1 - Todas'},
     {value:'analise', description: '2 - Em Análise'},
     {value:'aprovado', description: '3 - Aprovado'},
     {value:'quitado', description: '4 - Quitado'} ], fullWidth: true, size: 2 }
  ]);

  const columns =  [
    { label: 'Data de Operação', field: 'data_operacao', type: 'date', align: 'center' },
    { label: 'Total Operação', field: 'total_operacao', type: 'money', align: 'right' },
    { label: '% ao mês', field: 'percentual', type: 'numeric', align: 'center' },
    { label: 'Situação', field: 'situacao', align: 'center'  },
    { label: 'Total Encargos', field: 'total_encargos', type: 'money', align: 'right'  },
    { label: 'Outros Acréscimos', field: 'total_outros', type: 'money', align: 'right'  },
    { label: 'Total Líquido', field: 'total_liquido', type: 'money', align: 'right'  },
  ];

  const customActions = [
    { ariaLabel: 'Nota Pomissória', onClick: (row) => handleClickOpenNota(row), icon: FeaturedPlayListIcon },
  ]

  return (
    <Container className="Operacoes">
      <Grid item md={12}>
        <Filters filters={filters} handleSubmit={handleSubmit} label="Buscar Operações"
                 linkTo='/operacoes/crud' linkPrev='/' className="form" />

        <DialogClient open={open} handleClose={handleClose}></DialogClient>
      </Grid>

      {filteredData ?
        (<TableCustom data={filteredData} columns={columns} customActions={customActions} linkTo='/operacoes/crud' isEditable='true' />)
        : ''}

      <DialogNotaPromissoria operacao={operacao} open={openNota} handleClose={handleCloseNota}></DialogNotaPromissoria>
    </Container >
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.operacoes.data,
    filteredData: state.operacoes.filteredData,
    bancos: state.bancos.data
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
