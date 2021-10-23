import React from 'react';
// import searchAlbumsAPI from '../services/userAPI';
import Header from './Header';

class Search extends React.Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     artName: '',
  //     loadState: false,
  //     currAlbums: [],
  //     artistKept: '',
  //     albumsExists: false,
  //   };
  // }

  // change = ({ target: { value } }) => {
  //   this.setState({ artName: value });
  // };

  // searchButton = async () => {
  //   const { artName } = this.state;
  //   const albumsFetch = await searchAlbumsAPI(artName);
  //   this.setState({ loadState: true },
  //     albumsFetch()
  //       .then(() => this.setState({
  //         loadState: false,
  //         artName: '',
  //         artistKept: artName,
  //         currAlbums: albumsFetch,
  //         albumsExists: true,
  //       })));
  // }

  render() {
    return (
      <div data-testid="page-search">
        <Header />

      </div>
    );
  }
}

export default Search;
