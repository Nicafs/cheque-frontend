import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';

import api from '../../core/services/api';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import VisibilityIcon from '@material-ui/icons/Visibility';

import DialogCheque from '../operacoes/dialog-cheque/dialog-cheque.component';

import TableCustom from '../../core/components/table/tableCustom';
import FormField from '../../core/components/form/form.component';

function DialogOperacao({open, handleClose, id}) {
  const [operacao, setOperacao] = useState(null);
  const [openCheque, setOpenCheque] = useState(false);
  const [chequeOperacao, setChequeOperacao] = useState();
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/operacoes/${id}`).then(r => { return r.data});

      setOperacao(response);
    };

    if(id){
      fetchData();
    }

  }, [id]);

  const handleOpenCheque = (row) => {
    setChequeOperacao(row);
    setOpenCheque(true);
  };

  const handleCloseCheque = () => {
    setOpenCheque(false);
  };

  const columns = [
    { type: 'number', name: 'id', label: 'Operação', size: 3, disabled: true },
    { type: 'dialog', name: 'client.id', label: 'Cliente *', size: 9,
      name_disable: 'client.name', value_disable: '', 
      errors: { required: { value: true, message: "Informe o Cliente *" }} },
    { type: 'number', name: 'percentual', label: '% ao mês', size: 3 },
    { type: 'date', name: 'data_operacao', label: 'Data de Operação', size: 3 },
    { type: 'number', name: 'tarifa', label: 'Tarifa', size: 3 },
    { type: 'number', name: 'acrescimos', label: 'Acréscimos', size: 3 },
    { type: 'number', name: 'client.limit', label: 'Limite', size: 3, disabled: true },
    { type: 'number', name: 'client.disponivel', label: 'Disponível', size: 3, disabled: true },
  ];
  
  const columnsCheque =  [
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

  const customActions = [
    { ariaLabel: 'Visualizar', onClick: (row) => handleOpenCheque(row), icon: VisibilityIcon },
  ]
  
  return (
      <Dialog fullWidth={true} maxWidth="md" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Operação</DialogTitle>

        <DialogContent>
          {operacao ?
            <>
              <FormField fields={columns}
                      values={operacao}
                      disable={true}
                      isView={true}>
              </FormField>

              {operacao.chequeOperacao ?
                <>
                  <div style={{margin: '10px'}}></div>

                  <DialogCheque open={openCheque} handleClose={handleCloseCheque} chequeOperacaoForm={chequeOperacao} flgView={true}></DialogCheque>

                  <TableCustom  data={operacao.chequeOperacao} customActions={customActions} columns={columnsCheque} />
                </>
              : null}
            </>
          : null}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => handleClose()} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
  );
}

const mapStateToProps = (state) => {
  return {
    operacaoInitial: state.operacoes.operacao,
  };
}


export default connect(
  mapStateToProps,
  null
)(DialogOperacao);

