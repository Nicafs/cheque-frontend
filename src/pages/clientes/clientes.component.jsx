import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { isEqual } from 'date-fns';

import {Container, Grid} from '@material-ui/core';

import TableCustom from '../../core/components/table/tableCustom';
import Filters from '../../core/components/filters/filters';
import { find, filter } from '../../redux/client/client.actions';

import './clientes.styles.scss';

function Clientes({ findClients, data, filteredData, filterSubmit }) {

  const filters = [
    { type: 'text', name: 'name', label: 'Nome', validators: 'requerid', value: null },
    { type: 'date', name: 'birthDate', label: 'Data de Nascimento', validators: 'requerid', value: null },
    { type: 'select', name: 'gender', label: 'Sexo', validators: 'requerid', value: null, selects: [{ description: 'Masculino', value: 'M' }, { description: 'Feminino', value: 'F' }] },
    { type: 'text', name: 'phone', label: 'Telefone', validators: 'requerid', value: null, format: '(00) 00000-0000' },
    { type: 'text', name: 'address', label: 'Endereço', validators: 'requerid', value: null }
  ]

  const columns =  [
    {
      title: 'Nome', 
      field: 'name',
    },
    { title: 'Data de nascimento', field: 'birthDate', },
    { title: 'Sexo', field: 'phone' },
    {
      title: 'Telefone',
      field: 'phone',
    },
    {
      title: 'Endereço',
      field: 'addrress',
    },
  ]

  useEffect(() => {
    findClients();
  }, [findClients]);

  const handleSubmit = (filtersSubmit) => {
    filteredData = data;
    filtersSubmit.map(filter => {
      if (filter.value) {
        filteredData = filteredData.filter(d =>  {
          if(filter.type === 'text') return d[filter.name].includes(filter.value);
          if(filter.type === 'date') return isEqual(new Date(d[filter.name]), new Date(filter.value));
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
        (<TableCustom data={filteredData} columns={columns}/>)
        : null}
    </Container >
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.client.data,
    filteredData: state.client.filteredData
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
