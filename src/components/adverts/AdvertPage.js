import React from 'react';
import T from 'prop-types';
import { Redirect } from 'react-router-dom';

import { getAdvert, deleteAdvert } from '../../api/adverts';

const { REACT_APP_API_HOST: host } = process.env;

class AdvertsPage extends React.Component {
  // NOTA: gestionar error en la busqueda o que no traiga nada como un not-found
  state = {
    advert: null,
    error: null,
  };

  getAdvertId = () => this.props.match.params.id;

  handleDeleteClick = () => {
    const { history } = this.props;
    deleteAdvert(this.getAdvertId()).then(() => history.push('/'));
  };

  componentDidMount() {
    getAdvert(this.getAdvertId())
      .then(({ result }) => this.setState({ advert: result }))
      .catch(error => this.setState({ error }));
  }

  render() {
    const { advert, error } = this.state;
    if (error) {
      return <Redirect to="/not-found" />;
    }
    return (
      advert && (
        <div>
          <h1>{advert.name}</h1>
          <img
            src={`${host}/${advert.photo}`}
            alt={advert.name}
            style={{ width: 400, height: 400, objectFit: 'contain' }}
          />
          <button onClick={this.handleDeleteClick}>Delete</button>
        </div>
      )
    );
  }
}

AdvertsPage.propTypes = {
  match: T.shape({ params: T.shape({ id: T.string.isRequired }).isRequired })
    .isRequired,
};

export default AdvertsPage;
