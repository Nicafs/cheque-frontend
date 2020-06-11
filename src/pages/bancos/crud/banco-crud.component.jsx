import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Button, Card, CardContent, CardHeader } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { create } from '../../../redux/banco/banco.actions';

import FormInput from '../../../core/components/form-input/form-input.component';
import './banco-crud.styles.scss';

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

class CrudBanco extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      codigo: '',
      descricao: '',
      juros: '',
      prazo: '',
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

    const { codigo, descricao, juros, prazo } = event.target;

    const formData = {
      codigo: codigo.value,
      descricao: descricao.value,
      juros: juros.value,
      prazo: prazo.value,
    }

    const { dispatch } = this.props;
    
    dispatch(create(formData));
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { codigo, descricao, juros, prazo  } = this.state;

    return (
      <Card variant="outlined">
        <CardHeader title="Criar um Banco"/>

        <CardContent>
          <form className='bancoForm' onSubmit={this.handleSubmit}>

            <FormInput
              type='text'
              name='codigo'
              value={codigo}
              onChange={this.handleChange}
              label='Código'
              required
            />

            <FormInput
              type='text'
              name='descricao'
              value={descricao}
              onChange={this.handleChange}
              label='Descrição'
              required
            />

            <FormInput
              type='number'
              name='juros'
              value={juros}
              onChange={this.handleChange}
              label='Juros' />

            <FormInput
              type='number'
              name='prazo'
              value={prazo}
              onChange={this.handleChange}
              label='Prazo'
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
})(withStyles(styles)(CrudBanco)));

export { connectedLoginPage as CrudBanco };
