import React, { useEffect } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import { ui } from '../propTypes';
import { getUi } from '../store/selectors';

const defaultRenderLoading = () => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <Spin size="large" />
  </div>
);

function withRender({
  renderLoading = defaultRenderLoading,
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
        return renderError(error, { reload: onLoad });
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
