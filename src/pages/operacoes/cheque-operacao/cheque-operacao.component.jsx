import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { Card, CardContent } from '@material-ui/core';

import { create } from '../../../redux/cheque-operacao/chequeOperacao.actions';
import { find as findBanco } from '../../../redux/banco/banco.actions';
import FormInput from '../../../core/components/form-input/form-input.component';
import FormDate from '../../../core/components/form-input/form-date.component';

function CrudChequeOperacao({ createChequeOperacao, selectBanco, bancos, chequeOperacao, history, ...otherProps }) {
  
  const [chequeOperacaoForm, setChequeOperacao] = useState(chequeOperacao);

  const { enqueueSnackbar } = useSnackbar();
  
  useEffect(() => {
    selectBanco();
  }, []);
  
  const handleSubmit = async event => {
    event.preventDefault();

    createChequeOperacao(chequeOperacaoForm);
    enqueueSnackbar('Foi Criado com Sucesso !!')
    
  }

  const handleChange = e => {
    const { name, value } = e.target
    setChequeOperacao({...chequeOperacaoForm, [name]: value});
  }

  const bancoSelects = bancos.map(banco =>{ return {value: banco.id, description: banco.descricao}});

  return (
    <Card variant="outlined">
      <CardContent>
        <form className='chequeOperacaoForm' onSubmit={handleSubmit}>

          <FormInput
            type='text'
            name='banco_id'
            value={chequeOperacaoForm.banco_id}
            onChange={handleChange}
            label='Banco'
            required
          />

          <FormInput
            type='text'
            name='agencia'
            value={chequeOperacaoForm.agencia}
            onChange={handleChange}
            label='Agencia'
            required
          />

          <FormInput
            type='text'
            name='conta'
            value={chequeOperacaoForm.conta}
            onChange={handleChange}
            label='Conta'
            required
          />

          <FormInput
            type='text'
            name='numero'
            value={chequeOperacaoForm.numero}
            onChange={handleChange}
            label='Docto/cheque'
            required
          />

          <FormInput
            type='number'
            name='dias'
            value={chequeOperacaoForm.dias}
            onChange={handleChange}
            label='Dias'
            required
          />

          <FormDate
            name='data_vencimento'
            value={chequeOperacaoForm.data_vencimento}
            onChange={date => handleChange({ target: { name: 'data_vencimento', value: date } })}
            label='Data de Vencimento' 
            required />

          <FormInput
            type='number'
            name='valor'
            value={chequeOperacaoForm.valor}
            onChange={handleChange}
            label='Valor'
            required
          />

          <FormInput
            type='text'
            name='emitente'
            value={chequeOperacaoForm.emitente}
            onChange={handleChange}
            label='Emitente'
            required
          />

        </form>
      </CardContent>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    chequeOperacao: state.chequesOperacao.chequeOperacao,
    bancos: state.bancos.data,
  };
}

const mapDispatchToProps = dispatch => ({
  createChequeOperacao: (form) => dispatch(create(form)),
  selectBanco: () => dispatch(findBanco())
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CrudChequeOperacao));