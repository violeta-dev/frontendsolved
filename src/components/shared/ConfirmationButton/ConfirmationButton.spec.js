import React from 'react';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import ConfirmationButton from './ConfirmationButton';

describe('ConfirmationButton', () => {
  test('should call onConfirm', () => {
    const props = {
      confirmationProps: {
        content: 'Are you sure?',
      },
      onConfirm: jest.fn(),
    };
    render(<ConfirmationButton {...props} />);

    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(
      screen.getByText(props.confirmationProps.content),
    ).toBeInTheDocument();

    const okButton = screen.getByRole('button', {
      name: /ok/i,
    });
    userEvent.click(okButton);
    expect(props.onConfirm).toHaveBeenCalled();
  });
});
