import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { isEqual, isAfter, isBefore, parse, parseISO, format } from 'date-fns';

import {Container, Grid} from '@material-ui/core';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';

import api from '../../core/services/api';
import TableCustom from '../../core/components/table/tableCustom';
import Filters from '../../core/components/filters/filters';
import { find, filter } from '../../redux/operacao/operacao.actions';
import DialogClient from './dialog-cheque/dialog-client.component';
import DialogNotaPromissoria from './dialog-nota-promissoria/dialog-nota-promissoria';
import ReceiptIcon from '@material-ui/icons/Receipt';

function Operacoes({ findOperacoes, data, filteredData, filterSubmit }) {

  const [open, setOpen] = useState(false);
  const [openNota, setOpenNota] = useState(false);
  const [flgRelatorio, setFlgRelatorio] = useState(false);
  const [operacao, setOperacao] = useState();

  useEffect(() => {
    findOperacoes();
  }, [findOperacoes]);

  const handleSubmit = (filtersSubmit) => {
    filteredData = data;

    filtersSubmit.map(filter => {
      if (filter.value) {
        console.log("Teste 17");
          let splitName = filter.name;
          if(filter.name) {
            splitName = filter.name.split('.');
          }
          console.log("Teste 27");

        filteredData = filteredData.filter(d =>  {
          switch (filter.type) {
            case 'date':
              const dateCompare = parse(format(filter.value, 'MM/dd/yyyy'), 'MM/dd/yyyy', new Date());
              const dateCompareDependent = filter.filterDependent ?
                filtersSubmit.find(f => {
                  if(f.name === filter.filterDependent ) {
                    parse(format(f.value, 'MM/dd/yyyy'), 'MM/dd/yyyy', new Date());
                  }
                  return true;
                }) : null;

              const name = filter.removeStringLast ?
                          filter.name.substring(0, filter.name.length - filter.removeStringLast) :
                          filter.name;

              switch (filter.filterType) {
                case 'lessThan':
                  return splitName.length > 1 ?
                    isAfter(parseISO(d[splitName[0]][splitName[1]]), dateCompare) &&
                    dateCompareDependent ? isBefore(parseISO(d[filter.filterDependent]), dateCompareDependent) : true
                    ? true : false
                    : isAfter(parseISO(d[name]), dateCompare) &&
                    dateCompareDependent ? isBefore(parseISO(d[filter.filterDependent]), dateCompareDependent) : true
                    ? true : false;

                case 'greaterThan':
                  return splitName.length > 1 ?
                    isBefore(parseISO(d[splitName[0]][splitName[1]]), dateCompare) &&
                      dateCompareDependent ? isAfter(parseISO(d[filter.filterDependent]), dateCompareDependent) : true
                      ? true : false
                      : isBefore(parseISO(d[name]), dateCompare) &&
                      dateCompareDependent ? isAfter(parseISO(d[name]), dateCompareDependent) : true
                      ? true : false;

                case 'equal':
                  return splitName.length > 1 ? isEqual(parseISO(d[splitName[0]][splitName[1]]), dateCompare) ? true : false
                  : isEqual(parseISO(d[name]), dateCompare) ? true : false;

                default:
                  return splitName.length > 1 ? isEqual(parseISO(d[splitName[0]][splitName[1]]), dateCompare) ? true : false
                  : isEqual(parseISO(d[filter.name]), dateCompare) ? true : false;
              }

            case 'dialog' || 'numeric':
              return splitName.length > 1 ? d[splitName[0]][splitName[1]] === filter.value
              : d[filter.name] === filter.value;

            default:
              return splitName.length > 1 ? d[splitName[0]][splitName[1]].toUpperCase().includes(filter.value.toUpperCase())
              : d[filter.name].toUpperCase().includes(filter.value.toUpperCase());
          }
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
      if (prevFilter.name === 'client.id') return { ...prevFilter, value: selected.id, value_disable: selected.name }
      return prevFilter;
    })))

    setOpen(false);
  };

  const handleOnBlurClient = async e => {
    const { value } = e.target;

    if (value) {
      const response = await api.get(`/clients/${value}`).then(r => { return r.data });
      if(response){
        setFilters((prevFilters) => (prevFilters.map(prevFilter => {
          if (prevFilter.name === 'client_id')  return { ...prevFilter, value: response.id, value_disable: response.name };
          return prevFilter;
        })));
      } else {
        setFilters((prevFilters) => (prevFilters.map(prevFilter => {
          if (prevFilter.name === 'client_id')  return { ...prevFilter, value: '', value_disable: '' };
          return prevFilter;
        })));
      }
    }
  };

  const handleClickOpenNota = (selected, flgRelatorio) => {
    setOperacao(selected);
    setFlgRelatorio(flgRelatorio, setOpenNota(true));
  };

  const handleCloseNota = () => {
    setOpenNota(false);
  };

  const [filters, setFilters] = React.useState([
    { type: 'date', name: 'data_operacao_ini', label: 'Data Inicial de Cadastro', validators: '', value: null, size: 3,
      filterType: 'greaterThan', filterDependent: 'data_final_cadastro', removeStringLast: 4
    },
    { type: 'date', name: 'data_operacao_fim', label: 'Data Final de Cadastro', validators: '', value: null, size: 3,
      filterType: 'lessThan', filterDependent: 'data_ini_cadastro', removeStringLast: 4
    },
    { type: 'date', name: 'data_quitacao_ini', label: 'Data Inicial de Quitação', validators: '', value: null, size: 3,
      filterType: 'greaterThan', filterDependent: 'data_final_quitacao', removeStringLast: 4
    },
    { type: 'date', name: 'data_quitacao_fim', label: 'Data Final de Quitação', validators: '', value: null, size: 3,
      filterType: 'lessThan', filterDependent: 'data_ini_quitacao', removeStringLast: 4
    },
    { type: 'dialog', name: 'client_id', label: 'Cliente', size: 12, value: '',
      name_disable: 'client_name', value_disable: '', open: handleClickOpen,
       onBlur: handleOnBlurClient},
    // { type: 'numeric', name: 'cheque_numero', label: 'Documento/Cheque', validators: '', value: '', size: 10 },
    // { type: 'select', name: 'situacao', label: 'Situação', validators: '', value: '', selects:
    // [{value:'todas', description: '1 - Todas'},
    //  {value:'analise', description: '2 - Em Análise'},
    //  {value:'aprovado', description: '3 - Aprovado'},
    //  {value:'quitado', description: '4 - Quitado'} ], fullWidth: true, size: 2 }
  ]);

  const columns =  [
    { label: 'Operação', field: 'id', type: 'text', align: 'center' },
    { label: 'Data de Operação', field: 'data_operacao', type: 'date', align: 'center' },
    { label: '% ao mês', field: 'percentual', type: 'numeric', align: 'center' },
    { label: 'Situação', field: 'situacao', align: 'center'  },
    { label: 'Total Operação', field: 'total_operacao', type: 'money', align: 'right'  },
    { label: 'Total Encargos', field: 'total_encargos', type: 'money', align: 'right'  },
    { label: 'Total Líquido', field: 'total_liquido', type: 'money', align: 'right'  },
  ];

  const customActions = [
    { ariaLabel: 'Nota Pomissória', onClick: (row) => handleClickOpenNota(row, 1), icon: FeaturedPlayListIcon },
    { ariaLabel: 'Operação de Crédito', onClick: (row) => handleClickOpenNota(row, 2), icon: ReceiptIcon },
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

      <DialogNotaPromissoria flgRelatorio={flgRelatorio} operacao={operacao} open={openNota} handleClose={handleCloseNota}></DialogNotaPromissoria>
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
