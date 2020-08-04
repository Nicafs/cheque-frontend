import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';

import api from '../../core/services/api';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import TableCustom from '../../core/components/table/tableCustom';

function DialogOperacao({open, handleClose, id, operacaoInitial}) {
  const [operacao, setOperacao] = useState(operacaoInitial);
console.log("dialog");
console.log("id:", id);
console.log("operacao:", operacao);
  const columns =  [
    { type: 'number', name: 'id', label: 'Operação', size: 3, disabled: true },
    { type: 'dialog', name: 'client.id', label: 'Cliente *', size: 9,
      name_disable: 'client.name', value_disable: ''},
    { type: 'number', name: 'percentual', label: '% ao mês', size: 3 },
    { type: 'date', name: 'data_operacao', label: 'Data de Operação', size: 3 },
    { type: 'number', name: 'tarifa', label: 'Tarifa', size: 3 },
    { type: 'number', name: 'acrescimos', label: 'Acréscimos', size: 3 },
    { type: 'number', name: 'client.limit', label: 'Limite', size: 3, disabled: true },
    { type: 'number', name: 'client.disponivel', label: 'Disponível', size: 3, disabled: true },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/operacoes/${id}`).then(r => { return r.data});
console.log("response:", response);
      setOperacao(response);
    };

    if(id){
      fetchData();
    }

  }, [id]);
console.log("operacaoInitial:", operacaoInitial);
console.log("operacao:", operacao);
  return (
      <Dialog fullWidth={true} maxWidth="md" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Operação</DialogTitle>

        <DialogContent>
        {operacao ?
          (<TableCustom data={operacao} columns={columns} />)
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

