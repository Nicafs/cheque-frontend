import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useForm } from "react-hook-form";
import axios from '../../../redux/axios';

import { Button, ButtonGroup, Grid, Container } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import FormField from '../../../core/components/form/form.component';
import ChequeOperacoes from '../cheque-operacao/cheque-operacao.component';
import DialogClient from '../dialog-cheque/dialog-client.component';
import { create, findById, update, deleteById } from '../../../redux/operacao/operacao.actions';
import './operacao-crud.styles.scss';

function CrudOperacao({ findOperacaoById, createOperacao, updateOperacao, deleteOperacao, 
                        operacaoInitial, history, ...otherProps }) {
  const [operacao, setOperacao] = useState(operacaoInitial);
  const [open, setOpen] = useState(false);
  const { ...hookForm } = useForm();

  const id = otherProps.match.params.id;
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/operacoes/${id}`).then(r => { return r.data});

      const operacaoData = {
        id: response.id,
        client_id: response.client.id,
        client_name: response.client.name,
        client_limit: response.client.limit,
        client_disponivel: 0,
        user_id: '',
        situacao: response.situacao,
        percentual: response.percentual,
        tarifa: response.tarifa,
        data_operacao: response.data_operacao,
        acrescimos: response.acrescimos,
        tarifa_bordero: response.tarifa_bordero,
        total_operacao: response.total_operacao,
        total_encargos: response.total_encargos,
        total_liquido: response.total_liquido,
        total_outros: response.total_outros,
        obs: response.obs,
        chequeOperacao: response.chequeOperacao,
      }
      setOperacao(operacaoData);
    };

    if(id){
      fetchData();
    }
  }, [id]);

  const handleSubmit = async event => {
    event.preventDefault();
    
    if(id){
      operacao['id'] = id;
      updateOperacao(id, operacao);
      enqueueSnackbar('Foi realizada a Atualização com Sucesso !!')
    } else {
      createOperacao(operacao);
      enqueueSnackbar('Foi Criado com Sucesso !!')
    }
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setOperacao({...operacao, [name]: value});
  }

  const handleDelete = () => {
    alert('Deseja deletar mesmo?');
    if(id){
      deleteOperacao(id);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleOnBlurClient = async e => {
    const { value } = e.target;

    if (value) {
      const response = await axios.get(`/clients/${value}`).then(r => { return r.data});
      if(response){
        setOperacao({...operacao, client_name: response.name, client_id: response.id });
      } else {
        setOperacao({...operacao, client_name: '', client_id: "" });
      }
    }
  };
  
  const handleClose = (selected) => {
    if(selected) {
      setOperacao({...operacao, client_name: selected.name, client_id: selected.id });
    }
    setOpen(false);
  };

  const handleUpdate = (chequeOperacao) => {
    if(chequeOperacao) {
      setOperacao({...operacao, chequeOperacao: chequeOperacao });
    }
  };

  const operacaoForm = [
    { type: 'number', name: 'id', label: 'Operação', size: 3, disabled: true },
    { type: 'dialog', name: 'client_id', label: 'Cliente *', size: 9, 
      name_disable: 'client_name', value_disable: '', open: handleClickOpen,
      onBlur: handleOnBlurClient,
      errors: { required: { value: true, message: "Informe o Cliente *" }} },
    { type: 'number', name: 'percentual', label: '% ao mês', size: 3 },
    { type: 'date', name: 'data_operacao', label: 'Data de Operação', size: 3 },
    { type: 'number', name: 'tarifa', label: 'Tarifa', size: 3 },
    { type: 'number', name: 'acrescimos', label: 'Acréscimos', size: 3 },
    { type: 'number', name: 'client_limit', label: 'Limite', size: 3, disabled: true },
    { type: 'number', name: 'client_disponivel', label: 'Disponível', size: 3, disabled: true },
  ];

  return (
    <Container className="Operacoes">
      <FormField fields={operacaoForm} className="operacoesCrud"
                handleChange={(name, value) => handleChange(name, value)}
                hookFormCustom={hookForm}
                values={operacao}
                title="Criar uma Operação">
      </FormField>

      <DialogClient open={open} handleClose={handleClose}></DialogClient>

      <ChequeOperacoes chequeOperacao={operacao.chequeOperacao} handleUpdate={handleUpdate}></ChequeOperacoes>

      <Grid item xs={12}>
        <ButtonGroup className="btn-group">
          <Button variant="contained" type="button" color="primary" 
            onClick={hookForm.handleSubmit(handleSubmit)}>
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
      </Grid>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    operacaoInitial: state.operacoes.operacao,
  };
}

const mapDispatchToProps = dispatch => ({
  findOperacaoById: (id) => dispatch(findById(id)),
  createOperacao: (form) => dispatch(create(form)),
  updateOperacao: (id, form) => dispatch(update(id, form)),
  deleteOperacao: (id) => dispatch(deleteById(id)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CrudOperacao));
