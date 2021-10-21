import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      loadState: true,
      user: {},
    };
  }

  componentDidMount() {
    this.userData();
  }

  userData = async () => {
    const user = await getUser();
    this.setState({
      user,
      loadState: false,
    });
  }

  render() {
    const { loadState, user } = this.state;
    if (loadState) return <Loading />;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{user.name}</p>
        <Link data-testid="link-to-search" to="/search">
          Search
        </Link>
        <Link data-testid="link-to-favorites" to="/favorites">
          Favorites
        </Link>
        <Link data-testid="link-to-profile" to="/profile">
          Profile
        </Link>
      </header>
    );
  }
}
