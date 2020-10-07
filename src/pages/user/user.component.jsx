import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { isEqual, parse, parseISO, format } from 'date-fns';

import {Container, Grid} from '@material-ui/core';

import TableCustom from '../../core/components/table/tableCustom';
import Filters from '../../core/components/filters/filters';
import { userActions } from '../../redux/user/user.actions';

function Users({ findUsers, data, filteredData, filterSubmit }) {
  useEffect(() => {
    findUsers();
  }, [findUsers]);

  const handleSubmit = (filtersSubmit) => {
    filteredData = data;

    filtersSubmit.map(filter => {
      if (filter.value) {
          let splitName = filter.name;
          if(filter.name) {
            splitName = filter.name.split('.');
          }

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

  const filters = [
    { type: 'number', name: 'id', label: 'Código', validators: '', value: '', size: 3 },
    { type: 'text', name: 'name', label: 'Nome', validators: '', value: '', size: 9 },
  ];

  const columns =  [
    { label: 'Código', field: 'id', type: 'text', align: 'left' },
    { label: 'Nome', field: 'name', type: 'text', align: 'left' },
    { label: 'E-mail', field: 'email', type: 'text', align: 'left' },
    { label: 'Usuário', field: 'username', type: 'text', align: 'left'  },
  ];

  return (
    <Container className="Usuários">
      <Grid item md={12}>
        <Filters filters={filters} handleSubmit={handleSubmit} linkTo='/user/crud' linkPrev='/' className="form" title="Buscar Usuários" />
      </Grid>

      {filteredData ?
        (<TableCustom data={filteredData} columns={columns} linkTo='/user/crud' isEditable='true' />)
        : ''}
    </Container >
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.users.data,
    filteredData: state.users.filteredData
  };
}

const mapDispatchToProps = dispatch => ({
  filterSubmit: (data) => dispatch(userActions.filter(data)),
  findUsers: () => dispatch(userActions.getAll())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
