import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useForm } from "react-hook-form";
import api from '../../../core/services/api';

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
      const response = await api.get(`/operacoes/${id}`).then(r => { return r.data});

      setOperacao(response);
    };

    if(id){
      fetchData();
    }
  }, [id]);

  const handleSubmit = async event => {
    if(id){
      operacao['id'] = id;
      updateOperacao(id, operacao);
      enqueueSnackbar('Foi realizada a Atualização com Sucesso !!')
    } else {
      createOperacao(operacao);
      enqueueSnackbar('Foi Criado com Sucesso !!')
    }
  }

  const handleChange = ( name, value ) => {
    const nameCompost = name.split('.');

    if(nameCompost.length > 1){
      setOperacao({...operacao,
        [nameCompost[0]]: {...operacao[nameCompost[0]], [nameCompost[1]]: value}
      });
    } else {
      setOperacao({...operacao, [name]: value});
    }
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
      const response = await api.get(`/clients/${value}`).then(r => { return r.data});
      if(response){
        setOperacao({...operacao, client: { name: response.name, id: response.id,
                      limit: response.limit, credit: response.credit  }});
      } else {
        setOperacao({...operacao, client: { name: '', id: "", limit: "", credit: "" } });
      }
    }
    console.log("operacao:", operacao);
  };

  const handleClose = (selected) => {
    console.log("selected:", selected);
    if(selected) {
      setOperacao({...operacao, client: { name: selected.name, id: selected.id,
        limit: selected.limit, credit: selected.credit  } });
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
    { type: 'dialog', name: 'client.id', label: 'Cliente *', size: 9,
      name_disable: 'client.name', value_disable: '', open: handleClickOpen,
      onBlur: handleOnBlurClient,
      errors: { required: { value: true, message: "Informe o Cliente *" }} },
    { type: 'number', name: 'percentual', label: '% ao mês', size: 3 },
    { type: 'date', name: 'data_operacao', label: 'Data de Operação', size: 3 },
    { type: 'number', name: 'tarifa', label: 'Tarifa', size: 3 },
    { type: 'number', name: 'acrescimos', label: 'Acréscimos', size: 3 },
    { type: 'number', name: 'client.limit', label: 'Limite', size: 3, disabled: true },
    { type: 'number', name: 'client.credit', label: 'Disponível', size: 3, disabled: true },
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
