import React, { useEffect } from "react";
import { connect } from 'react-redux';

import {Container, Grid} from '@material-ui/core';

import TableCustom from '../../core/components/table/tableCustom';
import Filters from '../../core/components/filters/filters';
import { find, filter } from '../../redux/cheque/cheque.actions';

function Cheques({ findCheque, data, filteredData, filterSubmit }) {

  const filters = [
    { type: 'text', name: 'codigo', label: 'Codigo', validators: '', value: null },
    { type: 'text', name: 'descricao', label: 'Descricao', validators: '', value: null }
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
        <Filters filters={filters} handleSubmit={handleSubmit} linkTo='/cheques/crud' linkPrev='/' className="form" />
      </Grid>

      {filteredData ?
        (<TableCustom data={filteredData} />)
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
