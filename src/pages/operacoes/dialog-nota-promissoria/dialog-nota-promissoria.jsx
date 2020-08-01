import React from "react";

import { PDFViewer } from '@react-pdf/renderer';

import NotaPromissoria from '../../relatorio/nota-promissoria.component';
import OperacaoCredito from '../../relatorio/operacao-credito.component';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function DialogNotaPromissoria({operacao, open, handleClose, flgRelatorio}) {
  console.log("flgRelatorio:", flgRelatorio);
  
  return (
    <Dialog fullWidth={true} maxWidth="xl" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{ flgRelatorio === 1 ? 
         'Nota Promissória' : 
         'Operação de Crédito'}</DialogTitle>

      <DialogContent>
        <PDFViewer style={{width: '100%', height: '1200px'}}>
            {flgRelatorio === 1 ? 
              <NotaPromissoria operacao={operacao}/> : 
              <OperacaoCredito operacao={operacao}/>
            }
        </PDFViewer>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => handleClose()} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogNotaPromissoria;
