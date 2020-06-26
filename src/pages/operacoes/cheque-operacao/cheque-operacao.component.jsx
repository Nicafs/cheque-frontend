import React, { useState } from "react";

import { Button, ButtonGroup } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';

import DialogCheque from '../dialog-cheque/dialog-cheque.component';
import TableCustom from '../../../core/components/table/tableCustom';

import ChequeOperacao from '../../../model/ChequeOperacao';

export default function ChequeOperacoes({chequeOperacao}) {

  // const [chequesOperacao, setChequesOperacao] = useState([]);

  const columns =  [
    { label: 'Tipo', field: 'tipo' },
    { label: 'Banco', field: 'banco_nome' },
    { label: 'Agencia', field: 'agencia', type: 'numeric' },
    { label: 'Conta', field: 'conta', type: 'numeric' },
    { label: 'Docto/Chq', field: 'numero' },
    { label: 'Valor Operação', field: 'valor_operacao', type: 'numeric' },
    { label: 'Vencimento', field: 'data_vencimento', type: 'date' },
    { label: 'Dias', field: 'dias', type: 'numeric' },
    { label: 'Valor Encargos', field: 'valor_encargos', type: 'numeric' },
    { label: 'Data Quitação', field: 'data_quitacao', type: 'date' },
    { label: 'Emitente', field: 'emitente' },
  ]

  const [open, setOpen] = useState({add: false, view: false, delete: false, situacao: false});

  const handleClickOpen = (button) => {
    setOpen({...open, [button]: true});
  };

  const handleClose = (newChequeOperacao) => {
    if(newChequeOperacao){
      console.log("newChequeOperacao:", newChequeOperacao)
      newChequeOperacao.status = 'NP';
      chequeOperacao.push(newChequeOperacao);
      // setChequesOperacao([...chequesOperacao, chequeOperacao]);
    }
    setOpen({...open, 'add': false});
  };

  return (
    <>
      <ButtonGroup className="btn-group">
          <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleIcon />}
              onClick={() => handleClickOpen('add')}
          >
              Incluir
          </Button>
          <Button
              variant="contained"
              color="primary"
              startIcon={<VisibilityIcon />}
              onClick={() => handleClickOpen('view')}
          >
              Visualizar
          </Button>
          <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={() => handleClickOpen('delete')}
          >
              Excluir
          </Button>
          <Button
              variant="contained"
              color="default"
              startIcon={<HelpOutlineIcon />}
              onClick={() => handleClickOpen('situacao')}
          >
              Situações
          </Button>
      </ButtonGroup>

      <DialogCheque open={open.add} handleClose={handleClose} chequeOperacaoForm={ChequeOperacao}></DialogCheque>

      {chequeOperacao ?
      (<TableCustom className="ChequeOperacoes" data={chequeOperacao} columns={columns} />)
      : null}
    </>
  );
};
