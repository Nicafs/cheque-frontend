import React, { useState } from "react";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import CrudChequeOperacao from '../cheque-operacao/crud-cheque-operacao.component';

export default function DialogCheque({open, handleClose, chequeOperacaoForm}) {

  const [chequeOperacao, setChequeOperacao] = useState({});

  const handleCheque = (chequeOperacaoReturn) => {
    if(chequeOperacaoReturn){
      setChequeOperacao(chequeOperacaoReturn);
    }
  };
 
  return (
      <Dialog fullWidth={true} maxWidth="lg" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Incluir um Cheque</DialogTitle>

        <DialogContent>
          <CrudChequeOperacao handleCheque={handleCheque}/>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => handleClose()} color="primary">
            Fechar
          </Button>
          <Button onClick={() => handleClose(chequeOperacao)} color="primary">
            Incluir
          </Button>
        </DialogActions>
      </Dialog>
  );
}