import React from 'react';
import { Link } from 'react-router-dom';

import { getAdverts } from '../../api/adverts';

class AdvertsPage extends React.Component {
  state = {
    adverts: null,
  };

  componentDidMount() {
    getAdverts().then(({ result }) => this.setState({ adverts: result.rows }));
  }

  render() {
    const { adverts } = this.state;
    return adverts && adverts.length ? (
      <ul>
        {adverts.map(advert => (
          <li key={advert._id}>
            <Link to={`/adverts/${advert._id}`}>{advert.name}</Link>
          </li>
        ))}
      </ul>
    ) : (
      <div>
        No adverts <Link to="/adverts/new">Create one</Link>
      </div>
    );
  }
}

AdvertsPage.propTypes = {};

export default AdvertsPage;
