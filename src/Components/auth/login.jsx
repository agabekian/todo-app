import React from 'react';
import {When} from 'react-if';

import { LoginContext } from './context.jsx';

class Login extends React.Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("received from form OK",this.state.username)
    this.context.login(this.state.username, this.state.password); //pass into context's LOGIn func
  };

  render() {
    return (
      <>
        <h1>LOG</h1>
        <When condition={this.context.loggedIn}>
          <button onClick={this.context.logout}>Log Out</button>
        </When>

        <When condition={!this.context.loggedIn}>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="UserName"
              name="username"
              onChange={this.handleChange}
            />
            <input
              placeholder="password"
              name="password"
              onChange={this.handleChange}
            />
            <button>Login</button>
          </form>
        </When>
      </>
    );
  }
}

export default Login;
