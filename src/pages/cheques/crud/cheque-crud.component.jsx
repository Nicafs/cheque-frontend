import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Button, Card, CardContent, CardHeader } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { create } from '../../../redux/cheque/cheque.actions';

import FormInput from '../../../core/components/form-input/form-input.component';
import FormDate from '../../../core/components/form-input/form-date.component';
import './cheque-crud.styles.scss';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  fill: {
    flexBasis: '100%',
  },
});

class CrudCheque extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      agencia: '',
      conta: '',
      numero: '',
      u3: '',
      situacao: '',
      emissao: new Date(),
      prevDeposito: new Date(),
      deposito: new Date(),
      envio: new Date(),
      devolucao: new Date(),
      pagamento: new Date(),
      valor: '',
      emitente: '',
      emitenteTipo: '',
      documento: '',
      phone: '',
    }
  }

  componentDidMount() {
    // this.getClient();
  }

  // getClient() {
  //     this.getClient = api.findById('api')
  //         .then(response => response.data)
  //         .then(data => {

  //             this.setState( ...data);
  //         });
  // }


  handleSubmit = async event => {
    event.preventDefault();

    const { agencia,
      conta,
      numero,
      u3,
      situacao,
      emissao,
      prevDeposito,
      deposito,
      envio,
      devolucao,
      pagamento,
      valor,
      emitente,
      emitenteTipo,
      documento,
      phone, } = event.target;

    const formData = {
      agencia: agencia.value,
      conta: conta.value,
      numero: numero.value,
      u3: u3.value,
      situacao: situacao.value,
      emissao: emissao.value,
      prevDeposito: prevDeposito.value,
      deposito: deposito.value,
      envio: envio.value,
      devolucao: devolucao.value,
      pagamento: pagamento.value,
      valor: valor.value,
      emitente: emitente.value,
      emitenteTipo: emitenteTipo.value,
      documento: documento.value,
      phone: phone.value,
    }


    const { dispatch } = this.props;

    dispatch(create(formData));
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleChangeDate = (date) => {
    this.setState({ birthDate: date });
  };

  render() {
    const { agencia,
      conta,
      numero,
      u3,
      situacao,
      emissao,
      prevDeposito,
      deposito,
      envio,
      devolucao,
      pagamento,
      valor,
      emitente,
      emitenteTipo,
      documento,
      phone, } = this.state;

    return (
      <Card variant="outlined">
        <CardHeader title="Criar um Cheque" />

        <CardContent>
          <form className='chequeForm' onSubmit={this.handleSubmit}>

            <FormInput
              type='text'
              name='agencia'
              value={agencia}
              onChange={this.handleChange}
              label='Agencia'
              required
            />

            <FormInput
              type='text'
              name='conta'
              value={conta}
              onChange={this.handleChange}
              label='Conta'
              required
            />

            <FormInput
              type='text'
              name='numero'
              value={numero}
              onChange={this.handleChange}
              label='Numero'
            />

            <FormInput
              type='text'
              name='u3'
              value={u3}
              onChange={this.handleChange}
              label='U3'
              required
            />

            <FormInput
              type='text'
              name='situacao'
              value={situacao}
              onChange={this.handleChange}
              label='Situação'
            />

            <FormDate
              name='emissao'
              value={emissao}
              onChange={this.handleChangeDate}
              label='Emissão' />

            <FormDate
              name='prevDeposito'
              value={prevDeposito}
              onChange={this.handleChangeDate}
              label='Prev. Dpto.' />

            <FormDate
              name='deposito'
              value={deposito}
              onChange={this.handleChangeDate}
              label='Depósito' />

            <FormDate
              name='envio'
              value={envio}
              onChange={this.handleChangeDate}
              label='Envio' />

            <FormDate
              name='devolucao'
              value={devolucao}
              onChange={this.handleChangeDate}
              label='Devolucao' />

            <FormDate
              name='pagamento'
              value={pagamento}
              onChange={this.handleChangeDate}
              label='Pagamento' />

            <FormInput
              type='number'
              name='valor'
              value={valor}
              onChange={this.handleChange}
              label='Valor'
              required
            />

            <FormInput
              type='text'
              name='emitente'
              value={emitente}
              onChange={this.handleChange}
              label='Emitente'
              required
            />

            <FormInput
              type='text'
              name='emitenteTipo'
              value={emitenteTipo}
              onChange={this.handleChange}
              label='Tipo Emitente'
              required
            />

            <FormInput
              type='text'
              name='documento'
              value={documento}
              onChange={this.handleChange}
              label='CPF/CNPJ'
              required
            />

            <FormInput
              type='text'
              name='phone'
              value={phone}
              onChange={this.handleChange}
              label='Telefone'
              required
            />

            <Button variant="contained" type="submit" color="primary">
              Salvar
            </Button>

          </form>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

const connectedLoginPage = withRouter(connect(mapStateToProps, '', '', {
  pure: false
})(withStyles(styles)(CrudCheque)));

export { connectedLoginPage as CrudCheque };
