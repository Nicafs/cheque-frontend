import React, { useState } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { Card, CardContent, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { create } from '../../../redux/cheque-operacao/chequeOperacao.actions';
import FormInput from '../../../core/components/form-input/form-input.component';
import FormDate from '../../../core/components/form-input/form-date.component';
import FormSelect from '../../../core/components/form-input/form-select.component';
import DialogBanco from './dialog-banco/dialog-banco.component';

const useStyles = makeStyles(() => ({
  groupItemButton: {
    '& .MuiButtonBase-root': { margin: '0px 10px 0px 5px', },
  },
  groupItem: {
    '& .MuiFormControl-root': { marginRight: '20px', },
  },
}));

function CrudChequeOperacao({ createChequeOperacao,  chequeOperacao, history }) {

  const [chequeOperacaoForm, setChequeOperacao] = useState(chequeOperacao);

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async event => {
    event.preventDefault();

    createChequeOperacao(chequeOperacaoForm);
    enqueueSnackbar('Foi Criado com Sucesso !!')

  }

  const handleChange = e => {
    const { name, value } = e.target
    setChequeOperacao({...chequeOperacaoForm, [name]: value});
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (selected) => {
    setChequeOperacao({...chequeOperacaoForm, banco_nome: selected.descricao, banco_id: selected.id });
    setOpen(false);
  };

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

            <Grid container item className={classes.groupItemButton}>
              <FormInput
                type='text'
                name='banco_id'
                value={chequeOperacaoForm.banco_id}
                onChange={handleChange}
                label='Banco'
                required
              />

              <Button variant="contained" color="primary" onClick={handleClickOpen}>
                <ExitToAppIcon />
              </Button >

              <Grid item xs={8}>
                <FormInput
                  type='text'
                  name='banco_nome'
                  value={chequeOperacaoForm.banco_nome}
                  onChange={handleChange}
                  label='Descrição'
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

        <DialogBanco open={open} handleClose={handleClose}></DialogBanco>
      </CardContent>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    chequeOperacao: state.chequesOperacao.chequeOperacao
  };
}

const mapDispatchToProps = dispatch => ({
  createChequeOperacao: (form) => dispatch(create(form))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CrudChequeOperacao));
