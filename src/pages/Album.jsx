import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      album: {},
      tracks: [],
      loadState: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.insertTracks();
    this.insertFavs();
  }

  insertFavs = async () => {
    this.setState({ loadState: true });
    const favSongs = await getFavoriteSongs();
    this.setState({
      favorites: favSongs,
      loadState: false,
    });
  }

  insertTracks = () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.setState({ loadState: true },
      () => getMusics(id).then((response) => this.setState({
        loadState: false,
        tracks: response.slice(1),
        album: response[0],
      })));
  }

  changeCheck = async ({ target: { id, checked } }) => {
    const { tracks } = this.state;
    const trkObj = tracks.find((track) => track.trackId === Number(id));
    this.setState({ loadState: true },
      () => (checked ? addSong(trkObj) : removeSong(trkObj))
        .then(() => {
          this.insertFavs();
        }));
  };

  favChecked = (id) => {
    const { favorites } = this.state;
    const result = favorites.some((track) => track.trackId === id);
    return result;
  }

  render() {
    const { loadState, album, tracks } = this.state;
    const { artworkUrl100, collectionName, artistName } = album;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          {loadState && <Loading />}
          <div>
            <img src={ artworkUrl100 } alt="album cover" />
            <h3 data-testid="album-name">{collectionName}</h3>
            <p data-testid="artist-name">{artistName}</p>
          </div>
          {tracks.map((track) => (
            <MusicCard
              key={ track.trackId }
              album={ album }
              track={ track }
              changeCheck={ this.changeCheck }
              favChecked={ this.favChecked(track.trackId) }
            />))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
