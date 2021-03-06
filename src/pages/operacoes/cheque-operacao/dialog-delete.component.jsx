import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DialogDelete({open, handleClose}) {
  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
    <DialogTitle id="alert-dialog-title">Confirmar a Ação</DialogTitle>
    <DialogContent>
        <DialogContentText id="alert-dialog-description">
            Deseja confirmar exclusão do CHEQUE?
        </DialogContentText>
    </DialogContent>
    <DialogActions>
        <Button onClick={() => handleClose(true)} color="primary">
            Sim
        </Button>
        <Button onClick={() => handleClose(false)} color="primary" autoFocus>
            Não
        </Button>
    </DialogActions>
    </Dialog>
  );
}