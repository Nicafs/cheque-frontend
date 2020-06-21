import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { Button, Card, CardContent, CardHeader, ButtonGroup, Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import ChequeOperacoes from '../cheque-operacao/cheque-operacao.component';
import DialogCheque from '../dialog-cheque/dialog-cheque.component';
import axios from '../../../redux/axios';
import { create, findById, update, deleteById } from '../../../redux/operacao/operacao.actions';
import FormInput from '../../../core/components/form-input/form-input.component';
import FormDate from '../../../core/components/form-input/form-date.component';
import './operacao-crud.styles.scss';

const useStyles = makeStyles(() => ({
  groupItemButton: {
    '& .MuiButtonBase-root': { margin: '0px 10px 0px 5px', },
  },
  groupItem: {
    '& .MuiFormControl-root': { margin: '0px 10px 0px 0px', },
  },
  maginRight: {
    marginRight: '10px'
  }
}));

function CrudOperacao({ findOperacaoById, createOperacao, updateOperacao, deleteOperacao, operacao, history, ...otherProps }) {
  const [operacaoForm, setOperacao] = useState(operacao);
  const id = otherProps.match.params.id;
  const { enqueueSnackbar } = useSnackbar();
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/operacoes/${id}`);
      setOperacao(response.data);
    };
    
    if(id){
      fetchData();
    }
  }, [id]);
  
  const handleSubmit = async event => {
    event.preventDefault();

    if(id){
      operacaoForm['id'] = id;
      updateOperacao(operacaoForm);
      enqueueSnackbar('Foi realizada a Atualização com Sucesso !!')
    } else {
      createOperacao(operacaoForm);
      enqueueSnackbar('Foi Criado com Sucesso !!')
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    setOperacao({...operacaoForm, [name]: value});
  }

  const handleDelete = () => {
    alert('Deseja deletar mesmo?');
    if(id){
      deleteOperacao(id);
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const classes = useStyles();

  return (
    <Container className="Operacoes">
      <Card variant="outlined">
        <CardHeader title="Criar uma Operação" />

        <CardContent>
          <form className='operacaoForm' onSubmit={handleSubmit}>

            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Grid container item className={classes.groupItemButton}>
                  <FormInput
                    className={classes.maginRight}
                    type='number'
                    name='operacao'
                    value={operacaoForm.operacao}
                    onChange={handleChange}
                    label='Operação'
                    disabled
                  />

                  <FormInput
                    type='text'
                    name='client_id'
                    value={operacaoForm.client_id}
                    onChange={handleChange}
                    label='Cliente'
                    required
                  />

                  <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    <ExitToAppIcon />
                  </Button >
                  
                  <Grid item xs={6}>
                    <FormInput
                      type='text'
                      value={operacaoForm.client_nome}
                      onChange={handleChange}
                      label=''
                      disabled
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} className={classes.groupItem}>
                <FormInput
                  type='number'
                  name='perc_mes'
                  value={operacaoForm.perc_mes}
                  onChange={handleChange}
                  label='% ao mês'
                />

                <FormDate
                  name='data_operacao'
                  value={operacaoForm.data_operacao}
                  onChange={date => handleChange({ target: { name: 'data_operacao', value: date } })}
                  label='Data de Operação' />

                <FormInput
                  type='number'
                  name='tarifa'
                  value={operacaoForm.tarifa}
                  onChange={handleChange}
                  label='Tarifa'
                />
              </Grid>

              <Grid item xs={12} className={classes.groupItem}>
                <FormInput
                  type='number'
                  name='acrescimos'
                  value={operacaoForm.acrescimos}
                  onChange={handleChange}
                  label='Acréscimos'
                />

                <FormInput
                  type='number'
                  name='limite'
                  value={operacaoForm.limite}
                  onChange={handleChange}
                  label='Limite'
                  disabled
                />

                <FormInput
                  type='number'
                  name='disponivel'
                  value={operacaoForm.acrescimos}
                  onChange={handleChange}
                  label='Disponível'
                  disabled
                />
              </Grid>
            </Grid>

            <DialogCheque open={open} handleClose={handleClose}></DialogCheque>

          </form>
        </CardContent>
      </Card>

      <ChequeOperacoes></ChequeOperacoes>

      <Grid item xs={12}>
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
      </Grid>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    operacao: state.operacoes.operacao,
  };
}

const mapDispatchToProps = dispatch => ({
  findOperacaoById: (id) => dispatch(findById(id)),
  createOperacao: (form) => dispatch(create(form)),
  updateOperacao: (form) => dispatch(update(form)),
  deleteOperacao: (id) => dispatch(deleteById(id)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CrudOperacao));