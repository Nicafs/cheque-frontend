import React, { useState } from "react";

import { Button, ButtonGroup } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import { toast } from "react-toastify";

import api from '../../../core/services/api';

import DialogCheque from '../dialog-cheque/dialog-cheque.component';
import DialogSituacao from './dialog-situacao.component';
import DialogDelete from './dialog-delete.component';
import TableCustom from '../../../core/components/table/tableCustom';

import ChequeOperacao from '../../../model/ChequeOperacao';

export default function ChequeOperacoes({chequeOperacao, handleUpdate}) {
  const [selected, setSelected] = useState();
  const [flgEdit, setFlgEdit] = useState(false);
  const [chequeOperacaoForm, setChequeOperacaoForm] = useState(ChequeOperacao);

  const columns =  [
    { label: 'Tipo', field: 'tipo' },
    { label: 'Banco', field: 'banco.descricao', type: 'compost' },
    { label: 'Agencia', field: 'agencia', type: 'numeric' },
    { label: 'Conta', field: 'conta', type: 'numeric' },
    { label: 'Docto/Chq', field: 'numero' },
    { label: 'Dias', field: 'dias', type: 'numeric' },
    { label: 'Vencimento', field: 'data_vencimento', type: 'date' },
    { label: 'Valor Operação', field: 'valor_operacao', type: 'money' },
    { label: 'Valor Encargos', field: 'valor_encargos', type: 'money' },
    { label: 'Data Quitação', field: 'data_quitacao', type: 'date' },
    { label: 'Emitente', field: 'emitente' },
  ]

  const [open, setOpen] = useState({add: false, view: false, delete: false, situacao: false});

  const handleClickOpen = (button, edit) => {
    setFlgEdit(edit);
    if(edit) {
      if(selected) {
        setChequeOperacaoForm(selected);
        setOpen({...open, [button]: true});
      } else {
        toast.error('Selecione um cheque!!', {
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
    } else {
      setChequeOperacaoForm(ChequeOperacao);
      setOpen({...open, [button]: true});
    }
  };

  const handleOpenSituacao = () => {
    if(selected?.id) {
      if(!selected?.data_quitacao) {
        setOpen({...open, 'situacao': true});
      } else {
        toast.error('O cheque selecionado já foi quitado!!', {
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
    } else {
      toast.error('Selecione o cheque a ser quitado!!', {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  };

  const handleOpenDelete = () => {
    if(selected?.id) {
        setOpen({...open, 'delete': true});
    } else {
      toast.error('Selecione o cheque a ser excluido!!', {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  };

  const handleCloseAdd = (newChequeOperacao) => {
    if(newChequeOperacao) {
      if(flgEdit) {
        chequeOperacao = chequeOperacao.map(cheque => {
          if(cheque.id === newChequeOperacao.id) {
            return newChequeOperacao;
          }
          return cheque;
        });

        handleUpdate(chequeOperacao);
        setFlgEdit(false);
      } else {
        newChequeOperacao.status = 'NP';
        chequeOperacao.push(newChequeOperacao);
        // setChequesOperacao([...chequesOperacao, chequeOperacao]);
      }
    }

    setOpen({...open, 'add': false});
  };

  const handleCloseSituacao = async (answer) => {
    if(answer){
      if(selected?.id) {
       const retorno = await api.put(`/chequeOperacao/quitacao/${selected.id}`).then(r => { return r.data});

       if (retorno) {
          setSelected(retorno);
          toast.success('O cheque foi Quitado !!', {
            position: toast.POSITION.BOTTOM_CENTER
          });

          chequeOperacao = chequeOperacao.map(cheque => {
            if(cheque.id === retorno.id) {
              return retorno;
            }
            return cheque;
          });

          handleUpdate(chequeOperacao);
        }
      }
    }
    setOpen({...open, 'situacao': false});
  };

  const handleCloseDelete = async (answer) => {
    if(answer){
      if(selected?.id) {
       const retorno = await api.delete(`/chequeOperacao/${selected.id}`).then(r => { return r.data});

       if (retorno) {
          toast.warn('O cheque foi Deletado !!', {
            position: toast.POSITION.BOTTOM_CENTER
          });

          const index = chequeOperacao.indexOf(cheque => cheque.id === selected.id);
          chequeOperacao.splice(index, 1);

          handleUpdate(chequeOperacao);
          setSelected(null);
        }
      }
    }
    setOpen({...open, 'delete': false});
  };

  const handleSelected = (row) => {
    setSelected(row);
  };

  return (
    <>
      <ButtonGroup className="btn-group">
          <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleIcon />}
              onClick={() => handleClickOpen('add', false)}
          >
              Incluir
          </Button>
          <Button
              variant="contained"
              color="primary"
              startIcon={<VisibilityIcon />}
              onClick={() => handleClickOpen('add', true)}
          >
              Visualizar
          </Button>
          <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={handleOpenDelete}
          >
              Excluir
          </Button>
          <Button
              variant="contained"
              color="default"
              startIcon={<HelpOutlineIcon />}
              onClick={handleOpenSituacao}
          >
              Situações
          </Button>
      </ButtonGroup>

      <DialogCheque open={open.add} handleClose={handleCloseAdd} chequeOperacaoForm={chequeOperacaoForm} flgView={flgEdit}></DialogCheque>

      <DialogSituacao open={open.situacao} handleClose={handleCloseSituacao}></DialogSituacao>

      <DialogDelete open={open.delete} handleClose={handleCloseDelete}></DialogDelete>

      {chequeOperacao ?
      (<TableCustom className="ChequeOperacoes" data={chequeOperacao} columns={columns} isSelectable={true} handleSelected={handleSelected} />)
      : null}
    </>
  );
};
