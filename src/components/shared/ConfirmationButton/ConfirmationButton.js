import React from 'react';
import T from 'prop-types';
import { Button, Modal } from 'antd';

class ConfirmationButton extends React.Component {
  state = {
    visible: false,
  };

  handleClick = () => this.setState({ visible: true });

  handleCancel = () => this.setState({ visible: false });

  handleOk = () => {
    const { onConfirm } = this.props;
    this.setState({ visible: false }, onConfirm);
  };

  render() {
    const { confirmationProps, ...buttonProps } = this.props;
    const { visible } = this.state;

    const { content } = confirmationProps;

    return (
      <React.Fragment>
        <Button onClick={this.handleClick} {...buttonProps} />
        <Modal
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          {...confirmationProps}
        >
          {content}
        </Modal>
      </React.Fragment>
    );
  }
}

ConfirmationButton.propTypes = {
  confirmationProps: T.shape({
    content: T.node,
  }).isRequired,
  onConfirm: T.func,
};

export default ConfirmationButton;
