import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { Button, Card, CardContent, CardHeader, ButtonGroup } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import axios from '../../../redux/axios';
import { create, findById, update, deleteById } from '../../../redux/banco/banco.actions';
import FormInput from '../../../core/components/form-input/form-input.component';
import './banco-crud.styles.scss';

function CrudBanco({ findBancoById, createBanco, updateBanco, deleteBanco, banco, history, ...otherProps }) {
  const [bancoForm, setBanco] = useState(banco);
  const id = otherProps.match.params.id;
  const { enqueueSnackbar } = useSnackbar();
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/bancos/${id}`);
      setBanco(response.data);
    };
 
    if(id){
      fetchData();
    }
  }, [id]);

  // useEffect(() => {
  //   if(id) {
  //     findBancoById(id);
  //   }
  // }, [findBancoById, id]);
  
  const handleSubmit = async event => {
    event.preventDefault();

    if(id){
      bancoForm['id'] = id;
      updateBanco(bancoForm);
      enqueueSnackbar('Foi realizada a Atualização com Sucesso !!')
    } else {
      createBanco(bancoForm);
      enqueueSnackbar('Foi Criado com Sucesso !!')
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    setBanco({...bancoForm, [name]: value});
  }

  const handleDelete = () => {
    alert('Deseja deletar mesmo?');
    if(id){
      deleteBanco(id);
    }
  };

  return (
      <Card variant="outlined">
        <CardHeader title="Criar um Banco"/>

        <CardContent>
          <form className='bancoForm' onSubmit={handleSubmit}>

            <FormInput
              type='text'
              name='codigo'
              value={bancoForm.codigo}
              onChange={handleChange}
              label='Código'
              required
            />

            <FormInput
              type='text'
              name='descricao'
              value={bancoForm.descricao}
              onChange={handleChange}
              label='Descrição'
              required
            />

            <FormInput
              type='number'
              name='juros'
              value={bancoForm.juros}
              onChange={handleChange}
              label='Juros' />

            <FormInput
              type='number'
              name='prazo'
              value={bancoForm.prazo}
              onChange={handleChange}
              label='Prazo'
            />


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
    banco: state.bancos.banco
  };
}

const mapDispatchToProps = dispatch => ({
  findBancoById: (id) => dispatch(findById(id)),
  createBanco: (form) => dispatch(create(form)),
  updateBanco: (form) => dispatch(update(form)),
  deleteBanco: (id) => dispatch(deleteById(id))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CrudBanco));