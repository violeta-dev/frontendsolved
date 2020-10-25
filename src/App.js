import { useState, useEffect, useRef, createRef } from 'react';
import { Switch, Route, Redirect, Link, useHistory } from 'react-router-dom';

import PrivateRoute from './components/auth/PrivateRoute';

const Login = ({ onLoginSuccess }) => {
  const [auth, setAuth] = useState({ email: '', password: '' });

  const login = ev => {
    ev.preventDefault();

    fetch('http://localhost:5000/apiv1/auth/login', {
      method: 'POST',
      body: JSON.stringify(auth),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(onLoginSuccess);
  };

  return (
    <form onSubmit={login}>
      <input
        value={auth.email}
        name="email"
        onChange={ev =>
          setAuth(prevAuth => ({
            ...prevAuth,
            [ev.target.name]: ev.target.value,
          }))
        }
      ></input>
      <input
        type="password"
        name="password"
        value={auth.password}
        onChange={ev =>
          setAuth(prevAuth => ({
            ...prevAuth,
            [ev.target.name]: ev.target.value,
          }))
        }
      ></input>
      <button type="submit">Login</button>
    </form>
  );
};

const AdvertsList = ({ token }) => {
  const [adverts, setAdverts] = useState(null);
  useEffect(() => {
    const headers = {};
    headers['Authorization'] = `Bearer ${token}`;
    fetch('http://localhost:5000/apiv1/adverts', { headers })
      .then(response => response.json())
      .then(({ result }) => setAdverts(result.rows));
  }, [token]);

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

const AdvertDetail = ({ token, match }) => {
  const {
    params: { id },
  } = match;
  const [advert, setAdvert] = useState(null);
  useEffect(() => {
    const headers = {};
    headers['Authorization'] = `Bearer ${token}`;
    fetch(`http://localhost:5000/apiv1/adverts/${id}`, { headers })
      .then(response => response.json())
      .then(({ result }) => setAdvert(result));
  }, [token, id]);

  return advert ? (
    <div>
      <h1>{advert.name}</h1>
      <img
        src={`http://localhost:5000/${advert.photo}`}
        alt={advert.name}
        style={{ width: 400, height: 400, objectFit: 'contain' }}
      />
    </div>
  ) : (
    <div>Not found</div>
  );
};

const NewAdvert = ({ token, onAdvertCreated }) => {
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

    const headers = {};
    headers['Authorization'] = `Bearer ${token}`;

    fetch('http://localhost:5000/apiv1/adverts', {
      method: 'POST',
      body: formData,
      headers,
    })
      .then(response => response.json())
      .then(({ result }) => onAdvertCreated(result));
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
        token={token}
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

const TagsSelect = ({ token, ...props }) => {
  const [tags, setTags] = useState(null);

  useEffect(() => {
    const headers = {};
    headers['Authorization'] = `Bearer ${token}`;
    fetch(`http://localhost:5000/apiv1/adverts/tags`, { headers })
      .then(response => response.json())
      .then(({ result }) => setTags(result));
  }, [token]);

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

function App() {
  const [token, setToken] = useState(null);
  const history = useHistory();

  return (
    <div>
      <Link to="/">Adverts</Link>
      <Link to="/adverts/new">Create advert</Link>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/adverts" />
        </Route>
        <Route path="/login" exact>
          <Login
            onLoginSuccess={result => {
              setToken(result.token);
              history.push('/');
            }}
          />
        </Route>
        <PrivateRoute path="/adverts" exact isLogged={!!token}>
          <AdvertsList token={token} />
        </PrivateRoute>
        <PrivateRoute path="/adverts/new" exact isLogged={!!token}>
          <NewAdvert
            token={token}
            onAdvertCreated={advert => history.push(`/adverts/${advert._id}`)}
          />
        </PrivateRoute>
        <PrivateRoute path="/adverts/:id" exact isLogged={!!token}>
          {routerProps => <AdvertDetail token={token} {...routerProps} />}
        </PrivateRoute>
        <PrivateRoute isLogged={!!token}>NOT FOUND</PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;
