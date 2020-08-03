import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import api from '../../../core/services/api';

import { Button, ButtonGroup, Grid, Container } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { Banco as initialState } from '../../../model/Banco';
import FormField from '../../../core/components/form/form.component';

import { create, findById, update, deleteById } from '../../../redux/banco/banco.actions';
import './banco-crud.styles.scss';

function CrudBanco({ findBancoById, createBanco, updateBanco, deleteBanco, history, ...otherProps }) {
  const [bancoValue, setBancoValue] = useState(initialState);
  const id = otherProps.match.params.id;
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/bancos/${id}`);
      setBancoValue(response.data);
    };

    if(id){
      fetchData();
    }
  }, [id]);

  const handleSubmit = async event => {
    if(id){
      bancoValue['id'] = id;
      updateBanco(id, bancoValue);
      enqueueSnackbar('Foi realizada a Atualização com Sucesso !!')
    } else {
      createBanco(bancoValue);
      enqueueSnackbar('Foi Criado com Sucesso !!')
    }
  }

  const handleChange = (name, value) => {
    setBancoValue({...bancoValue, [name]: value});
  }

  const handleDelete = () => {
    alert('Deseja deletar mesmo?');
    if(id){
      deleteBanco(id);
    }
  };

  const bancoForm = [
    { type: 'text', name: 'codigo', label: 'Código', size: 12,
    errors: { required: { value: true, message: "Informe um Código *" }} },
    { type: 'text', name: 'descricao', label: 'Descrição', size: 12,
    errors: { required: { value: true, message: "Informe uma Descrição *" }} },
    { type: 'numeric', name: 'prazo', label: 'Prazo', size: 12 },
    { type: 'numeric', name: 'juros', label: 'Juros', size: 12 },
  ];

  return (
    <Container className="Operacoes">
      <FormField
        fields={bancoForm}
        handleChange={(name, value) => handleChange(name, value)}
        values={bancoValue}
        title="Criar um Banco"
        handleDelete={handleDelete}
        handleSubmit={handleSubmit}
        >
      </FormField>


      <Grid item xs={12}>
        <ButtonGroup className="btn-group">
          <Button variant="contained" type="button" color="primary"
            onClick={handleSubmit}>
            { id ? 'Salvar' : 'Confirmar' }
          </Button>
          <Button variant="contained" type="button" color="default"
              onClick={() => history.goBack()} startIcon={<ArrowBackIcon />}>
            Voltar
          </Button>
          { id ? 
            <Button variant="contained" type="button" color="secondary"
              onClick={handleDelete} startIcon={<DeleteIcon />}>
                Excluir
            </Button>
          : null }
        </ButtonGroup>
      </Grid>
    </Container>
    );
}

const mapStateToProps = (state) => {
  return {
    banco: state.bancos.banco
  };
}

const mapDispatchToProps = dispatch => ({
  findBancoById: (id) => dispatch(findById(id)),
  createBanco: (form) => dispatch(create(form)),
  updateBanco: (id, form) => dispatch(update(id, form)),
  deleteBanco: (id) => dispatch(deleteById(id))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CrudBanco));
