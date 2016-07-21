
/* eslint-disable max-len, arrow-body-style, no-underscore-dangle */

import React from 'react';
import axios from 'axios';


export default class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.create = this.create.bind(this);
    this.state = { errors: [], pokemon: [] };
  }

  componentDidMount() {
    console.log('inside componentDidMount  *******');
    axios.get('/api/pokemon')
    .then((rsp) => {
      this.setState({ pokemon: rsp.data.pokemon });
    });
  }

  componentWillUnmount() {
    console.log('inside componentWillUnmount  *******');
    axios.get('/api/pokemon')
    .then((rsp) => {
      this.setState({ pokemon: rsp.data.pokemon });
    });
  }

  create(e) {
    e.preventDefault();
    const name = this.refs.name.value;
    const url = this.refs.url.value;
    axios.post('/api/pokemon', { name, url })
    .then(() => {
      this.setState({ errors: [] });
    })
    .then(() => {
      return axios.get('/api/pokemon');
    })
    .then((rsp) => {
      this.setState({ pokemon: rsp.data.pokemon });
    })
    .catch(err => {
      this.setState({ errors: JSON.parse(err.response.data).messages });
    });
  }

  render() {
    return (
      <div>

        <div className="row">
          <div className="col-xs-3">
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input ref="name" type="text" className="form-control" id="name" />
              </div>
              <div className="form-group">
                <label htmlFor="url">URL</label>
                <input ref="url" type="text" className="form-control" id="url" />
              </div>

              <button onClick={this.create} type="submit" className="btn btn-default">Submit</button>
            </form>
          </div>
          <div className="col-xs-3">
            <ul className="bg-danger">
              {this.state.errors.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          </div>
          <div className="col-xs-6">
          </div>
        </div>

        <div className="row">
          <div className="col-xs-8">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {this.state.pokemon.map(p => (
                  <tr key={p._id}>
                    <td>{p.name}</td>
                    <td>
                      <img src={p.url} alt={p.name} height="42" width="42" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-xs-4"></div>
        </div>
      </div>
    );
  }
}
