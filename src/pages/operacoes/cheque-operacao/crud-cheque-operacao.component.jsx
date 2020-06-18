import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { Card, CardContent, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { create } from '../../../redux/cheque-operacao/chequeOperacao.actions';
import { find as findBanco } from '../../../redux/banco/banco.actions';
import FormInput from '../../../core/components/form-input/form-input.component';
import FormDate from '../../../core/components/form-input/form-date.component';
import FormSelect from '../../../core/components/form-input/form-select.component';

const useStyles = makeStyles(() => ({
  groupItem: {
    '& .MuiFormControl-root': { marginRight: '20px', },
  },
}));

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

  const classes = useStyles();

  return (
    <Card variant="outlined">
      <CardContent>
        <form className='chequeOperacaoForm' onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormSelect
                name='tipo'
                value={chequeOperacaoForm.tipo}
                selects={[{value:'cheque', description: 'Cheque'}, {value:'duplicata', description: 'Duplicata'}]}
                onChange={handleChange}
                label='Tipo'
                required
              />
            </Grid>

            <Grid container item xs={12} className={classes.groupItem}>
              <Grid item xs={2}>
                <FormInput
                  type='text'
                  name='banco_id'
                  value={chequeOperacaoForm.banco_id}
                  onChange={handleChange}
                  label='Banco'
                  required
                />
              </Grid>

              <Grid item xs={10}>
                <FormInput
                  type='text'
                  name='banco_nome'
                  value={chequeOperacaoForm.banco_nome}
                  onChange={handleChange}
                  label=''
                  disabled
                  fullWidth
                  required
                />
              </Grid>
            </Grid>

            <Grid item xs={12} className={classes.groupItem}>
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
            </Grid>

            <Grid item xs={12} className={classes.groupItem}>
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
            </Grid>

            <Grid item xs={12}>
              <FormInput
                type='text'
                name='emitente'
                value={chequeOperacaoForm.emitente}
                onChange={handleChange}
                label='Emitente'
                required
              />
            </Grid>
          </Grid>
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