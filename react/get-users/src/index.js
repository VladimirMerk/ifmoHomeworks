import React, { Component } from 'react';
import { render } from 'react-dom';

function UserList({ list }) {
  if (!list) return null;
  console.log(list);
  return (
    <ol>
      {list.map((item, i) => (
        <UserListItem key={i} login={item.login} password={item.password} />
      ))}
    </ol>
  );
}

function UserListItem({ login, password }) {
  return (
    <li>
      {login} (<i>{password}</i>)
    </li>
  );
}

class App extends Component {
  constructor() {
    super();
    this.url = 'http://kodaktor.ru/j/users';
    this.state = {
      users: [],
      error: '',
    };
  }

  componentDidMount() {
    fetch(this.url)
      .then((response) => {
        return response.ok ? response.json() : Promise.reject;
      })
      .then(({ users }) => {
        this.setState(() => ({ users }));
      })
      .catch(({ message: error }) => {
        this.setState(() => ({ error }));
      });
  }

  render() {
    return (
      <>
        <UserList list={this.state.users} />
      </>
    );
  }
}
render(<App />, document.querySelector('.cont'));
