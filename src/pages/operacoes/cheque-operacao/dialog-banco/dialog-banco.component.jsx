import React, { useEffect } from "react";
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import TableCustom from '../../../../core/components/table/tableCustom';
import { find } from '../../../../redux/banco/banco.actions';

function DialogBanco({open, handleClose, findBancos, bancos}) {

  const [selected, setSelected] = React.useState({});

  const columns =  [
    { label: 'Código', field: 'codigo' },
    { label: 'Descrição', field: 'descricao' },
  ]

  useEffect(() => {
    findBancos();
  }, [findBancos]);

  const handleSelected = (row) => {
    setSelected(row);
  };

  return (
      <Dialog fullWidth={true} maxWidth="md" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Selecione um Banco</DialogTitle>

        <DialogContent>
        {bancos ?
          (<TableCustom data={bancos} columns={columns} isSelectable={true} handleSelected={handleSelected} />)
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
    bancos: state.bancos.data
  };
}

const mapDispatchToProps = dispatch => ({
  findBancos: () => dispatch(find())
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogBanco);

