import React, { useEffect } from "react";
import { connect } from 'react-redux';

import {Container, Grid} from '@material-ui/core';

import TableCustom from '../../core/components/table/tableCustom';
import Filters from '../../core/components/filters/filters';
import { find, filter } from '../../redux/banco/banco.actions';

function Bancos({ findBancos, data, filteredData, filterSubmit }) {
  
  const filters = [
    { type: 'text', name: 'codigo', label: 'Codigo', validators: '', value: null },
    { type: 'text', name: 'descricao', label: 'Descricao', validators: '', value: null }
  ]

  const columns =  [
    { title: 'Código', field: 'codigo' },
    { title: 'Descrição', field: 'descricao' },
    { title: 'Juros', field: 'juros', type: 'numeric' },
    { title: 'Prazo', field: 'prazo', type: 'numeric' },
  ]

  useEffect(() => {
    findBancos();
  }, [findBancos]);

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
    <Container className="Bancos">
      <Grid item md={12}>
        <Filters filters={filters} handleSubmit={handleSubmit} title="Buscar Banco"
                 linkTo='/bancos/crud' linkPrev='/' className="form" />
      </Grid>

      {filteredData ?
        (<TableCustom data={filteredData} columns={columns} linkTo='/bancos/crud' isEditable='true' />)
        : null}
    </Container >
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.bancos.data,
    filteredData: state.bancos.filteredData
  };
}

const mapDispatchToProps = dispatch => ({
  filterSubmit: (data) => dispatch(filter(data)),
  findBancos: () => dispatch(find())
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bancos);
