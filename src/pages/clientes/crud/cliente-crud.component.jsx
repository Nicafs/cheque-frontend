import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { Button, Card, CardContent, CardHeader, ButtonGroup, Grid, Container } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import axios from '../../../redux/axios';
import { create, findById, update, deleteById } from '../../../redux/client/client.actions';
import FormInput from '../../../core/components/form-input/form-input.component';
import FormDate  from '../../../core/components/form-input/form-date.component';
import './cliente-crud.styles.scss';

function CrudClient ({ findClientById, createClient, updateClient, deleteClient, client, history, ...otherProps }) {
  const [clientForm, setClient] = useState(client);
  const id = otherProps.match.params.id;
  const { enqueueSnackbar } = useSnackbar();
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/clients/${id}`);
      setClient(response.data);
    };
 
    if(id){
      fetchData();
    }
  }, [id]);

  const handleSubmit = async event => {
    event.preventDefault();

    if(id){
      clientForm['id'] = id;
      updateClient(clientForm);
      enqueueSnackbar('Foi realizada a Atualização com Sucesso !!')
    } else {
      createClient(clientForm);
      enqueueSnackbar('Foi Criado com Sucesso !!')
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    setClient({...clientForm, [name]: value});
  }

  const handleDelete = () => {
    alert('Deseja deletar mesmo?');
    if(id){
      deleteClient(id);
    }
  };

  return (
    <Container className="ClientesCrud">
      <Card variant="outlined">
      <CardHeader title="Criar um Cliente"/>

      <CardContent>
        <form className='clienteForm' onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <FormInput
                type='text'
                name='name'
                value={clientForm.name}
                onChange={handleChange}
                label='Nome'
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={4}>
              <FormInput
                type='email'
                name='email'
                value={clientForm.email}
                onChange={handleChange}
                label='E-mail'
                fullWidth
              />
            </Grid>

            <Grid item xs={3}>
              <FormDate
                name='birthDate'
                value={clientForm.birthDate}
                onChange={date => handleChange({ target: { name: 'birthDate', value: date } })}
                label='Data de Nascimento'
                fullWidth />
            </Grid>

            <Grid item xs={3}>
              <FormInput
                type='text'
                name='gender'
                value={clientForm.gender}
                onChange={handleChange}
                label='Gênero'
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={3}>
              <FormInput
                type='text'
                name='cpf'
                value={clientForm.cpf}
                onChange={handleChange}
                label='CPF'
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={3}>
              <FormInput
                type='text'
                name='phone'
                value={clientForm.phone}
                onChange={handleChange}
                label='Telefone'
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <FormInput
                type='text'
                name='address'
                value={clientForm.address}
                onChange={handleChange}
                label='Endereço'
                fullWidth
                required
              />
            </Grid>
          </Grid>

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
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    client: state.clients.client
  };
}

const mapDispatchToProps = dispatch => ({
  findClientById: (id) => dispatch(findById(id)),
  createClient: (form) => dispatch(create(form)),
  updateClient: (form) => dispatch(update(form)),
  deleteClient: (id) => dispatch(deleteById(id))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CrudClient));
