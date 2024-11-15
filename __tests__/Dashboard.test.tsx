import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import Dashboard from '../src/screens/Dashboard';
import * as newsApi from '../api/newsApi';

jest.mock('../api/newsApi');

describe('Dashboard Component', () => {
  it('renders correctly', async () => {
    newsApi.fetchNews.mockResolvedValueOnce([
      { id: '1', source: 'Source', headline: 'Sample headline', datetime: Date.now(), image: 'image_url' },
    ]);

    const { getByText, findByText } = render(<Dashboard />);

    await findByText('Hey User');
    expect(getByText('Sample headline')).toBeTruthy();
  });

  it('displays error message if news fails to load', async () => {
    newsApi.fetchNews.mockRejectedValueOnce(new Error('Failed to load news'));

    const { getByText } = render(<Dashboard />);

    await waitFor(() => {
      expect(getByText('Failed to load news')).toBeTruthy();
    });
  });

  it('opens the news item when clicked', async () => {
    const openURLMock = jest.fn();
    newsApi.fetchNews.mockResolvedValueOnce([
      { id: '1', source: 'Source', headline: 'Sample headline', datetime: Date.now(), image: 'image_url', url: 'https://example.com' },
    ]);

    const { getByText, findByText } = render(<Dashboard />);
    const newsItem = await findByText('Sample headline');

    fireEvent.press(newsItem);
    expect(openURLMock).toHaveBeenCalledWith('https://example.com');
  });
});
