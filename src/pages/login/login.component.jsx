import React from 'react';

import { connect } from 'react-redux';

import { userActions } from '../../redux/user/user.actions';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import { CustomCard } from '../../components/custom-card/custom-card.component';

import './login.styles.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
   
    this.state = {
      username: 'nicollas',
      password: '123456',
      submitted: false
    };
  }

  handleSubmit = event => {
    event.preventDefault();

    this.setState({ submitted: true });
    
    const { username, password } = this.state;

    if (username && password) {
        this.props.login(username, password);
       // this.setState({ username: '', password: ''});
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
            <CustomButton type='submit'> Entrar </CustomButton>
          </form>
        </CustomCard>
      </div>
    );
  }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(Login);

export { connectedLoginPage as Login };