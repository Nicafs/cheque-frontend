import React, { useState } from "react";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import CrudChequeOperacao from '../cheque-operacao/crud-cheque-operacao.component';

export default function DialogCheque({open, handleClose, chequeOperacaoForm, flgView}) {
  const [chequeOperacao, setChequeOperacao] = useState(chequeOperacaoForm);

  const handleCheque = (chequeOperacaoReturn) => {
    if(chequeOperacaoReturn){
      setChequeOperacao(chequeOperacaoReturn);
    }
  };

  return (
      <Dialog fullWidth={true} maxWidth="lg" open={open} onClose={() => handleClose(null)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          { flgView ? 'Visualização do Cheque' : 'Incluir um Cheque' }
        </DialogTitle>

        <DialogContent>
          <CrudChequeOperacao data={chequeOperacaoForm} handleCheque={handleCheque} flgView={flgView}/>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => handleClose(null)} color="primary">
            Fechar
          </Button>
          { !flgView ?
              <Button onClick={() => handleClose(chequeOperacao)} color="primary">
                Incluir
              </Button>
            : null}
        </DialogActions>
      </Dialog>
  );
}
