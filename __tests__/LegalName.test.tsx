import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LegalName from '../src/screens/LegalName';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));

describe('LegalName Component', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<LegalName />);
    expect(getByPlaceholderText('First name')).toBeTruthy();
    expect(getByPlaceholderText('Last name')).toBeTruthy();
    expect(getByText('Your legal name')).toBeTruthy();
  });

  it('shows an error when first name is invalid', () => {
    const { getByText, getByPlaceholderText } = render(<LegalName />);
    const firstNameInput = getByPlaceholderText('First name');

    fireEvent.changeText(firstNameInput, '1'); // Invalid name
    fireEvent.press(getByText('Continue'));

    expect(getByText('First name must contain only letters and be at least 2 characters long.')).toBeTruthy();
  });

  it('saves name and navigates to next screen when valid', async () => {
    const navigateMock = jest.fn();
    const { getByPlaceholderText, getByText } = render(<LegalName navigation={{ navigate: navigateMock }} />);

    fireEvent.changeText(getByPlaceholderText('First name'), 'John');
    fireEvent.changeText(getByPlaceholderText('Last name'), 'Doe');
    fireEvent.press(getByText('Continue'));

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('userFirstName', 'John');
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('userLastName', 'Doe');
      expect(navigateMock).toHaveBeenCalledWith('NotificationPermission');
    });
  });
});
