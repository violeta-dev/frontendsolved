import React, { useEffect } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';

import { ui } from '../propTypes';
import { getUi } from '../store/selectors';

function withRender({
  renderLoading = () => 'Loading...',
  renderError = () => null,
  noRender = () => false,
}) {
  return function (WrappedComponent) {
    const ComponentWithDataLoad = ({ onLoad, error, loading, ...props }) => {
      useEffect(() => {
        onLoad();
      }, [onLoad]);

      if (loading) {
        return renderLoading();
      }
      if (error) {
        return renderError(error);
      }
      if (noRender(props)) {
        return null;
      }
      return <WrappedComponent {...props} />;
    };

    ComponentWithDataLoad.propTypes = {
      ...ui,
      onLoad: T.func.isRequired,
    };
    return connect(getUi)(ComponentWithDataLoad);
  };
}

export default withRender;
