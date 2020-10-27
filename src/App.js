import { useState, useEffect, useRef } from 'react';
import {
  Switch,
  Route,
  Redirect,
  Link,
  useHistory,
  useLocation,
} from 'react-router-dom';

import { PrivateRoute, LoginPage } from './components/auth';
import { getAdverts, getAdvert, getTags, createAdvert } from './api/adverts';
import { logout } from './api/auth';

const { REACT_APP_API_HOST: host } = process.env;

const AdvertsList = () => {
  const [adverts, setAdverts] = useState(null);
  useEffect(() => {
    getAdverts().then(({ result }) => setAdverts(result.rows));
  }, []);

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
};

const AdvertDetail = ({ match }) => {
  const {
    params: { id },
  } = match;
  const [advert, setAdvert] = useState(null);
  useEffect(() => {
    getAdvert(id).then(({ result }) => setAdvert(result));
  }, [id]);

  return advert ? (
    <div>
      <h1>{advert.name}</h1>
      <img
        src={`${host}/${advert.photo}`}
        alt={advert.name}
        style={{ width: 400, height: 400, objectFit: 'contain' }}
      />
    </div>
  ) : (
    <div>Not found</div>
  );
};

const NewAdvert = ({ onAdvertCreated }) => {
  const [advert, setAdvert] = useState({ name: '', tags: [], photo: null });
  const fileInputRef = useRef(null);

  const createAd = ev => {
    ev.preventDefault();

    const formData = new FormData();
    formData.append('name', advert.name);
    formData.append('sale', true);
    formData.append('price', 25000);
    advert.tags.forEach((tag, index) => formData.append(`tags[${index}]`, tag));
    if (fileInputRef.current.files[0]) {
      formData.append('photo', fileInputRef.current.files[0]);
    }
    createAdvert(formData).then(({ result }) => onAdvertCreated(result));
  };

  return (
    <form onSubmit={createAd}>
      <input
        value={advert.name}
        name="name"
        onChange={ev =>
          setAdvert(prevAdvert => ({
            ...prevAdvert,
            [ev.target.name]: ev.target.value,
          }))
        }
      ></input>
      <input
        type="file"
        name="photo"
        onChange={ev => {
          const reader = new FileReader();
          reader.onload = function () {
            setAdvert(prevAdvert => ({
              ...prevAdvert,
              [ev.target.name]: reader.result,
            }));
          };
          reader.readAsDataURL(ev.target.files[0]);
        }}
        ref={fileInputRef}
      />
      <TagsSelect
        name="tags"
        value={advert.tags}
        onChange={ev =>
          setAdvert(prevAdvert => ({
            ...prevAdvert,
            [ev.target.name]: Array.from(
              ev.target.selectedOptions,
              option => option.value,
            ),
          }))
        }
      />
      {advert.photo && (
        <img
          src={advert.photo}
          alt="Advert"
          style={{ width: 100, height: 100, objectFit: 'contain' }}
        />
      )}
      <button type="submit" disabled={!advert.name || !advert.tags.length}>
        Submit
      </button>
    </form>
  );
};

const TagsSelect = props => {
  const [tags, setTags] = useState(null);

  useEffect(() => {
    getTags().then(({ result }) => setTags(result));
  }, []);

  return tags ? (
    <select multiple {...props}>
      {tags.map(tag => (
        <option key={tag} value={tag}>
          {tag}
        </option>
      ))}
    </select>
  ) : (
    <div>Loading tags...</div>
  );
};

function App({ isInitiallyLogged = false, onLogin, onLogout }) {
  const [isLogged, setIsLogged] = useState(isInitiallyLogged);
  const history = useHistory();
  const location = useLocation();

  return (
    <div>
      <Link to="/">Adverts</Link>
      <Link to="/adverts/new">Create advert</Link>
      {isLogged && (
        <button
          onClick={() => {
            logout().then(() => {
              setIsLogged(false);
              onLogout();
            });
          }}
        >
          Logout
        </button>
      )}
      <Switch>
        <Route path="/" exact>
          <Redirect to="/adverts" />
        </Route>
        <Route path="/login" exact>
          <LoginPage
            onLogin={(...args) => {
              setIsLogged(true);
              onLogin(...args);
              const { from } = location.state || { from: { pathname: '/' } };
              history.replace(from);
            }}
          />
        </Route>
        <PrivateRoute path="/adverts" exact isLogged={isLogged}>
          <AdvertsList />
        </PrivateRoute>
        <PrivateRoute path="/adverts/new" exact isLogged={isLogged}>
          <NewAdvert
            onAdvertCreated={advert => history.push(`/adverts/${advert._id}`)}
          />
        </PrivateRoute>
        <PrivateRoute path="/adverts/:id" exact isLogged={isLogged}>
          {routerProps => <AdvertDetail {...routerProps} />}
        </PrivateRoute>
        <PrivateRoute isLogged={isLogged}>NOT FOUND</PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;
