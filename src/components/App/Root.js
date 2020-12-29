import React from 'react';
import T from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import { store, history } from '../../propTypes';

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <div>Something went wrong!</div>;
    }
    return this.props.children;
  }
}

const Root = ({ children, history, store }) => (
  <ErrorBoundary>
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  </ErrorBoundary>
);

Root.propTypes = {
  children: T.element,
  history: history.isRequired,
  store: store.isRequired,
};

Root.defaultProps = {
  children: null,
};

export default Root;
