import React, { useEffect } from "react";
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { find } from '../../../../redux/banco/banco.actions';

function DialogBanco({open, handleClose, findBancos, bancos}) {

  useEffect(() => {
    findBancos();
  }, [findBancos]);

  return (
      <Dialog fullWidth={true} maxWidth="lg" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Selecione um Banco</DialogTitle>

        <DialogContent>
          <Table className='table'>
            <TableHead>
              <TableRow>
                <TableCell> Código </TableCell>
                <TableCell> Descrição </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            { bancos.map(banco => {
              return (
              <TableRow>
                <TableCell>
                  { banco.codigo }
                </TableCell>

                <TableCell>
                  { banco.descricao }
                </TableCell>
              </TableRow>
              )})
            }
            </TableBody>
          </Table>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fechar
          </Button>
          <Button onClick={handleClose} color="primary">
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

