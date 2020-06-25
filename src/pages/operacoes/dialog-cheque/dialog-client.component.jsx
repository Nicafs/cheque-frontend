import React, { useEffect } from "react";
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import TableCustom from '../../../core/components/table/tableCustom';
import { find } from '../../../redux/client/client.actions';

function DialogClient({open, handleClose, findClients, clients}) {

  const [selected, setSelected] = React.useState({});

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

  return (
      <Dialog fullWidth={true} maxWidth="md" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Selecione um Banco</DialogTitle>

        <DialogContent>
        {clients ?
          (<TableCustom data={clients} columns={columns} isSelectable={true} handleSelected={handleSelected} />)
          : null}
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
    clients: state.clients.data
  };
}

const mapDispatchToProps = dispatch => ({
  findClients: () => dispatch(find())
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogClient);