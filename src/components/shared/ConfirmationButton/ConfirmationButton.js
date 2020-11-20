import React, { useState } from 'react';
import T from 'prop-types';
import { Button, Modal } from 'antd';

function ConfirmationButton({ confirmationProps, onConfirm, ...buttonProps }) {
  const [visible, setVisible] = useState(false);

  const handleClick = () => setVisible(true);
  const handleCancel = () => setVisible(false);

  const handleOk = () => {
    setVisible(false);
    onConfirm();
  };

  const { content } = confirmationProps;
  return (
    <React.Fragment>
      <Button onClick={handleClick} {...buttonProps} />
      <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        {...confirmationProps}
      >
        {content}
      </Modal>
    </React.Fragment>
  );
}

ConfirmationButton.propTypes = {
  confirmationProps: T.shape({
    content: T.node,
  }).isRequired,
  onConfirm: T.func,
};

ConfirmationButton.defaultProps = {
  onConfirm: () => {},
};

export default ConfirmationButton;
