import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      loadState: false,
      redirectToSearch: false,
    };
  }

    change = ({ target: { name, value } }) => {
      this.setState({
        [name]: value,
      });
    };

    buttonClick = async () => {
      const { name, email, image, description } = this.state;
      this.setState({ loadState: true },
        () => createUser({ name, email, image, description })
          .then(() => this.setState({
            loadState: false,
            redirectToSearch: true,
          })));
    };

    render() {
      const { name, loadState, redirectToSearch } = this.state;
      const REQ_L = 3;
      if (redirectToSearch) return <Redirect to="/search" />;
      return (
        <div data-testid="page-login">
          {loadState ? (
            <Loading />
          ) : (
            <form>
              <label htmlFor="name">
                Name
                <input
                  data-testid="login-name-input"
                  type="text"
                  name="name"
                  onChange={ this.change }
                  value={ name }
                />
              </label>
              <button
                data-testid="login-submit-button"
                type="button"
                disabled={ name.length < REQ_L }
                onClick={ this.buttonClick }
              >
                Entrar
              </button>
            </form>
          )}
        </div>
      );
    }
}

export default Login;
