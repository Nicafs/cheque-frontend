import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useForm } from "react-hook-form";
import api from '../../../core/services/api';
import NumberFormat from 'react-number-format';

import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup, Grid, Container, Card, Typography, CardContent, Box } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import FormField from '../../../core/components/form/form.component';
import ChequeOperacoes from '../cheque-operacao/cheque-operacao.component';
import DialogClient from '../dialog-cheque/dialog-client.component';
import { create, findById, update, deleteById } from '../../../redux/operacao/operacao.actions';
import './operacao-crud.styles.scss';

const useStyles = makeStyles(() => ({
  totaisWrap: {
    display: 'flex',
    flexDirection: 'row',
  },
  totais: {
    color: 'blue',
    fontSize: '18px',
    width: '200px'
  },
  left: {
    textAlign: 'left',
  },
  right: {
    textAlign: 'right',
    float: 'right',
    padding: '0px 10px',
  },
  total: {
    background: 'red',
    fontSize: '18px',
    width: '180px',
    padding: '0px 10px',
    textAlign: 'right',
    color: 'yellow'
  },
}));

function CrudOperacao({ findOperacaoById, createOperacao, updateOperacao, deleteOperacao,
                        operacaoInitial, history, lastId, ...otherProps }) {

  const id = otherProps.match.params.id;
  const classes = useStyles();

  const [operacao, setOperacao] = useState(operacaoInitial);
  const [open, setOpen] = useState(false);
  const { ...hookForm } = useForm();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/operacoes/${id}`).then(r => { return r.data});

      setOperacao(response);
    };

    const fetchLastId = async () => {
      if(lastId === 0) {
        const response = await api.get(`/operacoes/lastId`).then(r => { return r.data});
        setOperacao({...operacaoInitial, id: response.id + 1});
      } else {
        setOperacao({...operacaoInitial, id: lastId + 1});
      }
    };

    if(id){
      fetchData();
    } else {
      fetchLastId();
    }
  }, [id, operacaoInitial, lastId]);

  const handleSubmit = async event => {
    if(id){
      operacao['id'] = id;
      updateOperacao(id, operacao);
      enqueueSnackbar('Foi realizada a Atualização com Sucesso !!')
    } else {
      createOperacao(operacao);
      enqueueSnackbar('Foi Criado com Sucesso !!')
    }
  }

  const handleChange = ( name, value ) => {
    const nameCompost = name.split('.');

    if(nameCompost.length > 1){
      setOperacao({...operacao,
        [nameCompost[0]]: {...operacao[nameCompost[0]], [nameCompost[1]]: value}
      });
    } else {
      setOperacao({...operacao, [name]: value});
    }
  }

  const handleDelete = () => {
    alert('Deseja deletar mesmo?');
    if(id){
      deleteOperacao(id);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOnBlurClient = async e => {
    const { value } = e.target;

    if (value) {
      const response = await api.get(`/operacoes/disponivel/${value}`).then(r => { return r.data});
      if(response){
        setOperacao({...operacao, client: { name: response.name, id: response.id,
                      limit: response.limit, credit: response.disponivel  }});
      } else {
        setOperacao({...operacao, client: { name: '', id: "", limit: "", credit: "" } });
      }
    }
  };

  const handleClose = async (selected) => {
    if(selected) {
      const response = await api.get(`/operacoes/disponivel/${selected.id}`).then(r => { return r.data});

      setOperacao({...operacao, client: { name: selected.name, id: selected.id,
        limit: selected.limit, credit: response.disponivel  } });
    }
    setOpen(false);
  };

  const handleUpdate = (chequeOperacao) => {
    if(chequeOperacao) {
      const cheque = chequeOperacao;
      cheque.map(c => c.valor_encargos = c.valor_operacao * (operacao.percentual / 100));
      setOperacao({...operacao, chequeOperacao: cheque });
    }
  };

  const moneyMask = (value) => {
    return <NumberFormat value={value} prefix={'R$ '} 
                        displayType={'text'} 
                        thousandSeparator={'.'}
                        decimalSeparator={','}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        renderText={value =><span>{value}</span>} />;
  }

  const operacaoForm = [
    { type: 'number', name: 'id', label: 'Operação', size: 3, disabled: true },
    { type: 'dialog', name: 'client.id', label: 'Cliente *', size: 9,
      name_disable: 'client.name', value_disable: '', open: handleClickOpen,
      onBlur: handleOnBlurClient,
      errors: { required: { value: true, message: "Informe o Cliente *" }} },
    { type: 'number', name: 'percentual', label: '% ao mês', size: 3 },
    { type: 'date', name: 'data_operacao', label: 'Data de Operação', size: 3 },
    { type: 'number', name: 'tarifa', label: 'Tarifa', size: 3 },
    { type: 'number', name: 'acrescimos', label: 'Acréscimos', size: 3 },
    { type: 'number', name: 'client.limit', label: 'Limite', size: 3, disabled: true },
    { type: 'number', name: 'client.disponivel', label: 'Disponível', size: 3, disabled: true },
  ];

  return (
    <Container className="Operacoes">
      <FormField fields={operacaoForm} className="operacoesCrud"
                handleChange={(name, value) => handleChange(name, value)}
                hookFormCustom={hookForm}
                values={operacao}
                title="Criar uma Operação">
      </FormField>

      <DialogClient open={open} handleClose={handleClose}></DialogClient>

      <ChequeOperacoes chequeOperacao={operacao.chequeOperacao} handleUpdate={handleUpdate}></ChequeOperacoes>

      <Card variant="outlined">
        <CardContent>
            <Typography className={classes.totaisWrap} variant="subtitle2" color="textSecondary" gutterBottom>
              <Grid item className={classes.totais}>
                <span className={classes.left}>TOTAL OPERAÇÃO</span>
                <span className={classes.right}>:</span>
              </Grid>
              <Grid item className={classes.total} >
                <Box>{moneyMask(operacao.total_operacao)}</Box>
              </Grid>
            </Typography>

            <Typography className={classes.totaisWrap} variant="subtitle2" color="textSecondary" gutterBottom>
              <Grid item className={classes.totais}>
                <span className={classes.left}>TOTAL ACRÉSCIMOS</span>
                <span className={classes.right}>:</span>
              </Grid>
              <Grid item className={classes.total} >
                <Box>{moneyMask(operacao.total_outros)}</Box>
              </Grid>
            </Typography>

            <Typography className={classes.totaisWrap} variant="subtitle2" color="textSecondary" gutterBottom>
              <Grid item className={classes.totais}>
                <span className={classes.left}>TOTAL ENCARGOS</span>
                <span className={classes.right}>:</span>
              </Grid>
              <Grid item className={classes.total} >
                <Box>{moneyMask(operacao.total_encargos)}</Box>
              </Grid>
            </Typography>

            <Typography className={classes.totaisWrap} variant="subtitle2" color="textSecondary" gutterBottom>
              <Grid item className={classes.totais}>
                <span className={classes.left}>TOTAL LÍQUIDO</span>
                <span className={classes.right}>:</span>
              </Grid>
              <Grid item className={classes.total} >
                <Box>{moneyMask(operacao.total_liquido)}</Box>
              </Grid>
            </Typography>
        </CardContent>
      </Card>

      <Grid item xs={12}>
        <ButtonGroup className="btn-group">
          <Button variant="contained" type="button" color="primary"
            onClick={hookForm.handleSubmit(handleSubmit)}>
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
    operacaoInitial: state.operacoes.operacao,
    lastId: state.operacoes.lastId,
  };
}

const mapDispatchToProps = dispatch => ({
  findOperacaoById: (id) => dispatch(findById(id)),
  createOperacao: (form) => dispatch(create(form)),
  updateOperacao: (id, form) => dispatch(update(id, form)),
  deleteOperacao: (id) => dispatch(deleteById(id)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CrudOperacao));
