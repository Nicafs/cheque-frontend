import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Button, Card, CardContent, CardHeader } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { create } from '../../../redux/client/client.actions';

import FormInput from '../../../core/components/form-input/form-input.component';
import FormDate  from '../../../core/components/form-input/form-date.component';
import './cliente-crud.styles.scss';

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

class CrudCliente extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      name: '',
      email: '',
      birthDate: new Date(),
      gender: '',
      cpf: '',
      phone: '',
      address: ''
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

    const { name, email, birthDate, gender, cpf, phone, address } = event.target;
    const { user } = this.props;
    const formData = {
      name: name.value,
      email: email.value,
      birthDate: birthDate.value,
      gender: gender.value,
      cpf: cpf.value,
      phone: phone.value,
      address: address.value,
    }
    console.log("Vai chamar o create - formData:", formData, " user:", user);

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
    const { name, email, birthDate, gender, phone, address, cpf } = this.state;

    return (
      <Card variant="outlined">
        <CardHeader title="Criar um Cliente"/>

        <CardContent>
          <form className='clienteForm' onSubmit={this.handleSubmit}>

            <FormInput
              type='text'
              name='name'
              value={name}
              onChange={this.handleChange}
              label='Nome'
              required
            />

            <FormInput
              type='email'
              name='email'
              value={email}
              onChange={this.handleChange}
              label='E-mail'
            />

            <FormDate
              name='birthDate'
              value={birthDate}
              onChange={this.handleChangeDate}
              label='Data de Nascimento' />

            <FormInput
              type='text'
              name='gender'
              value={gender}
              onChange={this.handleChange}
              label='Gênero'
              required
            />

            <FormInput
              type='text'
              name='cpf'
              value={cpf}
              onChange={this.handleChange}
              label='CPF'
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

            <FormInput
              type='text'
              name='address'
              value={address}
              onChange={this.handleChange}
              label='Endereço'
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

const mapStateToProps = (state) =>{
  const { loggingIn } = state.authentication;
  return {
     loggingIn
  };
}

const connectedLoginPage = withRouter(connect(mapStateToProps, null, null, {
  pure: false
})(withStyles(styles)(CrudCliente)));

export { connectedLoginPage as CrudCliente };
