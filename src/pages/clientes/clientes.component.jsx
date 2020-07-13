import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { isEqual, parse, parseISO, format } from 'date-fns';

import {Container, Grid} from '@material-ui/core';

import TableCustom from '../../core/components/table/tableCustom';
import Filters from '../../core/components/filters/filters';
import { find, filter } from '../../redux/client/client.actions';

import './clientes.styles.scss';

function Clientes({ findClients, data, filteredData, filterSubmit }) {

  const filters = [
    { type: 'text', name: 'name', label: 'Nome', value: '', size: 6 },
    { type: 'text', name: 'nickname', label: 'Apelido', value: '', size: 6 },
    { type: 'text', name: 'cpf', label: 'CPF', value: '', format: '000-000-000-00', size: 4 },
    { type: 'text', name: 'rg', label: 'RG', value: '', format: '000000-0', size: 4 },
    { type: 'select', name: 'gender', label: 'Sexo',
      selects: [{ description: 'Masculino', value: 'M' }, { description: 'Feminino', value: 'F' }],
      value: '', size: 4, fullWidth: true },
    { type: 'number', name: 'credit', label: 'Crédito', value: '', size: 4 },
    { type: 'number', name: 'limit', label: 'Limite', value: '', size: 4 },
    { type: 'text', name: 'cargo', label: 'Cargo', value: '', size: 4 }
  ]

  const columns =  [
    {
      label: 'Nome',
      field: 'name',
    },
    {
      label: 'Apelido',
      field: 'nickname',
    },
    { label: 'Data de nascimento', field: 'birthDate', type: "date", align: 'center', },
    {
      label: 'Sexo',
      field: 'gender',
      type: 'select',
      selects: [{ description: 'Masculino', value: 'M' }, { description: 'Feminino', value: 'F' }],
      align: 'center',
    },
    {
      label: 'Crédito',
      field: 'credit',
      type: 'money',
      align: 'right',
    },
    {
      label: 'Limite',
      field: 'limit',
      type: 'money',
      align: 'right',
    },
    {
      label: 'Cargo',
      field: 'cargo',
    },
  ]

  useEffect(() => {
    findClients();
  }, [findClients]);

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

  return (
    <Container className="Clientes">
      <Grid item md={12}>
        <Filters filters={filters} handleSubmit={handleSubmit} linkTo='/clientes/crud' linkPrev='/' className="form" />
      </Grid>

      {filteredData ?
        (<TableCustom data={filteredData} columns={columns} linkTo='/clientes/crud' isEditable='true'/>)
        : ''}
    </Container >
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.clients.data,
    filteredData: state.clients.filteredData
  };
}

const mapDispatchToProps = dispatch => ({
  filterSubmit: (data) => dispatch(filter(data)),
  findClients: () => dispatch(find())
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Clientes);
