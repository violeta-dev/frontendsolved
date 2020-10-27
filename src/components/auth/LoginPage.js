import React from 'react';
import T from 'prop-types';

import { login } from '../../api/auth';

class LoginPage extends React.Component {
  state = {
    form: { email: '', password: '', remember: false },
  };

  handleChange = ({ target: { type, name, value, checked } }) =>
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [name]: type === 'checkbox' ? checked : value,
      },
    }));

  handleSubmit = ev => {
    const { onLogin } = this.props;
    const {
      form: { remember, ...credentials },
    } = this.state;
    ev.preventDefault();
    login(credentials)
      .then(auth => {
        onLogin(auth, remember);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  render() {
    const {
      form: { email, password, remember },
    } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="email">
            Email:
            <input value={email} name="email" onChange={this.handleChange} />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="remember">
            Remember password:
            <input
              type="checkbox"
              name="remember"
              checked={remember}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div>
          <button type="submit" disabled={!email || !password}>
            Login
          </button>
        </div>
      </form>
    );
  }
}

LoginPage.propTypes = {
  onLogin: T.func.isRequired,
};

export default LoginPage;
