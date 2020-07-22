import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import api from '../../../core/services/api';

import { Button, ButtonGroup, Grid, Container } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { User as initialState } from '../../../model/User';
import FormField from '../../../core/components/form/form.component';

import { userActions } from '../../../redux/user/user.actions';

function CrudUser({ findUserById, createUser, updateUser, deleteUser, history, ...otherProps }) {
  const [userValue, setUserValue] = useState(initialState);
  const id = otherProps.match.params.id;
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/users/${id}`);
      setUserValue(response.data);
    };

    if(id){
      fetchData();
    }
  }, [id]);

  const handleSubmit = async event => {
    if(id){
      userValue['id'] = id;
      updateUser(id, userValue);
      enqueueSnackbar('Foi realizada a Atualização com Sucesso !!')
    } else {
      createUser(userValue);
      enqueueSnackbar('Foi Criado com Sucesso !!')
    }
  }

  const handleChange = (name, value) => {
    setUserValue({...userValue, [name]: value});
  }

  const handleDelete = () => {
    alert('Deseja deletar mesmo?');
    if(id){
      deleteUser(id);
    }
  };

  const userForm = [
    { type: 'text', name: 'name', label: 'Nome *', size: 6,
    errors: { required: { value: true, message: "Informe um Nome *" }} },
    { type: 'email', name: 'email', label: 'E-mail', size: 6,
    errors: { required: { value: true, message: "Informe um E-mail *" }} },
    { type: 'text', name: 'username', label: 'Usuário *', size: 6,
    errors: { required: { value: true, message: "Informe um E-mail *" }}  },
    { type: 'password', name: 'password', label: 'Senha *', size: 6 ,
    errors: { required: { value: true, message: "Informe um E-mail *" }} },
  ];

  return (
    <Container className="Usuarios">
      <FormField
        fields={userForm}
        handleChange={(name, value) => handleChange(name, value)}
        values={userValue}
        title="Criar um Usuário"
        handleDelete={handleDelete}
        handleSubmit={handleSubmit}
        >
      </FormField>

      <Grid item xs={12}>
        <ButtonGroup className="btn-group">
          <Button variant="contained" type="button" color="primary"
            onClick={handleSubmit}>
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
    banco: state.users.user
  };
}

const mapDispatchToProps = dispatch => ({
  findUserById: (id) => dispatch(userActions.getById(id)),
  createUser: (form) => dispatch(userActions.create(form)),
  updateUser: (id, form) => dispatch(userActions.update(id, form)),
  deleteUser: (id) => dispatch(userActions.deleteById(id))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CrudUser));
