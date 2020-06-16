import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { Button, Card, CardContent, CardHeader, ButtonGroup } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import axios from '../../../redux/axios';
import { create, findById, update, deleteById } from '../../../redux/cheque/cheque.actions';
import { find as findClient } from '../../../redux/client/client.actions';
import { find as findBanco } from '../../../redux/banco/banco.actions';
import FormInput from '../../../core/components/form-input/form-input.component';
import FormDate from '../../../core/components/form-input/form-date.component';
import FormSelect from '../../../core/components/form-input/form-select.component';
import './cheque-crud.styles.scss';

function CrudCheque({ findChequeById, createCheque, updateCheque, deleteCheque, selectClient, selectBanco, clients, bancos, cheque, history, ...otherProps }) {
  const [chequeForm, setCheque] = useState(cheque);
  const id = otherProps.match.params.id;
  const { enqueueSnackbar } = useSnackbar();
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/cheques/${id}`);
      setCheque(response.data);
    };

    selectBanco();
    selectClient();
    
    if(id){
      fetchData();
    }
  }, [id]);
  
  const handleSubmit = async event => {
    event.preventDefault();

    if(id){
      chequeForm['id'] = id;
      updateCheque(chequeForm);
      enqueueSnackbar('Foi realizada a Atualização com Sucesso !!')
    } else {
      createCheque(chequeForm);
      enqueueSnackbar('Foi Criado com Sucesso !!')
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    console.log("e:", e, " name:", name, " value", value)
    setCheque({...chequeForm, [name]: value});
  }

  const handleDelete = () => {
    alert('Deseja deletar mesmo?');
    if(id){
      deleteCheque(id);
    }
  };
  const bancoSelects = bancos.map(banco =>{ return {value: banco.id, description: banco.descricao}});
  const clientSelects = clients.map(client =>{ return {value: client.id, description: client.name}});
  console.log("chequeForm:",chequeForm, "bancoSelects:", bancoSelects, "clientSelects", clientSelects)

  return (
    <Card variant="outlined">
      <CardHeader title="Criar um Cheque" />

      <CardContent>
        <form className='chequeForm' onSubmit={handleSubmit}>

          <FormSelect
            name='client_id'
            value={chequeForm.client_id}
            selects={clientSelects}
            onChange={handleChange}
            label='Cliente'
            required
          />

          <FormSelect
            name='banco_id'
            value={chequeForm.banco_id}
            selects={bancoSelects}
            onChange={handleChange}
            label='Banco'
            required
          />

          <FormInput
            type='text'
            name='agencia'
            value={chequeForm.agencia}
            onChange={handleChange}
            label='Agencia'
            required
          />

          <FormInput
            type='text'
            name='conta'
            value={chequeForm.conta}
            onChange={handleChange}
            label='Conta'
            required
          />

          <FormInput
            type='text'
            name='numero'
            value={chequeForm.numero}
            onChange={handleChange}
            label='Numero'
          />

          <FormInput
            type='text'
            name='situacao'
            value={chequeForm.situacao}
            onChange={handleChange}
            label='Situação'
          />

          <FormInput
            type='number'
            name='dias'
            value={chequeForm.dias}
            onChange={handleChange}
            label='Dias'
          />

          <FormDate
            name='data_vencimento'
            value={chequeForm.data_vencimento}
            onChange={date => handleChange({ target: { name: 'data_vencimento', value: date } })}
            label='Data de Vencimento' />

          <FormDate
            name='data_quitacao'
            value={chequeForm.data_quitacao}
            onChange={date => handleChange({ target: { name: 'data_quitacao', value: date } })}
            label='Data de Quitação' />

          <FormInput
            type='number'
            name='valor_operacao'
            value={chequeForm.valor_operacao}
            onChange={handleChange}
            label='Valor de Operação'
            required
          />

          <FormInput
            type='number'
            name='valor_encargos'
            value={chequeForm.valor_encargos}
            onChange={handleChange}
            label='Valor de Encargos'
            required
          />

          <FormInput
            type='text'
            name='emitente'
            value={chequeForm.emitente}
            onChange={handleChange}
            label='Emitente'
            required
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
    cheque: state.cheques.cheque,
    bancos: state.bancos.data,
    clients: state.clients.data,
  };
}

const mapDispatchToProps = dispatch => ({
  findChequeById: (id) => dispatch(findById(id)),
  createCheque: (form) => dispatch(create(form)),
  updateCheque: (form) => dispatch(update(form)),
  deleteCheque: (id) => dispatch(deleteById(id)),
  selectBanco: () => dispatch(findClient()),
  selectClient: () => dispatch(findBanco())
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CrudCheque));