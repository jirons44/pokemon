
/* eslint-disable max-len, arrow-body-style, no-underscore-dangle */

import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.create = this.create.bind(this);
  }

  create(e) {
    e.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    console.log('email: ', email);
    axios.post('/api/login', { email, password })
    .then((req) => {
      console.log('reg:', req);
      localStorage.clear();
      console.log('lc next');
      localStorage.setItem('token', req.data.token);
      console.log('lc next 2');
      browserHistory.push('/pokemon');
    })
    .catch(err => {
      this.setState({ errors: JSON.parse(err.response.data).messages });
    });
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <div className="row">
          <div className="col-xs-3">
            <form>
              <div className="form-group">
                <label htmlFor="email">eMail</label>
                <input ref="email" type="text" className="form-control" id="email" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input ref="password" type="text" className="form-control" id="password" />
              </div>

              <button onClick={this.create} type="submit" className="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
       );
  }
}
