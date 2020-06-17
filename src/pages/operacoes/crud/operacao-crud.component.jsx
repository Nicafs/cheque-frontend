import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { Button, Card, CardContent, CardHeader, ButtonGroup } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import DialogCheque from '../dialog-cheque/dialog-cheque.component';
import axios from '../../../redux/axios';
import { create, findById, update, deleteById } from '../../../redux/operacao/operacao.actions';
import FormInput from '../../../core/components/form-input/form-input.component';
import FormDate from '../../../core/components/form-input/form-date.component';
import './operacao-crud.styles.scss';

function CrudOperacao({ findOperacaoById, createOperacao, updateOperacao, deleteOperacao, operacao, history, ...otherProps }) {
  const [operacaoForm, setOperacao] = useState(operacao);
  const id = otherProps.match.params.id;
  const { enqueueSnackbar } = useSnackbar();
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/operacoes/${id}`);
      setOperacao(response.data);
    };
    
    if(id){
      fetchData();
    }
  }, [id]);
  
  const handleSubmit = async event => {
    event.preventDefault();

    if(id){
      operacaoForm['id'] = id;
      updateOperacao(operacaoForm);
      enqueueSnackbar('Foi realizada a Atualização com Sucesso !!')
    } else {
      createOperacao(operacaoForm);
      enqueueSnackbar('Foi Criado com Sucesso !!')
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    setOperacao({...operacaoForm, [name]: value});
  }

  const handleDelete = () => {
    alert('Deseja deletar mesmo?');
    if(id){
      deleteOperacao(id);
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <Card variant="outlined">
      <CardHeader title="Criar uma Operação" />

      <CardContent>
        <form className='operacaoForm' onSubmit={handleSubmit}>

          <FormInput
            type='number'
            name='operacao'
            value={operacaoForm.operacao}
            onChange={handleChange}
            label='Operação'
            disabled
          />

          <FormInput
            type='text'
            name='client_id'
            value={operacaoForm.client_id}
            onChange={handleChange}
            label='Cliente'
            required
          />

          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Open form dialog
          </Button>

          <FormInput
            type='text'
            name='agencia'
            value={operacaoForm.agencia}
            onChange={handleChange}
            label='Agencia'
            required
          />

          <FormInput
            type='number'
            name='perc_mes'
            value={operacaoForm.perc_mes}
            onChange={handleChange}
            label='% ao mês'
          />

          <FormDate
            name='data_operacao'
            value={operacaoForm.data_operacao}
            onChange={date => handleChange({ target: { name: 'data_operacao', value: date } })}
            label='Data de Operação' />

          <FormInput
            type='number'
            name='tarifa'
            value={operacaoForm.tarifa}
            onChange={handleChange}
            label='Tarifa'
          />

          <FormInput
            type='number'
            name='acrescimos'
            value={operacaoForm.acrescimos}
            onChange={handleChange}
            label='Acréscimos'
          />

          <FormInput
            type='number'
            name='limite'
            value={operacaoForm.limite}
            onChange={handleChange}
            label='Limite'
          />

          <FormInput
            type='number'
            name='disponivel'
            value={operacaoForm.acrescimos}
            onChange={handleChange}
            label='Disponível'
          />

          <DialogCheque open={open} handleClose={handleClose}></DialogCheque>

          <ButtonGroup className="btn-group">
            <Button variant="contained" type="submit" color="primary">
              Salvar
            </Button>
            <Button variant="contained" type="button" color="default" 
                onClick={() => history.goBack()} startIcon={<ArrowBackIcon />}>
              Voltar
            </Button>
            <Button variant="contained" type="button" color="secondary" 
                onClick={handleDelete} startIcon={<DeleteIcon />}>
              Excluir
            </Button>
          </ButtonGroup>

        </form>
      </CardContent>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    operacao: state.operacoes.operacao,
  };
}

const mapDispatchToProps = dispatch => ({
  findOperacaoById: (id) => dispatch(findById(id)),
  createOperacao: (form) => dispatch(create(form)),
  updateOperacao: (form) => dispatch(update(form)),
  deleteOperacao: (id) => dispatch(deleteById(id)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CrudOperacao));