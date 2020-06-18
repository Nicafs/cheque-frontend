import React, { useEffect } from "react";
import { connect } from 'react-redux';

import { Button, ButtonGroup } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';

import DialogCheque from '../dialog-cheque/dialog-cheque.component';
import TableCustom from '../../../core/components/table/tableCustom';
import { find, filter } from '../../../redux/cheque-operacao/chequeOperacao.actions';

function ChequeOperacoes({ findChequeOperacao, data, filteredData, filterSubmit }) {

  const columns =  [
    { title: 'Tipo', field: 'tipo' },
    { title: 'Banco', field: 'banco' },
    { title: 'Agencia', field: 'agencia', type: 'numeric' },
    { title: 'Conta', field: 'conta', type: 'numeric' },
    { title: 'Docto/Chq', field: 'numero', type: 'date' },
    { title: 'Valor Operação', field: 'valor_operacao', type: 'numeric' },
    { title: 'Vencimento', field: 'data_vencimento', type: 'date' },
    { title: 'Dias', field: 'dias', type: 'numeric' },
    { title: 'Valor Encargos', field: 'valor_encargos', type: 'numeric' },
    { title: 'Data Quitação', field: 'data_quitacao', type: 'date' },
    { title: 'Emitente', field: 'emitente' },
  ]

  useEffect(() => {
    findChequeOperacao();
  }, [findChequeOperacao]);

  const [open, setOpen] = React.useState({add: false, view: false, delete: false, situacao: false});

  const handleClickOpen = (button) => {
    setOpen({...open, [button]: true});
  };

  const handleClose = (button) => {
    setOpen({...open, [button]: false});
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

        <DialogCheque open={open.add} handleClose={() => handleClose('add')}></DialogCheque>

        {filteredData ?
        (<TableCustom className="ChequeOperacoes" data={filteredData} columns={columns} isEditable='true' />)
        : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.cheques.data,
    filteredData: state.cheques.filteredData
  };
}

const mapDispatchToProps = dispatch => ({
  filterSubmit: (data) => dispatch(filter(data)),
  findChequeOperacao: () => dispatch(find())
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChequeOperacoes);
