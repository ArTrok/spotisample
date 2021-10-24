import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from './Header';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artName: '',
      loadState: false,
      currAlbums: [],
      artistKept: '',
      albumsExists: false,
    };
  }

  change = ({ target: { value } }) => {
    this.setState({ artName: value });
  };

  searchButton = async () => {
    const { artName } = this.state;
    const albumsFetch = await searchAlbumsAPI(artName);
    this.setState({
      loadState: false,
      artName: '',
      artistKept: artName,
      currAlbums: albumsFetch,
      albumsExists: true,
    });
  }

  render() {
    const { artName, loadState, currAlbums, albumsExists, artistKept } = this.state;
    const ART_CHAR_MIN = 2;
    if (loadState) return <Loading />;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          {loadState ? (
            <Loading />
          ) : (
            <div>
              <label htmlFor="search-artist">
                <input
                  data-testid="search-artist-input"
                  type="text"
                  name="artName"
                  value={ artName }
                  onChange={ this.change }
                />
              </label>
              <button
                disabled={ artName.length < ART_CHAR_MIN }
                type="button"
                data-testid="search-artist-button"
                onClick={ this.searchButton }
              >
                Pesquisar
              </button>
            </div>
          )}
          <div>
            {
              albumsExists
              && (
                <div>
                  {currAlbums.length === 0 ? (
                    <p>Nenhum álbum foi encontrado</p>
                  ) : (
                    <div>
                      <h3>{`Resultado de álbuns de: ${artistKept}`}</h3>
                      <div>
                        {currAlbums.map(
                          ({
                            collectionId,
                            artistName,
                            collectionName,
                            artworkUrl100,
                          }) => (
                            <div key={ collectionId }>
                              <Link
                                data-testid={ `link-to-album-${collectionId}` }
                                to={ `/album/${collectionId}` }
                              >
                                <img src={ artworkUrl100 } alt={ collectionName } />
                                <p>{collectionName}</p>
                                <p>{artistName}</p>
                              </Link>
                            </div>
                          ),
                        )}
                      </div>
                    </div>)}
                </div>)
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
