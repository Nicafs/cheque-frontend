import React, { useEffect } from "react";
import { connect } from 'react-redux';

import TableCustom from '../../core/components/table/tableCustom';
import Filters from '../../core/components/filters/filters';
import { find, filter } from '../../redux/client/client.actions';

function Clientes({ findClients, data, filteredData, filterSubmit }) {

  const filters = [
    { type: 'text', name: 'name', label: 'Nome', validators: 'requerid', value: null },
    { type: 'date', name: 'birthDate', label: 'Data de Nascimento', validators: 'requerid', value: null },
    { type: 'select', name: 'gender', label: 'Sexo', validators: 'requerid', value: null, selects: [{ description: 'Masculino', value: 'M' }, { description: 'Feminino', value: 'F' }] },
    { type: 'text', name: 'phone', label: 'Telefone', validators: 'requerid', value: null, format: '(00) 00000-0000' },
    { type: 'text', name: 'address', label: 'Endereço', validators: 'requerid', value: null }
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
          return d[filter.name] === filter.value;
        })
      }
      return filteredData;
    })

    filterSubmit(filteredData);
  }

  return (
    <div className="Clientes">
      <div className="form">
        <Filters filters={filters} handleSubmit={handleSubmit} />
      </div>
      {filteredData ?
        (<TableCustom data={filteredData} />)
        : null}
    </div >
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
