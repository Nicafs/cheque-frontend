import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { Button, Card, CardContent, CardHeader, ButtonGroup, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import axios from '../../../redux/axios';
import { create, findById, update, deleteById } from '../../../redux/client/client.actions';
import FormInput from '../../../core/components/form-input/form-input.component';
import FormDate  from '../../../core/components/form-input/form-date.component';
import FormSelect  from '../../../core/components/form-input/form-select.component';
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
    <form className='clienteForm' onSubmit={handleSubmit}>
      <Card variant="outlined" className="ClientesCrud">
        <CardHeader title="Criar um Cliente"/>

        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={6}>
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

            <Grid item xs={6}>
              <FormInput
                type='text'
                name='nickname'
                value={clientForm.nickname}
                onChange={handleChange}
                label='Apelido'
                fullWidth
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
                name='rg'
                value={clientForm.rg}
                onChange={handleChange}
                label='RG'
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={3}>
              <FormSelect
                name='sexo'
                value={clientForm.gender}
                onChange={handleChange}
                fullWidth={true}
                label='Sexo'
                selects={[{ description: 'Masculino', value: 'M' }, { description: 'Feminino', value: 'F' }]}
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

            <Grid item xs={6}>
              <FormInput
                type='text'
                name='nome_mae'
                value={clientForm.nome_mae}
                onChange={handleChange}
                label='Nome da Mãe'
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={6}>
              <FormInput
                type='text'
                name='nome_pai'
                value={clientForm.nome_pai}
                onChange={handleChange}
                label='Nome do Pai'
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={3}>
              <FormSelect
                name='estado_civil'
                value={clientForm.estado_civil}
                onChange={handleChange}
                fullWidth={true}
                label='Estado Civil'
                selects={[{ description: 'Solteiro', value: 'S' }, { description: 'Casado', value: 'C' }]}
              />
            </Grid>

            <Grid item xs={3}>
              <FormInput
                type='number'
                name='credit'
                value={clientForm.credit}
                onChange={handleChange}
                label='Crédito'
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={3}>
              <FormInput
                type='number'
                name='limit'
                value={clientForm.limit}
                onChange={handleChange}
                label='Limite'
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={3}>
              <FormInput
                type='number'
                name='acrescimo'
                value={clientForm.acrescimo}
                onChange={handleChange}
                label='acrescimo'
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={4}>
              <FormInput
                type='text'
                name='local_trabalho'
                value={clientForm.local_trabalho}
                onChange={handleChange}
                label='Local de Trabalho'
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={2}>
              <FormInput
                type='number'
                name='renda_mensal'
                value={clientForm.renda_mensal}
                onChange={handleChange}
                label='Renda Mensal'
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={6}>
              <FormInput
                type='text'
                name='cargo'
                value={clientForm.cargo}
                onChange={handleChange}
                label='Cargo'
                fullWidth
                required
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

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
