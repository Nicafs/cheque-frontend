import React from 'react';
import { withRouter } from "react-router-dom";
import api from '../../core/services/api';
import { login, userSave } from "../../core/services/auth.service";

import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import FormInput from '../../components/form-input/form-input.component';
import { CustomCard } from '../../components/custom-card/custom-card.component';

import './login.styles.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      submitted: false,
      error: ""
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { username, password } = this.state;
    if (!username || !password) {
      this.setState({ error: "Preencha Usuário e Senha para continuar!" });
    } else {
      try {
        const response = await api.post('/sessions', { username, password }); //api.post("/sessions", { username, password });
        login(response.data.token);
        userSave(response.data.user);
        this.props.history.push("/");
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais."
        });
      }
    }
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className='login'>
        <CustomCard>
          <h2>Login</h2>

          <form onSubmit={this.handleSubmit}>
            <FormInput
              name='username'
              type='txt'
              handleChange={this.handleChange}
              value={this.state.username}
              label='Usuário'
              required
            />
            <FormInput
              name='password'
              type='password'
              value={this.state.password}
              handleChange={this.handleChange}
              label='Senha'
              required
            />
            {this.state.error && <p>{this.state.error}</p>}
            <Button type='submit' variant="contained" color="primary" startIcon={<ArrowForwardIcon />}
            >
              Entrar
            </Button>
          </form>
        </CustomCard>
      </div>
    );
  }
}


export default withRouter(Login);
