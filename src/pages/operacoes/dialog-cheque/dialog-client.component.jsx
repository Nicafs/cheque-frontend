import React, { useEffect } from "react";
import { connect } from 'react-redux';

import {Container, Grid} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Filters from '../../../core/components/filters/filters';
import TableCustom from '../../../core/components/table/tableCustom';
import { find, filter } from '../../../redux/client/client.actions';

function DialogClient({open, handleClose, findClients, clients, filteredData, filterSubmit}) {

  const [selected, setSelected] = React.useState({});

  const filters = [
    { type: 'text', name: 'name', label: 'Nome', value: '', size: 6 },
    { type: 'text', name: 'nickname', label: 'Apelido', value: '', size: 6 },
    { type: 'text', name: 'cpf', label: 'CPF', value: '', format: '000-000-000-00', size: 4 },
    { type: 'text', name: 'rg', label: 'RG', value: '', format: '000000-0', size: 4 },
  ]

  const columns =  [
    { label: 'Nome', field: 'name', },
    { label: 'Apelido', field: 'nickname', },
    { label: 'Data de nascimento', field: 'birthDate', type: "date" },
    { label: 'Sexo', field: 'gender', },
    { label: 'Crédito',field: 'credit', },
    { label: 'Limite',field: 'limit', },
    { label: 'Cargo', field: 'cargo', },
  ]

  useEffect(() => {
    findClients();
  }, [findClients]);

  const handleSelected = (row) => {
    setSelected(row);
  };


  const handleSubmit = (filtersSubmit) => {
    filteredData = clients;

    filtersSubmit.map(filter => {
      if (filter.value) {
        console.log("Teste 18");
          let splitName = filter.name;
          if(filter.name) {
            splitName = filter.name.split('.');
          }
          console.log("Teste 28");

        filteredData = filteredData.filter(d =>  {

          if(filter.type === 'text') {
            return splitName.length > 1 ? d[splitName[0]][splitName[1]].toUpperCase().includes(filter.value.toUpperCase())
            : d[filter.name].toUpperCase().includes(filter.value.toUpperCase());
          }

          return d[filter.name] === filter.value;
        })
      }
      return filteredData;
    })

    filterSubmit(filteredData);
  }

  return (
      <Dialog fullWidth={true} maxWidth="md" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Selecione um Cliente</DialogTitle>

        <DialogContent>
          <Container className="Clientes">
            <Grid item md={12}>
              <Filters filters={filters} handleSubmit={handleSubmit} className="form" flgCreate={true} flgModal={handleClose}/>
            </Grid>

            {clients ?
              (<TableCustom data={filteredData} columns={columns} isSelectable={true} handleSelected={handleSelected} />)
              : null}
          </Container>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => handleClose()} color="primary">
            Fechar
          </Button>
          <Button onClick={() => handleClose(selected)} color="primary">
            Incluir
          </Button>
        </DialogActions>
      </Dialog>
  );
}

const mapStateToProps = (state) => {
  return {
    clients: state.clients.data,
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
)(DialogClient);
